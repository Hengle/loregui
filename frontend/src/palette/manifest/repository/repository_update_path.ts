import type { OpManifest } from "../../types";

/**
 * Palette manifest for `repository.repository_update_path`.
 *
 * Updates the stored path of the current repository instance in the
 * shared store to match the current working directory. Returns log
 * messages from the operation.
 */
const manifest: OpManifest = {
  id: "repository.repository_update_path",
  domain: "repository",
  op: "repository_update_path",
  label: "Repository: Update Path",
  description:
    "Update the stored repository path to match the current working directory.",
  command: "repository_update_path",
  args: [],
  resultKind: "json",
  keywords: ["update", "path", "move", "relocate", "working", "directory"],
};

export default manifest;
