import type { OpManifest } from "../../types";

/**
 * Palette manifest for `repository.instance_list`.
 *
 * Lists all repository instances (working copies) registered in the
 * shared store, including their paths, branches, and stale status.
 */
const manifest: OpManifest = {
  id: "repository.instance_list",
  domain: "repository",
  op: "instance_list",
  label: "Repository: List Instances",
  description:
    "List all repository instances (working copies) in the shared store.",
  command: "repository_instance_list",
  args: [],
  resultKind: "json",
  keywords: ["instances", "working", "copies", "list", "shared", "store"],
};

export default manifest;
