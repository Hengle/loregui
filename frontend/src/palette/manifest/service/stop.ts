import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "service.stop",
  domain: "service",
  op: "stop",
  label: "Service: Stop",
  description: "Stop the local lore background service.",
  command: "service_stop",
  args: [
    {
      name: "all",
      kind: "boolean",
      label: "Stop all instances",
      description: "Stop every running service instance, not just this repo's.",
      default: false,
    },
  ],
  resultKind: "json",
  keywords: ["service", "daemon", "stop", "shutdown"],
};

export default manifest;
