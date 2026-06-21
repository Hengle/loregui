import type { OpManifest } from "../../types";

/**
 * Command-palette manifest for branch.merge_resolve_mine.
 *
 * Resolves merge conflicts for specified paths by accepting the local
 * ("mine") version. Returns the list of resolved paths and the updated
 * staged revision.
 */
const manifest: OpManifest = {
  id: "branch.merge_resolve_mine",
  domain: "branch",
  op: "merge_resolve_mine",
  label: "Branch: Merge Resolve Mine",
  description:
    "Resolve merge conflicts by accepting the local (mine) version for the specified paths.",
  command: "branch_merge_resolve_mine",
  args: [
    {
      name: "paths",
      kind: "string-list",
      label: "Paths",
      description:
        "File paths to resolve using the local version (one per line).",
      required: false,
      placeholder: "e.g. src/main.rs",
    },
  ],
  resultKind: "json",
  keywords: [
    "merge",
    "resolve",
    "mine",
    "conflict",
    "local",
    "accept",
    "branch",
  ],
};

export default manifest;
