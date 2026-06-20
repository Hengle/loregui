import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.merge_start",
  domain: "branch",
  op: "merge_start",
  label: "Branch: Merge Start",
  description: "Begin merging a source branch into the current branch.",
  command: "branch_merge_start",
  args: [
    {
      name: "branch",
      kind: "text",
      label: "Source branch",
      required: true,
      placeholder: "feature/x",
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
      name: "noCommit",
      kind: "boolean",
      label: "No auto-commit",
      required: false,
      default: false,
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
  keywords: ["branch", "merge", "start", "begin"],
};

export default manifest;
