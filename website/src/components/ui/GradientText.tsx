interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className = "" }: GradientTextProps) {
  return (
    <span
      className={`bg-gradient-to-r from-brand-accent via-brand-gold to-brand-accent bg-clip-text text-transparent animate-gradient ${className}`}
    >
      {children}
    </span>
  );
}
