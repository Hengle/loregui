import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.info",
  domain: "branch",
  op: "info",
  label: "Branch: Info",
  description: "Retrieve metadata for a branch including name, id, category, protection status, parent, and archive state.",
  command: "branch_info",
  args: [
    {
      name: "branch",
      kind: "text",
      label: "Branch name",
      required: false,
      placeholder: "Leave empty for current branch",
      default: "",
    },
  ],
  resultKind: "json",
  keywords: ["branch", "info", "metadata", "details"],
};

export default manifest;
