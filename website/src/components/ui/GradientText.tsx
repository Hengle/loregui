interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className = "" }: GradientTextProps) {
  return <span className={`vapor-text ${className}`}>{children}</span>;
}
