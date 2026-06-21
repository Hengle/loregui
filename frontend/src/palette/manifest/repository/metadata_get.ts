import type { OpManifest } from "../../types";

/**
 * Palette manifest for `repository.metadata_get`.
 *
 * Reads one or all metadata entries from the repository. When key is
 * empty, returns all entries with their types.
 */
const manifest: OpManifest = {
  id: "repository.metadata_get",
  domain: "repository",
  op: "metadata_get",
  label: "Repository: Get Metadata",
  description:
    "Read metadata entries from the repository (empty key returns all).",
  command: "repository_metadata_get",
  args: [
    {
      name: "key",
      kind: "text",
      label: "Key",
      description:
        "Metadata key to read; leave empty to return all entries.",
      required: false,
      default: "",
    },
  ],
  resultKind: "json",
  keywords: ["metadata", "get", "read", "key", "value"],
};

export default manifest;
