import type { OpManifest } from "../../types";

/**
 * Manifest entry for notification subscribe operation.
 *
 * Subscribes to repository push-event notifications. The subscription remains
 * active until a corresponding unsubscribe call.
 *
 * Phase 1 reference: no-arg op with JSON result.
 */
const manifest: OpManifest = {
  id: "notification.subscribe",
  domain: "notification",
  op: "subscribe",
  label: "Notification: Subscribe",
  description: "Subscribe to repository push-event notifications.",
  command: "notification_subscribe",
  args: [],
  resultKind: "json",
  keywords: ["notification", "subscribe", "events", "watch"],
};

export default manifest;
