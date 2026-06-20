import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.latest_list",
  domain: "branch",
  op: "latest_list",
  label: "Branch: Latest List",
  description: "List the LATEST revision history for a branch (newest first).",
  command: "branch_latest_list",
  args: [
    {
      name: "branch",
      kind: "text",
      label: "Branch name",
      required: false,
      placeholder: "Leave empty for current branch",
      default: "",
    },
    {
      name: "limit",
      kind: "number",
      label: "Max entries",
      required: false,
      placeholder: "0 for default (30)",
      default: 0,
    },
  ],
  resultKind: "json",
  keywords: ["branch", "latest", "history", "revisions"],
};

export default manifest;
