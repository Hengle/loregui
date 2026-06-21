import type { OpManifest } from "../../types";

/**
 * Dependency remove manifest entry.
 *
 * Removes file dependencies from source files. Each line specifies:
 * source_path dependency_path [tag1,tag2,...]
 *
 * If tags are omitted, the entire dependency edge is removed.
 * If tags are specified, only those tags are removed (edge removed when no tags remain).
 */
const manifest: OpManifest = {
  id: "dependency.remove",
  domain: "dependency",
  op: "remove",
  label: "Dependency: Remove",
  description:
    "Remove file dependencies from source files. Format: one entry per line as 'source_path dependency_path tag1,tag2,...'. Omit tags to remove the entire dependency edge.",
  command: "dependency_remove",
  args: [
    {
      name: "entries",
      kind: "string-list",
      label: "Dependency entries",
      description:
        "One entry per line: source_path dependency_path [tag1,tag2,...]. Example: /foo.txt /bar.txt compile,test",
      required: true,
      placeholder: "/src/main.ts /src/utils.ts helper\n/src/app.ts /lib/config.json",
    },
  ],
  resultKind: "json",
  keywords: ["dependency", "remove", "unlink", "detach"],
};

export default manifest;
