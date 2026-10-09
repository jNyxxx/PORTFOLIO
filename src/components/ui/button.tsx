"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

/**
 * NYX implementation of the MIT-licensed shadcn/ui Base UI Button.
 * Source pattern: https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/bases/base/ui/button.tsx
 * Preserves real Base UI behavior, variant contracts and semantic anchor styling.
 */
const buttonVariants = cva("nyx-button", {
  variants: {
    variant: {
      default: "nyx-button--default",
      secondary: "nyx-button--secondary",
      outline: "nyx-button--outline",
      ghost: "nyx-button--ghost",
      link: "nyx-button--link",
      destructive: "nyx-button--destructive",
    },
    size: {
      default: "nyx-button--default-size",
      xs: "nyx-button--xs",
      sm: "nyx-button--sm",
      lg: "nyx-button--lg",
      icon: "nyx-button--icon",
      "icon-xs": "nyx-button--icon-xs",
      "icon-sm": "nyx-button--icon-sm",
      "icon-lg": "nyx-button--icon-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}

export { Button, buttonVariants };
