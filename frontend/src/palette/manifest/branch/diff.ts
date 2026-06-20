import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.diff",
  domain: "branch",
  op: "diff",
  label: "Branch: Diff",
  description: "Compute the diff between two branches, reporting changed and conflicting files.",
  command: "branch_diff",
  args: [
    {
      name: "source",
      kind: "text",
      label: "Source branch",
      required: true,
      placeholder: "feature/x",
    },
    {
      name: "target",
      kind: "text",
      label: "Target branch",
      required: true,
      placeholder: "main",
    },
    {
      name: "path",
      kind: "text",
      label: "Path filter",
      required: false,
      placeholder: "Leave empty for all files",
      default: "",
    },
    {
      name: "autoResolve",
      kind: "boolean",
      label: "Auto-resolve conflicts",
      required: false,
      default: false,
    },
  ],
  resultKind: "json",
  keywords: ["branch", "diff", "compare", "changes"],
};

export default manifest;
