import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.unprotect",
  domain: "branch",
  op: "unprotect",
  label: "Branch: Unprotect",
  description: "Remove write protection from a branch, re-allowing direct commits.",
  command: "branch_unprotect",
  args: [
    {
      name: "branch",
      kind: "text",
      label: "Branch name",
      required: false,
      placeholder: "Branch to unprotect",
      default: "",
    },
  ],
  resultKind: "json",
  keywords: ["branch", "unprotect", "unlock", "allow"],
};

export default manifest;
