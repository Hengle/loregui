import type { OpManifest } from "../../types";

const manifest: OpManifest = {
  id: "service.start",
  domain: "service",
  op: "start",
  label: "Service: Start",
  description: "Start the local lore background service.",
  command: "service_start",
  args: [
    {
      name: "installAutorun",
      kind: "boolean",
      label: "Install as autorun service",
      description: "Register the service to start on login (where supported).",
      default: false,
    },
  ],
  resultKind: "void",
  keywords: ["service", "daemon", "start", "background"],
};

export default manifest;
