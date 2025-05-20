import * as React from "react";
import { Tooltip as RizzuiTooltip } from "rizzui";
import { cn } from "../../lib/utils";

type TooltipProps = React.ComponentProps<typeof RizzuiTooltip>;

const Tooltip = ({ className, ...props }: TooltipProps) => (
  <RizzuiTooltip
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
      className
    )}
    {...props}
  />
);

export { Tooltip };