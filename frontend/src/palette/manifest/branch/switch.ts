import type { OpManifest } from "../../types";

/**
 * Command-palette manifest for branch.switch.
 *
 * Switches the working tree to a different branch. Uses the existing
 * `switch_branch` Tauri command which takes a branch name.
 */
const manifest: OpManifest = {
  id: "branch.switch",
  domain: "branch",
  op: "switch",
  label: "Branch: Switch",
  description:
    "Switch the working tree to a different branch.",
  command: "switch_branch",
  args: [
    {
      name: "name",
      kind: "text",
      label: "Branch",
      description: "Name of the branch to switch to.",
      required: true,
      placeholder: "e.g. main",
    },
  ],
  resultKind: "void",
  keywords: ["branch", "switch", "checkout", "change"],
};

export default manifest;
