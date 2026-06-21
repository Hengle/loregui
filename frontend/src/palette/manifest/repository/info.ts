import type { OpManifest } from "../../types";

/**
 * Palette manifest for `repository.info`.
 *
 * Retrieves metadata about a remote repository — name, URL, default
 * branch, creator, and creation time.
 */
const manifest: OpManifest = {
  id: "repository.info",
  domain: "repository",
  op: "info",
  label: "Repository: Info",
  description:
    "Retrieve metadata about a repository (name, URL, default branch, creator).",
  command: "repository_info",
  args: [
    {
      name: "repositoryUrl",
      kind: "text",
      label: "Repository URL",
      description:
        "URL of the repository to query; leave empty to use the current repository.",
      required: false,
      default: "",
      placeholder: "lore://example.com/repo",
    },
  ],
  resultKind: "json",
  keywords: ["info", "metadata", "details", "repository", "remote"],
};

export default manifest;
