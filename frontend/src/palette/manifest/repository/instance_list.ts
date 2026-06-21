import type { OpManifest } from "../../types";

/**
 * Palette manifest for `repository.instance_list`.
 *
 * Lists all registered instances (working copies) of a repository from the
 * shared store. No-arg op — returns instance metadata including staleness,
 * branch, and revision info.
 */
const manifest: OpManifest = {
  id: "repository.instance_list",
  domain: "repository",
  op: "instance_list",
  label: "Repository: List Instances",
  description:
    "List all registered instances (working copies) of the repository, including branch, revision, and staleness info.",
  command: "repository_instance_list",
  args: [],
  resultKind: "json",
  keywords: ["instances", "working copies", "list", "registered", "stale"],
};

export default manifest;
