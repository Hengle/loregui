import type { OpManifest } from "../../types";

/**
 * Palette manifest for `repository.store_immutable_query`.
 *
 * Queries the immutable store for a fragment by address. Returns store
 * entries with status, size, and location information.
 */
const manifest: OpManifest = {
  id: "repository.store_immutable_query",
  domain: "repository",
  op: "store_immutable_query",
  label: "Repository: Query Immutable Store",
  description:
    "Query the immutable store for a fragment by address.",
  command: "repository_store_immutable_query",
  args: [
    {
      name: "address",
      kind: "text",
      label: "Fragment Address",
      description: "The fragment address (hash) to look up in the store.",
      required: true,
    },
    {
      name: "recurse",
      kind: "boolean",
      label: "Recurse",
      description: "Recursively query sub-fragments.",
      required: false,
      default: false,
    },
  ],
  resultKind: "json",
  keywords: [
    "store",
    "immutable",
    "query",
    "fragment",
    "address",
    "lookup",
  ],
};

export default manifest;
