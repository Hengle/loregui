interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  highlight?: boolean;
}

export function Card({
  children,
  className = "",
  hover = false,
  highlight = false,
}: CardProps) {
  return (
    <div
      className={`rounded-xl border bg-brand-surface p-6 ${
        highlight
          ? "border-brand-accent/50 shadow-lg shadow-brand-accent/10"
          : "border-brand-muted/20"
      } ${
        hover
          ? "transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/40 hover:shadow-lg hover:shadow-brand-accent/10"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
