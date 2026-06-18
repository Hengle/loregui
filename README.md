# LoreGUI

A cross-platform desktop GUI for [Lore](https://github.com/EpicGames/lore), Epic Games' next-generation version-control system for projects that combine code with large binary assets.

LoreGUI drives Lore's **complete native API** in-process (binding the `lore` Rust crate directly — no CLI shelling, no daemon), with a visual workflow for status, staging, commits, branches, merge/diff, file locking, and the full operation surface.

> **Community project.** Not affiliated with or endorsed by Epic Games. "Lore" is a trademark of Epic Games, Inc. Licensed under MIT.

## Architecture

| Path | What |
|---|---|
| `crates/lore-vm/` | Reusable, GUI-agnostic core. Binds the `lore` crate; one file per operation. |
| `src-tauri/` | Tauri v2 desktop shell. One command per operation. |
| `frontend/` | The GUI (Vite + React + TypeScript). Per-domain panels + universal command palette. |
| `website/` | Marketing landing site (Next.js) for loregui.com. |
| `docs/IMPLEMENTATION-PLAN.md` | Full-parity build plan and ticket tree. |

`lore-vm` is intentionally decoupled from the GUI so it can also be embedded in larger tooling.

## Build

Prereqs: Rust (stable, edition-2024-capable), Node 20+, and the Tauri v2 system deps for your platform.

```bash
# Frontend deps
npm --prefix frontend install

# Dev (hot reload)
npm --prefix src-tauri run tauri dev      # or: cargo tauri dev (from src-tauri/)

# Release build (produces a platform installer)
cargo tauri build
```

Windows installers are produced in CI (`.github/workflows/windows-build.yml`) on a `windows-latest` runner and published to GitHub Releases.

## Status

Pre-1.0, under active development against a pinned upstream `lore` revision. See [`docs/IMPLEMENTATION-PLAN.md`](docs/IMPLEMENTATION-PLAN.md) for the parity roadmap and contribution workflow.
