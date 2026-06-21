import type { OpManifest } from "../../types";

/**
 * Palette manifest for `repository.metadata_clear`.
 *
 * Clears user-defined metadata keys from the repository. When no keys
 * are specified, all user-defined metadata is removed.
 */
const manifest: OpManifest = {
  id: "repository.metadata_clear",
  domain: "repository",
  op: "metadata_clear",
  label: "Repository: Clear Metadata",
  description:
    "Clear user-defined metadata keys from the repository (empty list clears all).",
  command: "repository_metadata_clear",
  args: [
    {
      name: "keys",
      kind: "string-list",
      label: "Keys",
      description:
        "Metadata keys to clear; leave empty to clear all user-defined keys.",
      required: false,
      default: [],
    },
  ],
  resultKind: "json",
  keywords: ["metadata", "clear", "remove", "delete", "keys"],
};

export default manifest;
