import type { OpManifest } from "../../types";

/** List repositories available at a remote lore URL (ops-layer command). */
const manifest: OpManifest = {
  id: "repository.list_remote",
  domain: "repository",
  op: "list_remote",
  label: "Repository: List at Remote",
  description:
    "List all repositories available at a remote lore URL and return their identifiers.",
  command: "repository_list",
  args: [
    {
      name: "url",
      kind: "text",
      label: "Remote URL",
      description: "The lore:// URL to query for available repositories.",
      required: true,
      placeholder: "lore://example.com",
    },
  ],
  resultKind: "json",
  keywords: ["list", "repositories", "remote", "discover", "url"],
};

export default manifest;
