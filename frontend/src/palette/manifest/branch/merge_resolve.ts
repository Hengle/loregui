import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.merge_resolve",
  domain: "branch",
  op: "merge_resolve",
  label: "Branch: Merge Resolve",
  description: "Mark conflicted paths as resolved during an in-progress merge.",
  command: "branch_merge_resolve",
  args: [
    {
      name: "paths",
      kind: "string-list",
      label: "Resolved paths",
      required: true,
      placeholder: "One path per line",
    },
  ],
  resultKind: "json",
  keywords: ["branch", "merge", "resolve", "conflict"],
};

export default manifest;
