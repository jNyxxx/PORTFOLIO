import type { SVGProps } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Pause,
  Play,
  ShieldCheck,
  Workflow,
  X,
} from "lucide-react";
import { siFacebook, siGithub, siInstagram } from "simple-icons";

/** Facebook, Instagram and GitHub from Simple Icons; LinkedIn and UI glyphs from Lucide.
 * These are real icon assets, not approximated SVG doodles.
 * Every icon is decorative; interactive parents own accessible names. */
export type IconName =
  | "facebook"
  | "instagram"
  | "mail"
  | "github"
  | "linkedin"
  | "arrow-up-right"
  | "copy"
  | "check"
  | "chevron-left"
  | "chevron-right"
  | "pause"
  | "play"
  | "menu"
  | "close"
  | "layers"
  | "workflow"
  | "shield";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  name: IconName;
  size?: number;
};

const icons = {
  mail: Mail,
  linkedin: Linkedin,
  "arrow-up-right": ArrowUpRight,
  copy: Copy,
  check: Check,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  pause: Pause,
  play: Play,
  menu: Menu,
  close: X,
  layers: Layers3,
  workflow: Workflow,
  shield: ShieldCheck,
};

export function Icon({ name, size = 20, ...props }: IconProps) {
  if (name === "facebook" || name === "instagram" || name === "github") {
    const brand =
      name === "facebook"
        ? siFacebook
        : name === "instagram"
          ? siInstagram
          : siGithub;
    return (
      <svg
        {...props}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d={brand.path} />
      </svg>
    );
  }
  const Glyph = icons[name];
  return (
    <Glyph
      {...props}
      size={size}
      strokeWidth={1.8}
      aria-hidden="true"
      focusable="false"
    />
  );
}
