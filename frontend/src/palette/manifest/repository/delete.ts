import type { OpManifest } from "../../types";

/**
 * Palette manifest for `repository.delete`.
 *
 * Deletes a repository by its URL. Returns log messages from the operation.
 */
const manifest: OpManifest = {
  id: "repository.delete",
  domain: "repository",
  op: "delete",
  label: "Repository: Delete",
  description: "Delete a repository by URL.",
  command: "repository_delete",
  args: [
    {
      name: "repositoryUrl",
      kind: "text",
      label: "Repository URL",
      description: "URL of the repository to delete.",
      required: true,
      placeholder: "lore://localhost/my-repo",
    },
  ],
  resultKind: "json",
  keywords: ["delete", "remove", "destroy", "repository"],
};

export default manifest;
