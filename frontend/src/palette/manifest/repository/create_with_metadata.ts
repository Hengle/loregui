import type { OpManifest } from "../../types";

/**
 * Palette manifest for `repository.create_with_metadata`.
 *
 * Creates a new repository with explicit creator and creation-time metadata.
 * Returns the created repository id, name, and path.
 */
const manifest: OpManifest = {
  id: "repository.create_with_metadata",
  domain: "repository",
  op: "create_with_metadata",
  label: "Repository: Create with Metadata",
  description:
    "Create a new repository with explicit creator and timestamp metadata.",
  command: "repository_create_with_metadata",
  args: [
    {
      name: "repositoryUrl",
      kind: "text",
      label: "Repository URL",
      description:
        "URL for the new repository (e.g. lore://localhost/<name>).",
      required: true,
      placeholder: "lore://localhost/my-repo",
    },
    {
      name: "creator",
      kind: "text",
      label: "Creator",
      description: "Username or identifier of the repository creator.",
      required: true,
    },
    {
      name: "created",
      kind: "number",
      label: "Created (epoch ms)",
      description: "Creation timestamp in milliseconds since Unix epoch.",
      required: true,
    },
    {
      name: "description",
      kind: "text",
      label: "Description",
      description: "Optional description for the repository.",
      required: false,
      default: "",
    },
    {
      name: "id",
      kind: "text",
      label: "ID",
      description:
        "Optional repository UUID; leave empty to auto-generate.",
      required: false,
      default: "",
    },
    {
      name: "useSharedStore",
      kind: "boolean",
      label: "Use Shared Store",
      description: "Use the shared store instead of a local immutable store.",
      required: false,
      default: false,
    },
    {
      name: "sharedStorePath",
      kind: "text",
      label: "Shared Store Path",
      description:
        "Path for the shared store; leave empty for the default.",
      required: false,
      default: "",
    },
  ],
  resultKind: "json",
  keywords: ["create", "new", "init", "repository", "metadata", "creator"],
};

export default manifest;
