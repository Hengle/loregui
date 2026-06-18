type BadgeVariant = "default" | "accent" | "gold" | "success";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-brand-surface-light text-brand-muted border-brand-muted/30",
  accent: "bg-brand-accent/10 text-brand-accent border-brand-accent/30",
  gold: "bg-brand-gold/10 text-brand-gold border-brand-gold/30",
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
