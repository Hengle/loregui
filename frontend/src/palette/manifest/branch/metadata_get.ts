import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.metadata_get",
  domain: "branch",
  op: "metadata_get",
  label: "Branch: Metadata Get",
  description: "Retrieve metadata from a branch. Leave key empty to get all entries.",
  command: "branch_metadata_get",
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
      name: "key",
      kind: "text",
      label: "Metadata key",
      required: false,
      placeholder: "Leave empty for all entries",
      default: "",
    },
  ],
  resultKind: "json",
  keywords: ["branch", "metadata", "get", "read"],
};

export default manifest;
