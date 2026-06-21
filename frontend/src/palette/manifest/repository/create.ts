import type { OpManifest } from "../../types";

/**
 * Palette manifest for `repository.create`.
 *
 * Creates a new repository at the configured working directory.
 * Returns the created repository id, name, and path.
 */
const manifest: OpManifest = {
  id: "repository.create",
  domain: "repository",
  op: "create",
  label: "Repository: Create",
  description: "Create a new local repository.",
  command: "repository_create",
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
  keywords: ["create", "new", "init", "repository"],
};

export default manifest;
