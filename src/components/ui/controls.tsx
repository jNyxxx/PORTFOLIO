import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from "react";
import { Icon, type IconName } from "./icon";

/** Variant and size contracts inspired by shadcn Button and Untitled UI Button. */
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
  return (
    <a
      {...props}
      className={`ui-action ui-action--${variant} ${className}`.trim()}
    >
      <span>{children}</span>
      <Icon name={icon} size={16} />
    </a>
  );
}

/** Keyboard-native icon button; never a clickable decorative SVG. */
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
    <button
      {...props}
      type={props.type ?? "button"}
      aria-label={label}
      className={`ui-icon-button ${className}`.trim()}
    >
      <Icon name={icon} size={18} />
      {children}
    </button>
  );
}

/** Exclusive filter control follows Mantine SegmentedControl and MUI ToggleButton patterns. */
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
    <button
      {...props}
      type="button"
      className={`ui-filter-option ${selected ? "active" : ""}`}
      aria-pressed={selected}
    >
      <span>{label}</span>
      <span className="ui-filter-count">{count}</span>
    </button>
  );
}

/** Shared, consistently spaced social cards using platform-specific SVG marks. */
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
        <Icon name={icon} size={21} />
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
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {content}
    </a>
  ) : (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Copy ${name.toLowerCase()} address`}
    >
      {content}
    </button>
  );
}
