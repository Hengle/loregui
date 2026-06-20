import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.metadata_clear",
  domain: "branch",
  op: "metadata_clear",
  label: "Branch: Metadata Clear",
  description: "Clear metadata keys from a branch.",
  command: "branch_metadata_clear",
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
      name: "keys",
      kind: "string-list",
      label: "Keys to clear",
      required: true,
      placeholder: "One key per line (e.g., description, owner)",
    },
  ],
  resultKind: "json",
  keywords: ["branch", "metadata", "clear", "remove"],
};

export default manifest;
