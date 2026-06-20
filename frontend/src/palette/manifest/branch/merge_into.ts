import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.merge_into",
  domain: "branch",
  op: "merge_into",
  label: "Branch: Merge Into",
  description: "Merge the current branch's staged changes into a target branch.",
  command: "branch_merge_into",
  args: [
    {
      name: "branch",
      kind: "text",
      label: "Target branch",
      required: false,
      placeholder: "main",
      default: "",
    },
    {
      name: "branchId",
      kind: "text",
      label: "Target branch ID",
      required: false,
      default: "",
    },
    {
      name: "message",
      kind: "text",
      label: "Merge message",
      required: false,
      placeholder: "Describe the merge",
      default: "",
    },
    {
      name: "link",
      kind: "text",
      label: "Link",
      required: false,
      default: "",
    },
    {
      name: "ignoreLinks",
      kind: "boolean",
      label: "Ignore links",
      required: false,
      default: false,
    },
  ],
  resultKind: "json",
  keywords: ["branch", "merge", "into", "target"],
};

export default manifest;
