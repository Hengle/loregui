import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.merge_unresolve",
  domain: "branch",
  op: "merge_unresolve",
  label: "Branch: Merge Unresolve",
  description: "Mark previously resolved merge paths as unresolved, restoring conflict state.",
  command: "branch_merge_unresolve",
  args: [
    {
      name: "paths",
      kind: "string-list",
      label: "Paths to unresolve",
      required: true,
      placeholder: "One path per line",
    },
  ],
  resultKind: "json",
  keywords: ["branch", "merge", "unresolve", "conflict"],
};

export default manifest;
