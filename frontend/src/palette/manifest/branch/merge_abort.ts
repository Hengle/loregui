import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.merge_abort",
  domain: "branch",
  op: "merge_abort",
  label: "Branch: Merge Abort",
  description: "Abort an in-progress branch merge, reverting to the pre-merge state.",
  command: "branch_merge_abort",
  args: [
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
  keywords: ["branch", "merge", "abort", "cancel"],
};

export default manifest;
