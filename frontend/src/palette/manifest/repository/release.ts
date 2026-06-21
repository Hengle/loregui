import type { OpManifest } from "../../types";

/**
 * Palette manifest for `repository.release`.
 *
 * Releases the repository, freeing associated resources. Returns log
 * messages from the operation.
 */
const manifest: OpManifest = {
  id: "repository.release",
  domain: "repository",
  op: "release",
  label: "Repository: Release",
  description: "Release the repository and free associated resources.",
  command: "repository_release",
  args: [],
  resultKind: "json",
  keywords: ["release", "free", "close", "detach"],
};

export default manifest;
