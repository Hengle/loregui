import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.push",
  domain: "branch",
  op: "push",
  label: "Branch: Push",
  description: "Push a branch to the remote repository.",
  command: "branch_push",
  args: [
    {
      name: "branch",
      kind: "text",
      label: "Branch name",
      required: true,
      placeholder: "Branch to push",
    },
  ],
  resultKind: "json",
  keywords: ["branch", "push", "upload", "sync"],
};

export default manifest;
