import type { OpManifest } from "../../types";

/** Authenticate against a remote via the interactive browser OAuth flow. */
const manifest: OpManifest = {
  id: "auth.login_browser",
  domain: "auth",
  op: "login_browser",
  label: "Auth: Login with Browser",
  description:
    "Authenticate against a remote by opening a browser-based OAuth flow; returns the signed-in user.",
  command: "auth_login_interactive",
  args: [
    {
      name: "remoteUrl",
      kind: "text",
      label: "Remote URL",
      description: "Remote API URL to authenticate against.",
      required: true,
      placeholder: "https://api.example.com",
    },
  ],
  resultKind: "json",
  keywords: ["login", "auth", "sign-in", "browser", "oauth", "interactive"],
};

export default manifest;
