import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.create",
  domain: "branch",
  op: "create",
  label: "Branch: Create",
  description: "Create a new branch with the given name and category.",
  command: "branch_create",
  args: [
    {
      name: "branch",
      kind: "text",
      label: "Branch name",
      required: true,
      placeholder: "feature/x",
    },
    {
      name: "category",
      kind: "text",
      label: "Category",
      required: false,
      placeholder: "feature",
      default: "",
    },
    {
      name: "id",
      kind: "text",
      label: "Branch ID (optional)",
      required: false,
      placeholder: "Hex-encoded 16-byte context",
      default: "",
    },
  ],
  resultKind: "json",
  keywords: ["branch", "new", "create"],
};

export default manifest;
