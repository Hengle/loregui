import { BranchIcon, LockIcon } from "@/components/icons";

const tree = [
  { depth: 0, label: "astral-engine", kind: "root" },
  { depth: 1, label: "Source/", kind: "dir" },
  { depth: 2, label: "Combat.cpp", kind: "mod" },
  { depth: 2, label: "Combat.h", kind: "mod" },
  { depth: 1, label: "Content/", kind: "dir" },
  { depth: 2, label: "Hero_Diffuse.png", kind: "lock" },
  { depth: 2, label: "Boss_Mesh.uasset", kind: "add" },
];

const changes = [
  { status: "M", color: "text-brand-gold", path: "Source/Combat.cpp", meta: "+128 −41" },
  { status: "M", color: "text-brand-gold", path: "Source/Combat.h", meta: "+12 −3" },
  { status: "A", color: "text-emerald-400", path: "Content/Boss_Mesh.uasset", meta: "84.2 MB" },
  { status: "L", color: "text-brand-accent", path: "Content/Hero_Diffuse.png", meta: "locked by you" },
];

const kindDot: Record<string, string> = {
  root: "bg-brand-accent",
  dir: "bg-brand-muted/50",
  mod: "bg-brand-gold",
  add: "bg-emerald-400",
  lock: "bg-brand-accent",
};

export function StatusMockup() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr]">
      {/* Sidebar: working tree */}
      <aside className="hidden border-r border-brand-muted/15 bg-brand-deep/40 p-4 sm:block">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-muted">
          <BranchIcon className="h-4 w-4 text-brand-accent" />
          feature/boss-ai
        </div>
        <ul className="space-y-1.5 font-mono text-[13px]">
          {tree.map((node, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-brand-text"
              style={{ paddingLeft: `${node.depth * 12}px` }}
            >
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${kindDot[node.kind]}`}
              />
              <span
                className={
                  node.kind === "dir" || node.kind === "root"
                    ? "text-brand-muted"
                    : ""
                }
              >
                {node.label}
              </span>
              {node.kind === "lock" && (
                <LockIcon className="ml-auto h-3.5 w-3.5 text-brand-accent" />
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main: changes + commit box */}
      <div className="flex flex-col bg-gradient-to-br from-brand-surface to-brand-deep-light p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading text-sm font-semibold text-brand-text-bright">
            Working changes
          </h3>
          <span className="rounded-full bg-brand-accent/15 px-2.5 py-0.5 text-xs font-medium text-brand-accent">
            4 staged
          </span>
        </div>

        <ul className="space-y-2">
          {changes.map((c) => (
            <li
              key={c.path}
              className="flex items-center gap-3 rounded-lg border border-brand-muted/10 bg-brand-deep/40 px-3 py-2.5"
            >
              <span
                className={`font-mono text-sm font-bold ${c.color}`}
                aria-hidden="true"
              >
                {c.status}
              </span>
              <span className="truncate font-mono text-[13px] text-brand-text">
                {c.path}
              </span>
              <span className="ml-auto shrink-0 font-mono text-xs text-brand-muted">
                {c.meta}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 rounded-lg border border-brand-muted/15 bg-brand-deep/50 p-3">
          <div className="font-mono text-[13px] text-brand-text">
            Add boss encounter AI + lock hero texture
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-brand-muted">
              42 chunks &middot; content-addressed (BLAKE3)
            </span>
            <span className="rounded-md bg-brand-accent px-3 py-1.5 text-xs font-semibold text-white">
              Commit &amp; Push
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
