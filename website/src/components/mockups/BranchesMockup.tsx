import { BranchIcon, LockIcon } from "@/components/icons";

const branches = [
  { name: "main", ahead: 0, behind: 0, current: false, protected: true },
  { name: "feature/boss-ai", ahead: 3, behind: 1, current: true },
  { name: "art/hero-retexture", ahead: 7, behind: 0, locks: 4 },
  { name: "release/1.2", ahead: 0, behind: 12 },
];

export function BranchesMockup() {
  return (
    <div className="bg-gradient-to-br from-brand-surface to-brand-deep-light p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-sm font-semibold text-brand-text-bright">
          Branches
        </h3>
        <span className="rounded-md bg-brand-accent px-2.5 py-1 text-xs font-semibold text-white">
          New branch
        </span>
      </div>
      <ul className="space-y-2">
        {branches.map((b) => (
          <li
            key={b.name}
            className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
              b.current
                ? "border-brand-accent/50 bg-brand-accent/10"
                : "border-brand-muted/10 bg-brand-deep/40"
            }`}
          >
            <BranchIcon
              className={`h-4 w-4 shrink-0 ${
                b.current ? "text-brand-accent" : "text-brand-muted"
              }`}
            />
            <span
              className={`truncate font-mono text-[13px] ${
                b.current ? "text-brand-text-bright" : "text-brand-text"
              }`}
            >
              {b.name}
            </span>
            {b.protected && (
              <span className="shrink-0 rounded bg-brand-gold/15 px-1.5 py-0.5 text-[10px] font-medium uppercase text-brand-gold">
                protected
              </span>
            )}
            {b.current && (
              <span className="shrink-0 rounded bg-brand-accent/20 px-1.5 py-0.5 text-[10px] font-medium uppercase text-brand-accent">
                current
              </span>
            )}
            <div className="ml-auto flex shrink-0 items-center gap-3 font-mono text-xs text-brand-muted">
              {b.locks ? (
                <span className="flex items-center gap-1 text-brand-accent">
                  <LockIcon className="h-3.5 w-3.5" />
                  {b.locks}
                </span>
              ) : null}
              <span className="text-emerald-400">↑{b.ahead}</span>
              <span className="text-brand-gold">↓{b.behind}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
