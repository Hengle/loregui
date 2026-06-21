import type { OpManifest } from "../../types";

/**
 * Palette manifest for `repository.gc`.
 *
 * Runs garbage collection on the local repository, cleaning up
 * unreferenced data. Returns log messages from the operation.
 */
const manifest: OpManifest = {
  id: "repository.gc",
  domain: "repository",
  op: "gc",
  label: "Repository: Garbage Collect",
  description:
    "Run garbage collection on the repository to clean up unreferenced data.",
  command: "repository_gc",
  args: [],
  resultKind: "json",
  keywords: ["gc", "garbage", "collect", "cleanup", "compact"],
};

export default manifest;
