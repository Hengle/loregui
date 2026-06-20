import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.list",
  domain: "branch",
  op: "list",
  label: "Branch: List",
  description: "List all branches in the repository with their metadata.",
  command: "branch_list",
  args: [
    {
      name: "archived",
      kind: "boolean",
      label: "Include archived branches",
      required: false,
      default: false,
    },
  ],
  resultKind: "json",
  keywords: ["branch", "list", "branches", "all"],
};

export default manifest;
