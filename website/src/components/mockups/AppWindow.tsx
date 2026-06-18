interface AppWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

/** Shared desktop-app window chrome used across the screenshot mockups. */
export function AppWindow({ title, children, className = "" }: AppWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-brand-muted/20 bg-brand-surface shadow-2xl shadow-brand-accent/10 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-brand-muted/20 bg-brand-deep-light px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-brand-accent/60" />
        <div className="h-3 w-3 rounded-full bg-brand-gold/60" />
        <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
        <span className="ml-2 truncate font-mono text-xs text-brand-muted">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}
