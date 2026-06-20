import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.merge_resolve_mine",
  domain: "branch",
  op: "merge_resolve_mine",
  label: "Branch: Merge Resolve (Mine)",
  description: "Resolve merge conflicts by accepting the local (mine) version.",
  command: "branch_merge_resolve_mine",
  args: [
    {
      name: "paths",
      kind: "string-list",
      label: "Paths to resolve",
      required: true,
      placeholder: "One path per line",
    },
  ],
  resultKind: "json",
  keywords: ["branch", "merge", "resolve", "mine", "local"],
};

export default manifest;
