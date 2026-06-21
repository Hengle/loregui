import type { OpManifest } from "../../types";

/**
 * Palette manifest for `repository.flush`.
 *
 * Flushes pending repository data to persistent storage.
 * Returns log messages from the operation.
 */
const manifest: OpManifest = {
  id: "repository.flush",
  domain: "repository",
  op: "flush",
  label: "Repository: Flush",
  description: "Flush pending repository data to persistent storage.",
  command: "repository_flush",
  args: [],
  resultKind: "json",
  keywords: ["flush", "sync", "persist", "write", "save"],
};

export default manifest;
