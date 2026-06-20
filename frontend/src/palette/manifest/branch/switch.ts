import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.switch",
  domain: "branch",
  op: "switch",
  label: "Branch: Switch",
  description: "Switch the working tree to a different branch.",
  command: "branch_switch",
  args: [
    {
      name: "branch",
      kind: "text",
      label: "Target branch",
      required: true,
      placeholder: "Branch to switch to",
    },
    {
      name: "revision",
      kind: "text",
      label: "Specific revision",
      required: false,
      placeholder: "Leave empty for latest",
      default: "",
    },
    {
      name: "reset",
      kind: "boolean",
      label: "Reset local changes",
      required: false,
      default: false,
    },
    {
      name: "bare",
      kind: "boolean",
      label: "Create bare working tree",
      required: false,
      default: false,
    },
  ],
  resultKind: "json",
  keywords: ["branch", "switch", "checkout", "change"],
};

export default manifest;
