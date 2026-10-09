import type { SVGProps } from "react";

/** Self-contained, accessible vector icons. Brand shapes follow familiar platform marks.
 * UI strokes follow the open-source Lucide visual convention (ISC license).
 * Keeping vectors local avoids loading external icon fonts or five UI runtimes. */
export type IconName =
  | "facebook"
  | "instagram"
  | "mail"
  | "github"
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

export function Icon({ name, size = 20, ...props }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    focusable: "false" as const,
    ...props,
  };
  switch (name) {
    case "facebook":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M18 2h-3.4C11.2 2 10 4.1 10 7.1V10H7v4h3v8h4v-8h3.1l.7-4H14V7.5c0-.9.3-1.5 1.7-1.5H18V2Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.2" />
          <circle cx="12" cy="12" r="4.15" />
          <circle
            cx="17.65"
            cy="6.45"
            r="1"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case "github":
      return (
        <svg {...common}>
          <path d="M9 19.1C4.6 20.5 4.6 16.7 2.8 16.2 2.8 14.1m12.3 6v-3.1a2.8 2.8 0 0 0-.8-2.2c2.8-.3 5.7-1.4 5.7-6.2a4.9 4.9 0 0 0-1.3-3.4 4.6 4.6 0 0 0-.1-3.3s-1.1-.4-3.5 1.3a12.3 12.3 0 0 0-6.3 0C6.4 1.5 5.3 1.9 5.3 1.9a4.6 4.6 0 0 0-.1 3.3 4.9 4.9 0 0 0-1.3 3.4c0 4.8 2.9 5.9 5.7 6.2a2.8 2.8 0 0 0-.8 2.2v3.1" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="2.5" y="4.5" width="19" height="15" rx="2.2" />
          <path d="m3 6 9 7 9-7" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg {...common}>
          <path d="M5 19 19 5M8 5h11v11" />
        </svg>
      );
    case "copy":
      return (
        <svg {...common}>
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m4 12 5 5L20 6" />
        </svg>
      );
    case "chevron-left":
      return (
        <svg {...common}>
          <path d="m14.5 5-7 7 7 7" />
        </svg>
      );
    case "chevron-right":
      return (
        <svg {...common}>
          <path d="m9.5 5 7 7-7 7" />
        </svg>
      );
    case "pause":
      return (
        <svg {...common}>
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      );
    case "play":
      return (
        <svg {...common}>
          <path d="m8 4 12 8-12 8V4Z" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M5 5 19 19M19 5 5 19" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5" />
        </svg>
      );
    case "workflow":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.2" />
          <rect x="14" y="14" width="7" height="7" rx="1.2" />
          <path d="M6.5 10v4a4 4 0 0 0 4 4H14M10 6.5h4a4 4 0 0 1 4 4V14" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
  }
}
