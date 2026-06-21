import type { OpManifest } from "../../types";

/**
 * Palette manifest for `repository.verify_fragment`.
 *
 * Verifies the integrity of a specific fragment by hash. Optionally
 * heals detected corruption.
 */
const manifest: OpManifest = {
  id: "repository.verify_fragment",
  domain: "repository",
  op: "verify_fragment",
  label: "Repository: Verify Fragment",
  description:
    "Verify the integrity of a specific fragment by hash; optionally heal corruption.",
  command: "repository_verify_fragment",
  args: [
    {
      name: "hash",
      kind: "text",
      label: "Fragment Hash",
      description: "The fragment hash (hex string) to verify.",
      required: true,
    },
    {
      name: "context",
      kind: "text",
      label: "Context",
      description:
        "Optional context filter; leave empty to match any context.",
      required: false,
      default: "",
    },
    {
      name: "heal",
      kind: "boolean",
      label: "Heal",
      description:
        "When true, attempt to heal detected corruption.",
      required: false,
      default: false,
    },
  ],
  resultKind: "json",
  keywords: [
    "verify",
    "fragment",
    "integrity",
    "hash",
    "heal",
    "corruption",
    "check",
  ],
};

export default manifest;
