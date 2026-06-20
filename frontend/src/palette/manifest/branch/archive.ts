import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "branch.archive",
  domain: "branch",
  op: "archive",
  label: "Branch: Archive",
  description: "Archive a branch locally and on the remote, preventing further commits.",
  command: "branch_archive",
  args: [
    {
      name: "branch",
      kind: "text",
      label: "Branch name",
      required: false,
      placeholder: "Branch to archive (empty for current)",
    },
  ],
  resultKind: "json",
  keywords: ["archive", "freeze", "lock"],
};

export default manifest;
