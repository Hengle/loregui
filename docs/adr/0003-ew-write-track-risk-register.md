# ADR-0003 — EW Write Track Risk Register (SBAI-4213 / SBAI-4236 / SBAI-4241 / SBAI-4243)

- **Status:** Active
- **Related tickets:** SBAI-4213 (write-permission enforcement), SBAI-4236 (cloud/accounts unit tests), SBAI-4241 (rollout), SBAI-4243 (live E2E threat tests)
- **Owner:** EW write track

---

## 1. Context

The EW (Entity Write) track closes the historical read/write gap in lore: a read-only Lore Service Grant (LSG) that merely lists a repo must NOT be able to mutate it. The enforcement logic is in `lore-server/src/auth/jwt.rs:verify_permission()` (SBAI-4213), tested in unit tests there. The cloud (sb-lore-writegrant) and accounts minting halves are tested in SBAI-4236. This register tracks the end-to-end live tests that must run green against an enforcing loreserver before the track is considered complete.

## 2. Risk Register

Each row represents a threat scenario that must be validated live (not just in unit tests). Rows move from PENDING → PASS when the corresponding test is green against both the deployed cloud loreserver AND the desktop-hosted loreserver.

| # | Threat Scenario | Test | Status | Verified Against | Notes |
|---|----------------|------|--------|-----------------|-------|
| 2.1 | Read-only per-user LSG is rejected on write (write_file / write_many / delete) through sb-lore-writeclient against an enforcing loreserver. | `read_only_token_rejected_on_write` in `sb-lore-writeclient/tests/threat_write_enforcement.rs` | PENDING | — | Blocked on SBAI-4241 (enforcing server rollout). Tests skip (no-op) until `LORE_ENFORCING_URL` is set. |
| 2.2 | Cross-tenant write rejection: a write LSG whose resources are pinned to tenant A's repo (`urc-repoA`) is rejected writing tenant B's repo through the relay. | `cross_repo_write_rejected` in `sb-lore-writeclient/tests/threat_write_enforcement.rs` | PENDING | — | Requires two-tenant fixture (repoA + repoB). Blocked on SBAI-4241. |
| 2.3 | Write token baseline: a token with `["read","write"]` for the repo succeeds (sanity that enforcing server is functional, not reject-all). | `write_token_succeeds_on_authorised_repo` in `sb-lore-writeclient/tests/threat_write_enforcement.rs` | PENDING | — | Basity sanity — proves the server is enforcing correctly. |

## 3. Complementary Test Coverage

These live E2E tests complement (do not duplicate) prior test layers:

| Layer | Scope | Location |
|-------|-------|----------|
| Lore unit tests | `verify_permission()` — read-only rejection, empty permission, cross-repo denial, wildcard enforcement | `lore/lore-server/src/auth/jwt.rs` (SBAI-4213) |
| Cloud/accounts unit tests | LSG minting, resource permission assignment, write-grant flow | `sb-lore-writegrant` (SBAI-4236) |
| **Live E2E** (this ticket) | End-to-end through sb-lore-writeclient against running enforcing loreserver | `sb-lore-writeclient/tests/threat_write_enforcement.rs` (SBAI-4243) |

## 4. How to Run

```bash
# Stand up an enforcing loreserver (JWT validation enabled), then:
LORE_ENFORCING_URL=grpc://127.0.0.1:41337 \
LORE_TEST_JWT_SECRET="the-secret" \
LORE_TEST_REPO=baselinerepo \
LORE_TEST_BRANCH=main \
  cargo test -p sb-lore-writeclient --test threat_write_enforcement -- --test-threads=1
```

If `LORE_ENFORCING_URL` is not set, all tests skip (no-op) — they must NOT run green against a non-enforcing server (fail-open).

## 5. Rollout Checklist (SBAI-4241)

- [ ] Deploy enforcing loreserver (JWT validation + `verify_permission` on all mutating RPCs)
- [ ] Confirm desktop-hosted loreserver also runs enforcing build
- [ ] Run threat tests green against deployed server → flip row 2.1 → PASS
- [ ] Set up two-tenant fixture → run cross-tenant test → flip row 2.2 → PASS
- [ ] Run baseline test → flip row 2.3 → PASS
- [ ] Wire tests into CI pipeline (gated on `LORE_ENFORCING_URL` in CI env)
