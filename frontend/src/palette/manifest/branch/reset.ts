import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.reset",
  domain: "branch",
  op: "reset",
  label: "Branch: Reset",
  description: "Reset the local LATEST pointer of a branch to a specific revision.",
  command: "branch_reset",
  args: [
    {
      name: "revision",
      kind: "text",
      label: "Revision",
      required: true,
      placeholder: "Target revision hash",
    },
    {
      name: "branch",
      kind: "text",
      label: "Branch name",
      required: false,
      placeholder: "Leave empty for current branch",
      default: "",
    },
  ],
  resultKind: "json",
  keywords: ["branch", "reset", "move", "pointer"],
};

export default manifest;
