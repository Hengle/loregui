import type { OpManifest } from "../../types";

/**
 * Manifest entry for notification unsubscribe operation.
 *
 * Unsubscribes from repository push-event notifications that were established
 * by a prior subscribe call.
 *
 * Phase 1 reference: no-arg op with JSON result.
 */
const manifest: OpManifest = {
  id: "notification.unsubscribe",
  domain: "notification",
  op: "unsubscribe",
  label: "Notification: Unsubscribe",
  description: "Unsubscribe from repository push-event notifications.",
  command: "notification_unsubscribe",
  args: [],
  resultKind: "json",
  keywords: ["notification", "unsubscribe", "events", "unwatch"],
};

export default manifest;
