import type { OpManifest } from "../../types";

/**
 * Palette manifest for `repository.dump`.
 *
 * Dumps the repository tree structure at a given revision and path.
 * Returns repository id, revision state, and a list of tree nodes.
 */
const manifest: OpManifest = {
  id: "repository.dump",
  domain: "repository",
  op: "dump",
  label: "Repository: Dump Tree",
  description:
    "Dump the repository tree structure at a given revision and path.",
  command: "repository_dump",
  args: [
    {
      name: "revision",
      kind: "text",
      label: "Revision",
      description:
        "Revision to dump; leave empty for the current revision.",
      required: false,
      default: "",
    },
    {
      name: "path",
      kind: "text",
      label: "Path",
      description:
        "Repository-relative path to dump from; leave empty for the root.",
      required: false,
      default: "",
    },
    {
      name: "maxDepth",
      kind: "number",
      label: "Max Depth",
      description: "Maximum tree traversal depth; 0 means unlimited.",
      required: false,
      default: 0,
    },
  ],
  resultKind: "json",
  keywords: ["dump", "tree", "structure", "nodes", "listing"],
};

export default manifest;
