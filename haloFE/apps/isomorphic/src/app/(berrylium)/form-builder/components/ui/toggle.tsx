import * as React from "react";
import { Switch } from "rizzui";
import clsx from "clsx";
import { cn } from "../../lib/utils";

type Variant = "default" | "outline";
type Size = "default" | "sm" | "lg";

type ToggleProps = Omit<React.ComponentProps<typeof Switch>, "size" | "variant"> & {
  variant?: Variant;
  size?: Size;
};

const sizeClasses: Record<Size, string> = {
  default: "h-10 px-3",
  sm: "h-9 px-2.5",
  lg: "h-11 px-5",
};

const variantClasses: Record<Variant, string> = {
  default: "bg-transparent",
  outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
};

const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => (
    <Switch
      ref={ref}
      className={cn(
        clsx(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
          sizeClasses[size],
          variantClasses[variant],
          className
        )
      )}
      {...props}
    />
  )
);

Toggle.displayName = "Toggle";

export { Toggle };