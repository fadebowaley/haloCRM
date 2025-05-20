import * as React from "react";
import { Checkbox } from "rizzui"; // Replaced Radix with rizzui
import { FiCheck as Check } from "react-icons/fi"; // Updated import
import { cn } from "../../lib/utils";

const CustomCheckbox = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<typeof Checkbox>
>(({ className, ...props }, ref) => (
  <Checkbox
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <Check className="h-4 w-4 text-current" /> {/* Add the icon as a child */}
  </Checkbox>
));
CustomCheckbox.displayName = "CustomCheckbox";

export { CustomCheckbox as Checkbox };