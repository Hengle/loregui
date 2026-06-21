import type { OpManifest } from "../../types";

/**
 * Manifest entry for `layer.layer_remove`.
 *
 * Removes a layer from the repository at the specified path.
 * Tracked files are unlinked and empty directories collapsed.
 */
const manifest: OpManifest = {
  id: "layer.layer_remove",
  domain: "layer",
  op: "layer_remove",
  label: "Layer: Remove",
  description:
    "Remove a layer from the repository at the specified path. Tracked files are unlinked and empty directories collapsed.",
  command: "layer_remove",
  args: [
    {
      name: "targetPath",
      kind: "text",
      label: "Target Path",
      description: "Path in the current repository where the layer is placed.",
      required: true,
      placeholder: "/layer",
    },
    {
      name: "sourceRepository",
      kind: "text",
      label: "Source Repository",
      description: "Repository URL or path that was layered at the target path.",
      required: true,
      placeholder: "https://example.com/repo",
    },
    {
      name: "purge",
      kind: "boolean",
      label: "Purge",
      description: "Remove all untracked files and directories inside the layer mount.",
      required: false,
      default: false,
    },
  ],
  resultKind: "json",
  keywords: ["layer", "remove", "unmount", "unlink"],
};

export default manifest;
