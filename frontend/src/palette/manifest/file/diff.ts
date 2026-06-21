import type { OpManifest } from "../../types";

/**
 * Command-palette manifest for file.diff.
 *
 * Computes the unified diff of files between two revisions.
 * Emits one entry per changed file containing the path, patch text, and action.
 */
const manifest: OpManifest = {
  id: "file.diff",
  domain: "file",
  op: "diff",
  label: "File: Diff",
  description: "Compute unified diff between two revisions.",
  command: "file_diff",
  args: [
    {
      name: "paths",
      kind: "string-list",
      label: "Paths",
      description: "File paths to diff; empty diffs all changed files.",
      required: false,
      placeholder: "src/main.rs\nsrc/lib.rs",
    },
    {
      name: "sourceRevision",
      kind: "text",
      label: "Source Revision",
      description: "Source revision (empty = working tree).",
      required: false,
    },
    {
      name: "targetRevision",
      kind: "text",
      label: "Target Revision",
      description: "Target revision (empty = working tree).",
      required: false,
    },
    {
      name: "diff3",
      kind: "boolean",
      label: "Diff3",
      description: "Produce three-way merge output with conflict markers.",
      required: false,
      default: false,
    },
    {
      name: "contextLines",
      kind: "number",
      label: "Context Lines",
      description: "Number of unchanged context lines per hunk.",
      required: false,
      default: 3,
    },
    {
      name: "ignoreWhitespaceEol",
      kind: "boolean",
      label: "Ignore Whitespace EOL",
      description: "Treat lines that differ only in trailing whitespace as equal.",
      required: false,
      default: false,
    },
    {
      name: "ignoreWhitespaceInline",
      kind: "boolean",
      label: "Ignore Whitespace Inline",
      description: "Collapse runs of internal whitespace to a single space for comparison.",
      required: false,
      default: false,
    },
  ],
  resultKind: "json",
  keywords: ["diff", "patch", "changes", "compare"],
};

export default manifest;
