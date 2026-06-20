import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.metadata_set",
  domain: "branch",
  op: "metadata_set",
  label: "Branch: Metadata Set",
  description: "Set key-value metadata pairs on a branch.",
  command: "branch_metadata_set",
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
      label: "Keys",
      required: true,
      placeholder: "One key per line",
    },
    {
      name: "values",
      kind: "string-list",
      label: "Values",
      required: true,
      placeholder: "One value per line (parallel with keys)",
    },
    {
      name: "formats",
      kind: "string-list",
      label: "Formats (optional)",
      required: false,
      placeholder: "string|numeric|binary per line",
      default: [],
    },
  ],
  resultKind: "json",
  keywords: ["branch", "metadata", "set", "write"],
};

export default manifest;
