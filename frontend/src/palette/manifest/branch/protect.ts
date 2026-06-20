import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.protect",
  domain: "branch",
  op: "protect",
  label: "Branch: Protect",
  description: "Apply write protection to a branch, preventing direct commits.",
  command: "branch_protect",
  args: [
    {
      name: "branch",
      kind: "text",
      label: "Branch name",
      required: false,
      placeholder: "Branch to protect",
      default: "",
    },
  ],
  resultKind: "json",
  keywords: ["branch", "protect", "lock", "freeze"],
};

export default manifest;
