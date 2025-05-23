import * as React from "react";
import clsx from "clsx";

import { cn } from "../../lib/utils";

const buttonVariants = ({ variant, size, className }: { variant?: string; size?: string; className?: string }) =>
  clsx(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
      "bg-blue-600 text-white hover:bg-blue-700": variant === "default" || variant === "blue", // Consolidated
      "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === "destructive",
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
      "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
      "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
      "text-blue-600 underline-offset-4 hover:underline": variant === "link",
      "text-foreground hover:bg-muted/50": variant === "minimal",
      "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200": variant === "black",
      "bg-white text-black border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700": variant === "white",
      "h-10 px-4 py-2": size === "default",
      "h-9 rounded-md px-3": size === "sm",
      "h-11 rounded-md px-8": size === "lg",
      "h-10 w-10": size === "icon",
    },
    className
  );

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: string;
  size?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";
    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };