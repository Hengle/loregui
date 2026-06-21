import type { OpManifest } from "../../types";

/** Verify repository integrity, optionally healing inconsistencies (ops-layer). */
const manifest: OpManifest = {
  id: "repository.verify",
  domain: "repository",
  op: "verify",
  label: "Repository: Verify Integrity",
  description:
    "Verify the integrity of a repository path and optionally heal detected inconsistencies.",
  command: "repository_verify_state",
  args: [
    {
      name: "path",
      kind: "text",
      label: "Path",
      description:
        "Repository-relative path to verify; leave empty to verify the whole repository.",
      required: false,
      default: "",
    },
    {
      name: "heal",
      kind: "boolean",
      label: "Heal",
      description: "When enabled, attempt to repair detected inconsistencies.",
      required: false,
      default: false,
    },
  ],
  resultKind: "json",
  keywords: ["verify", "integrity", "heal", "check", "repository", "corruption"],
};

export default manifest;
