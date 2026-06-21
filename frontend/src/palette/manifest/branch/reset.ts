import type { OpManifest } from "../../types";

/**
 * Command-palette manifest for branch.reset.
 *
 * Resets the local LATEST pointer of a branch to a specific revision.
 */
const manifest: OpManifest = {
  id: "branch.reset",
  domain: "branch",
  op: "reset",
  label: "Branch: Reset",
  description:
    "Reset the local LATEST pointer of a branch to a specific revision.",
  command: "branch_reset",
  args: [
    {
      name: "revision",
      kind: "text",
      label: "Revision",
      description: "Revision to reset the branch to.",
      required: true,
      placeholder: "e.g. abc123",
    },
    {
      name: "branch",
      kind: "text",
      label: "Branch",
      description: "Branch to reset; leave empty for the current branch.",
      required: false,
      placeholder: "e.g. main",
    },
  ],
  resultKind: "json",
  keywords: ["branch", "reset", "revert", "pointer", "latest"],
};

export default manifest;
