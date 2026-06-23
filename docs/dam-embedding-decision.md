# DAM Embedding Space Decision — E0.6 / SBAI-4094

**Status:** DRAFT — awaiting owner confirmation  
**Date:** 2026-06-22  
**Author:** spike agent (for human review)  
**Ticket:** SBAI-4094 (E0.6 in ADR-0001 §5)  
**Decision gate for:** E3.5, E3.6, E3.9  

---

## 1. The Question

Today the cloud indexer writes two separate, incomparable vector spaces:

| Vector | Model | Dim | Collection | Path |
|---|---|---|---|---|
| `text` (named) | bge-small (CPU, studiobrain-ai) | 384-d | `sb_entities_{type}` (named vectors) | `write_through.rs` → `HttpEmbedder` / `AI_SERVICE_URL` |
| unnamed text | bge-small (CPU) | 384-d | `tenant_{id}_entities` | `pipeline.rs` → `text_embed_via_gateway` / `TEXT_EMBED_URL` |
| `vision` (named) | CLIP ViT-B/32 ONNX | 512-d | `sb_entities_{type}` (named vectors) | `pipeline.rs` → `vision_embed_via_gateway` / `MODEL_MANAGER_VISION_EMBED_URL` |

Because text is 384-d and vision is 512-d in different spaces, a text query vector cannot be compared to a vision vector. "Find images by describing them in text" is structurally impossible today.

model-manager ships **Qwen3-VL-Embedding-2B** (INT4, ~4 GB VRAM on RTX 3080): a SHARED 2560-d space for text, images, and video. Both modalities return a 2560-d L2-normalised vector from the same model, so cosine similarity across text↔image is semantically valid.

The spike question: **keep dual (384-d text + 512-d vision) or adopt shared 2560-d?**

---

## 2. Recommendation

**Adopt the shared Qwen3-VL-Embedding-2B 2560-d space. Drop the current dual-model architecture.**

This is the right call for the product before E3 work begins. Reasons follow in §3. The migration plan is in §4. The caveats and costs that the owner must weigh before confirming are in §5.

**This decision requires explicit owner sign-off before any E3 code is written.** The collection schema change is a breaking migration; doing it after E3.5 lands doubles the cost.

---

## 3. Reasoning

### 3.1 The flagship feature (E3.5 / E3.6) only works in a shared space

"Find assets by text description" — the headline DAM semantic-search feature — requires that a text query vector and image vectors live in the same space. With dual models, you can search text-entities-by-text or images-by-image, but you cannot bridge modalities. Qwen3-VL's shared space unlocks cross-modal retrieval as a first-class primitive, not a projection hack.

This is not a minor quality improvement; it is the difference between the feature working at all and not working.

### 3.2 One model call instead of two, plus tags

Today an image asset triggers: (a) a CLIP vision embed call, (b) a bge-small text embed call for any associated markdown/caption. With the shared model, one `POST /v1/embeddings` call to the gateway handles both modalities. The Qdrant point carries a single 2560-d vector. Tags can still be generated separately (the gateway's `/api/vision/embed` tagging path is independent of the embedding model).

### 3.3 The gateway gateway seam already exists

`write_through.rs`'s `Embedder` trait is the clean injection point: it currently takes a text string and returns `Vec<f32>`. For the shared model, the seam is widened to accept either a text string or image bytes and always return a 2560-d vector. `pipeline.rs`'s `vision_embed_via_gateway` and `text_embed_via_gateway` are merged into one `multimodal_embed_via_gateway` function that dispatches on content type.

The model-manager gateway already exposes `POST /v1/embeddings` with a body that accepts `{"input": [{"type": "image_url", ...}]}` or `{"input": ["text string"]}` — the API surface is complete and tested (SBAI-1470 / `docs/multimodal-embedding.md`).

### 3.4 The dual model added accidental complexity

The current architecture has three separate code paths:
- `write_through.rs` → `HttpEmbedder` (text, `EMBEDDINGS_URL` / `AI_SERVICE_URL`)
- `pipeline.rs` → `text_embed_via_gateway` (`TEXT_EMBED_URL`)
- `pipeline.rs` → `vision_embed_via_gateway` (`MODEL_MANAGER_VISION_EMBED_URL`)

They write to two different collection schemas (named-vector `sb_entities_{type}` for images, unnamed 384-d `tenant_{id}_entities` for text). The studiobrain-ai query path reads only `tenant_{id}_entities`. This split is already causing drift: the `write_through.rs` named-vector "text" write (SBAI-2853) and the unnamed query read are inconsistent on which schema the tenant collection uses. Consolidating on one model and one collection schema per tenant eliminates this.

### 3.5 Privacy story fits the architecture

ADR-0001 §3.4 notes that "bytes and embeddings can stay on studio hardware." Qwen3-VL runs in the model-manager gateway on the tenant's own GPU box. The cloud indexer calls it over the env-var URL (same as today for CLIP). For tenants running self-hosted model-manager, embeddings never leave their network. For cloud tenants, the existing gateway-cloud routing handles it.

### 3.6 The 2560-d size is acceptable

At 2560-d × float32, each vector is 10 KB. For a library of 10,000 assets that is 100 MB in Qdrant — well within Qdrant's MMAP lazy-load budget and the cluster's RAM. bge-small at 384-d was 1.5 KB per vector; the 6.7x increase is a non-issue at DAM-scale asset counts (game studios rarely index more than a few hundred thousand assets).

---

## 4. Collection Schema Change and Migration Plan

### 4.1 New collection schema (per-tenant)

**Proposed single collection per tenant** (replaces both `tenant_{id}_entities` and `sb_entities_{type}`):

```
Collection name: tenant_{id}_dam

Vectors config:
  "shared": { "size": 2560, "distance": "Cosine" }

Payload schema (unchanged except adding `modality`):
  entity_id, tenant_id, entity_type, storage_path,
  content_hash, indexed_at, vision_tags (images only),
  source (lore / studiobrain — from V3592),
  modality ("text" | "image" | "video")
```

The `sb_entities_{type}` per-type collections (the named text/vision ones) are deprecated. Text entities that were previously written to `tenant_{id}_entities` migrate here. Image assets previously written to `sb_entities_{type}` with named vectors migrate here.

**One collection, one vector space, one query.** The studiobrain-ai query path (`tenant_{id}_entities` today) must be updated to query `tenant_{id}_dam` with the 2560-d vector from the shared model.

### 4.2 Qdrant DDL changes

Qdrant collections are not relational; there is no ALTER COLLECTION. The migration requires:

1. Create `tenant_{id}_dam` with `"shared": 2560-d Cosine` for each active tenant.
2. Re-embed all existing entity text and images through Qwen3-VL and insert into `tenant_{id}_dam`.
3. Update `ensure_qdrant_collection` in `pipeline.rs` to create `tenant_{id}_dam` shape instead.
4. Update `QdrantVectorWriter.upsert` in `write_through.rs` to write to `tenant_{id}_dam` with the `"shared"` named vector.
5. Delete old collections (`tenant_{id}_entities`, `sb_entities_{type}`) once the new collection is validated.

There is no YugabyteDB schema migration needed — the Qdrant collection is the only change. The YB `entity_index` / `assets` tables are unaffected.

### 4.3 Re-embedding plan

| Pass | Scope | Source | Re-embed via |
|---|---|---|---|
| 1 | All text entities in YB `entity_index` | Markdown from Garage S3 | `POST /v1/embeddings` text input |
| 2 | All image assets in YB `entity_index` | Image bytes from Garage S3 | `POST /v1/embeddings` image_url input |

A one-time re-index job can be triggered via `POST /api/internal/indexer/reindex` for each tenant. The indexer's existing retry / dead-letter / hash-skip logic handles the re-embed. The job is background and non-blocking; the old collections remain queryable until the new ones are validated.

**Estimated re-embed time (RTX 3080, INT4):**
- Text entities: ~45ms per entity. 10,000 entities = ~7 minutes.
- Image assets: ~120ms per image. 5,000 images = ~10 minutes.
- Pre-alpha scale (small tenant count) makes this a non-event.

The 5-minute idle-unload timeout in the gateway VRAM scheduler means the model will stay warm through a re-index batch; confirm `tier = "on_demand"` is set to avoid mid-batch eviction.

### 4.4 Code changes required

**`pipeline.rs` (cloud indexer):**
- Merge `vision_embed_via_gateway` and `text_embed_via_gateway` into `multimodal_embed_via_gateway(content: &[u8], is_image: bool) -> Vec<f32>`.
- New env var: `MULTIMODAL_EMBED_URL` (points to gateway `/v1/embeddings`). Deprecate `MODEL_MANAGER_VISION_EMBED_URL` and `TEXT_EMBED_URL` (keep as fallback aliases for one release cycle).
- `ensure_qdrant_collection`: create `tenant_{id}_dam` with `"shared": 2560-d`. Remove named-vector shape for image collections.
- `event_collection_name`: always return `tenant_{id}_dam`, remove `sb_entities_{type}` branch.
- `build_qdrant_upsert_body`: always use named vector `"shared"`, always 2560-d, `named = true` for both text and image.
- `stub_embedding`: expand stub from 384 to 2560 floats (for dev/CI with no model-manager).

**`write_through.rs` (WriteThroughCache):**
- `Embedder` trait: add `embed_image(&self, bytes: &[u8]) -> Result<Vec<f32>>` (or unify into one method with an enum input).
- `HttpEmbedder`: update to call the OpenAI-compatible `/v1/embeddings` with image_url input for image content.
- `QdrantVectorWriter.upsert`: change the named vector from `"text"` to `"shared"`, confirm 2560-d.
- `NoopEmbedder`: update `dim` to 2560.

**studiobrain-ai query path:**
- Update collection name `tenant_{id}_entities` → `tenant_{id}_dam`.
- Update query vector dimension to 2560.
- Model for query embedding: same Qwen3-VL gateway call.

**Gateway config (model-manager):**
- Confirm `qwen3-vl-embedding-2b` is in `gateway.toml` with `tier = "on_demand"`. Already documented in `docs/multimodal-embedding.md` (SBAI-1470).
- No code change needed in model-manager itself; the `/v1/embeddings` endpoint already supports text and image inputs.

---

## 5. Tradeoffs, Costs, and Risks

### 5.1 VRAM budget impact

Qwen3-VL at INT4 requires ~4 GB VRAM on the RTX 3080 (10 GB total). The model is on-demand and auto-evicted after 5 minutes idle. The VRAM scheduler must be sized to allow Qwen3-VL + at least one other on-demand model (e.g. the LLM used for auto-caption in E3.9). At 4 GB for Qwen3-VL + 6 GB budget for others, this fits the 3080 without change.

For tenants who run model-manager on smaller GPUs (e.g. 8 GB cards): INT4 at 4 GB fits; INT8 at 5 GB is tight; FP16 at 8 GB will not fit alongside anything else. The gateway's VRAM scheduler handles this correctly — it will refuse to load the model if VRAM is insufficient and the cloud indexer's best-effort fallback will log a warning and use the stub. The quality of search degrades to stub (random) until the model fits; this is acceptable for small GPU tenants who can opt to use a cloud gateway.

**Verdict:** VRAM is not a blocking constraint. Document the minimum GPU recommendation (8 GB for INT4 + headroom).

### 5.2 Latency impact per index event

| Modality | Old latency | New latency | Delta |
|---|---|---|---|
| Text entity | 45ms (bge-small) | 45ms (Qwen3-VL text, same benchmark) | 0ms |
| Image asset | 120ms (CLIP) | 120ms (Qwen3-VL image) | 0ms |

The latency numbers from `docs/multimodal-embedding.md` benchmark Qwen3-VL on the same RTX 3080. Text at 64 tokens is 45ms (same as bge-small), images at 1024x1024 are 120ms (same as CLIP). The switch is latency-neutral in practice.

However: bge-small ran on CPU (the studiobrain-ai embed pod), freeing GPU for other work. Qwen3-VL runs on GPU. For cloud pods (where there may be no on-prem GPU), the cloud indexer currently falls back to the stub. That fallback behavior is unchanged: if no gateway URL is set, vectors are stubs. The difference is that operators who want quality embeddings now need a GPU-capable model-manager instance, whereas previously they could use a CPU-only bge-small sidecar. **This raises the bar for cloud self-hosters.** Flag for the owner.

### 5.3 Re-embedding cost for existing assets

Re-embedding is a one-time background job. At pre-alpha scale (handful of tenants, thousands of assets), the cost is trivial. At GA scale with tens of thousands of assets per tenant, the job takes tens of minutes per tenant. The job is async and non-blocking; old collections remain readable during migration. There is no user-visible downtime.

**BrainBits metering implication:** re-embedding existing assets is a backend infrastructure cost, not a user-initiated request. It must NOT be metered as user BrainBits usage. The re-index job should use a service-account token with the BrainBits meter bypassed (same pattern as the existing indexer, which does not charge for indexing ops). Confirm with the billing team.

### 5.4 BrainBits metering for ongoing embeddings (E3.10)

ADR-0001 E3.10 calls for a sub-feature tier matrix for DAM features. Semantic search (E3.6) is intended to be Team-tier-gated. The embedding call itself happens at index time (during asset upload / reindex), not at search time. Two options:

**Option A: meter at search time** — the `/api/dam/search` route deducts BrainBits per query. Embedding at index time is infrastructure cost, not metered. This is the simpler model and consistent with how RAG queries are metered today.

**Option B: meter at embed time** — deduct BrainBits when a new asset is embedded. This gates the DAM index build behind the meter, which is operationally simpler (no free embedding + paid search inconsistency) but harder to UX (user uploads an asset and gets a meter deduction before they even search).

**Recommendation: Option A.** Meter at search time. The embedding quality is a feature of the account tier (Team+); the embedding itself is part of the indexing infrastructure. This matches the `multimodal_embeddings.team` FeatBit flag pattern described in `docs/multimodal-embedding.md`.

The metering hook belongs in the `POST /api/dam/search` route (E3.6), not in the indexer pipeline.

### 5.5 Abandoning bge-small / CLIP

bge-small is used by studiobrain-ai for the RAG query path today (`tenant_{id}_entities` at 384-d). Migrating to 2560-d requires studiobrain-ai to update its query embeddings too — it cannot use the old bge-small pod to generate a query vector and compare it against Qwen3-VL document vectors. This is a **cross-repo change** (studiobrain-ai + studiobrain-cloud). Plan it as a coordinated cut.

CLIP's tagging output (`vision_tags` in the Qdrant payload) was a useful side-product. Qwen3-VL's embedding output does not include tags natively. Tags must either be dropped from the index payload (degrade the payload filtering) or generated separately via the existing `/api/vision/embed` gateway route which still uses CLIP for tags. **Recommendation: keep the separate tag-generation call for image assets; only replace the embedding model.** The two calls (one for tags, one for the 2560-d embedding) can be parallelised in the pipeline.

### 5.6 Dual-collection transition period

During the migration, the old `tenant_{id}_entities` and `sb_entities_{type}` collections coexist with the new `tenant_{id}_dam` collection. Queries must route to the correct collection based on which is populated. The cleanest approach: once E0.6 is confirmed, gate all new writes on `tenant_{id}_dam` immediately; run the one-time re-embed job; cut query routing over to `tenant_{id}_dam` atomically per-tenant when its re-embed job completes; delete old collections. The indexer's hash-skip logic means no vector is written twice unnecessarily.

---

## 6. Impact on Downstream Epics

| Epic | Impact |
|---|---|
| **E3.5** — route text embeddings through gateway + cross-modal Qdrant search | Unblocked by this decision. Implementation changes: merge to `multimodal_embed_via_gateway`, update collection name. Gateway API already exists. |
| **E3.6** — DAM semantic-search API + UI | Query path must use 2560-d Qwen3-VL vector for the query; same gateway call. BrainBits metering at search time (Option A above). |
| **E3.9** — auto-caption / transcription into index | Captions (text strings) are embedded via the same Qwen3-VL text path before writing to `tenant_{id}_dam`. No model change needed; the shared space means caption embeddings are cross-modal-comparable with image embeddings, enabling "find images that match this auto-generated caption" for free. |
| **E3.7 / E3.8** — `entity_revisions` + revision-diff | No embedding impact. `entity_revisions` is a YB table, not a Qdrant concern. |
| **E3.10** — BrainBits metering for DAM | Meter at search time (Option A). Collection migration does not affect the metering hook location. |
| **studiobrain-ai RAG path** | Requires coordinated update: studiobrain-ai must switch from bge-small to Qwen3-VL for query embedding AND update the collection name. Plan as a joint PR with the cloud indexer migration. |

---

## 7. Decision Summary (for owner sign-off)

| Dimension | Current (dual) | Proposed (shared 2560-d) |
|---|---|---|
| Cross-modal search | Not possible | First-class (text ↔ image cosine) |
| Models | bge-small (384-d, CPU) + CLIP (512-d, GPU) | Qwen3-VL-2B (2560-d, GPU, INT4) |
| VRAM | ~0 GB (CPU bge-small) + ~2 GB (CLIP) | ~4 GB (Qwen3-VL INT4 on-demand) |
| Latency per asset | 45ms text + 120ms image (sequential) | 45ms text OR 120ms image (one call) |
| Collection schema | Two schemas (`tenant_{id}_entities` 384-d + `sb_entities_{type}` named 384+512) | One schema (`tenant_{id}_dam` 2560-d shared) |
| Migration cost | None | One-time re-embed job, ~10-20 min per tenant at GA scale |
| studiobrain-ai dependency | Separate bge-small embed pod | Coordinated update to Qwen3-VL gateway call |
| Tag generation | Bundled with CLIP embed | Kept as separate `/api/vision/embed` call |
| Standalone GPU requirement | Optional (bge-small works CPU-only) | Recommended (Qwen3-VL needs GPU for quality; stub exists but gives random vectors) |

**Recommendation: adopt shared 2560-d.** The product value (cross-modal search) is high, the migration cost is low at pre-alpha scale, and deferring means doing this migration after E3 code is written — which doubles the cost.

**Items requiring owner confirmation before E3 code begins:**

1. **Confirm this recommendation** — dual vs shared. If staying dual, document explicitly why and what the cross-modal search strategy is.
2. **Confirm BrainBits metering strategy** — Option A (meter at search) or Option B (meter at embed). This affects E3.6 + E3.10 design.
3. **Confirm collection naming** — `tenant_{id}_dam` as proposed, or a different convention.
4. **Confirm GPU floor for cloud self-hosters** — 8 GB minimum, or support a CPU-only fallback for Qwen3-VL (quality degrades to stub; may need a lighter model for CPU-only tenants).
5. **Coordinate with studiobrain-ai** — the RAG query path update is a cross-repo change; needs a joint PR plan.

---

## 8. References

- ADR-0001 §3.4 — model-manager inference plane, embedding-space decision as head-of-workstream
- ADR-0001 §5 E0.6, §6 E3.5 / E3.6 / E3.9
- `model-manager/docs/multimodal-embedding.md` — Qwen3-VL implementation, VRAM, API, benchmarks (SBAI-1470)
- `crates/gateway/src/vision.rs` — existing `/api/vision/embed` (CLIP 512-d, SBAI-2712)
- `cloud/crates/sb-cloud/src/indexer/pipeline.rs` — current dual-model embed paths (SBAI-2136 / SBAI-2650 / SBAI-2713 / SBAI-2853 / SBAI-3628)
- `cloud/crates/sb-cloud/src/write_through.rs` — `Embedder` trait, `QdrantVectorWriter` named-vector write (SBAI-2145 / SBAI-2853)
