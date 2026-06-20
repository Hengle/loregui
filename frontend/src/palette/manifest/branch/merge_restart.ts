import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.merge_restart",
  domain: "branch",
  op: "merge_restart",
  label: "Branch: Merge Restart",
  description: "Re-apply merge conflict resolution and re-materialize working copies.",
  command: "branch_merge_restart",
  args: [
    {
      name: "paths",
      kind: "string-list",
      label: "Paths to restart",
      required: true,
      placeholder: "One path per line",
    },
  ],
  resultKind: "json",
  keywords: ["branch", "merge", "restart", "re-apply"],
};

export default manifest;
