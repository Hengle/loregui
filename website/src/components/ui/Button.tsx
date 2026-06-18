import {
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  /** Forwarded to the underlying <a> when href is provided */
  target?: string;
  rel?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-vapor-pink via-vapor-purple to-vapor-blue text-white shadow-lg shadow-vapor-pink/30 hover:shadow-vapor-pink/50 hover:brightness-110",
  secondary:
    "bg-brand-surface-light/80 hover:bg-brand-surface text-brand-text-bright border border-vapor-pink/30 hover:border-vapor-pink/60 hover:shadow-md hover:shadow-vapor-pink/20",
  ghost:
    "bg-transparent hover:bg-brand-surface-light text-brand-muted hover:text-vapor-blue",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  className = "",
  children,
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:ring-offset-2 focus:ring-offset-brand-deep cursor-pointer";

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={combinedStyles}
        onClick={onClick as AnchorHTMLAttributes<HTMLAnchorElement>["onClick"]}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedStyles} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
