"use client";

import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from "react";
import { Button, buttonVariants } from "./button";
import { Icon, type IconName } from "./icon";

/** Real shadcn Base UI buttonVariants applied to an anchor (preserves link role). */
export function ActionLink({
  variant = "primary",
  icon = "arrow-up-right",
  children,
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary";
  icon?: IconName;
  children: ReactNode;
}) {
  const baseVariant = variant === "primary" ? "default" : "outline";
  return (
    <a
      {...props}
      className={buttonVariants({
        variant: baseVariant,
        className: `ui-action ui-action--${variant} ${className}`.trim(),
      })}
    >
      <span>{children}</span>
      <Icon name={icon} size={16} />
    </a>
  );
}

/** shadcn Base UI button, icon-only variant, keyboard and focus native. */
export function IconButton({
  label,
  icon,
  className = "",
  children,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> & {
  label: string;
  icon: IconName;
  children?: ReactNode;
}) {
  return (
    <Button
      {...props}
      type={props.type ?? "button"}
      variant="outline"
      size="icon"
      aria-label={label}
      className={`ui-icon-button ${className}`.trim()}
    >
      <Icon name={icon} size={18} />
      {children}
    </Button>
  );
}

/** Real Base UI button with Mantine-like segmented single-selection behavior. */
export function FilterOption({
  label,
  count,
  selected,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  count: string | number;
  selected: boolean;
}) {
  return (
    <Button
      {...props}
      type="button"
      variant={selected ? "secondary" : "ghost"}
      className={`ui-filter-option ${selected ? "active" : ""}`}
      aria-pressed={selected}
    >
      <span>{label}</span>
      <span className="ui-filter-count">{count}</span>
    </Button>
  );
}

export function SocialTile({
  index,
  name,
  detail,
  icon,
  href,
  onClick,
}: {
  index: string;
  name: string;
  detail: string;
  icon: IconName;
  href?: string;
  onClick?: () => void;
}) {
  const content = (
    <>
      <span className="social-index">{index}</span>
      <span className="ui-social-icon">
        <Icon name={icon} size={22} />
      </span>
      <span className="ui-social-text">
        {name}
        <small>{detail}</small>
      </span>
      <Icon
        name={href ? "arrow-up-right" : "copy"}
        size={17}
        className="ui-social-arrow"
      />
    </>
  );
  return href ? (
    <a
      href={href}
      className="ui-social-tile"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {content}
    </a>
  ) : (
    <Button
      variant="ghost"
      type="button"
      className="ui-social-tile"
      onClick={onClick}
      aria-label={`Copy ${name.toLowerCase()} address`}
    >
      {content}
    </Button>
  );
}
