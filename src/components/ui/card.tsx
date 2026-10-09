import type * as React from "react";

/** shadcn/ui Card composition, adapted from the MIT-licensed registry source.
 * https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/card.tsx */
export function Card({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={`nyx-card ${className}`.trim()}
      {...props}
    />
  );
}
export function CardHeader({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={`nyx-card-header ${className}`.trim()}
      {...props}
    />
  );
}
export function CardContent({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={`nyx-card-content ${className}`.trim()}
      {...props}
    />
  );
}
export function CardFooter({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={`nyx-card-footer ${className}`.trim()}
      {...props}
    />
  );
}
export function CardTitle({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={`nyx-card-title ${className}`.trim()}
      {...props}
    />
  );
}
export function CardDescription({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={`nyx-card-description ${className}`.trim()}
      {...props}
    />
  );
}
