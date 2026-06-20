import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.merge_resolve_theirs",
  domain: "branch",
  op: "merge_resolve_theirs",
  label: "Branch: Merge Resolve (Theirs)",
  description: "Resolve merge conflicts by accepting the incoming (theirs) version.",
  command: "branch_merge_resolve_theirs",
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
  keywords: ["branch", "merge", "resolve", "theirs", "incoming"],
};

export default manifest;
