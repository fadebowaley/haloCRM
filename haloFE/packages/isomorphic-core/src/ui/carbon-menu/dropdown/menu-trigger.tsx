import { cloneElement, forwardRef, type ReactElement } from "react";
import Popover from "../popover/popover";
import { isElement } from "../popover/popover-trigger";
import { useMenuContext } from "./menu-context";

interface MenuTriggerChildProps {
	onClick?: (event: React.MouseEvent) => void;
	onMouseEnter?: (event: React.MouseEvent) => void;
	onMouseLeave?: (event: React.MouseEvent) => void;
	"data-expanded"?: boolean;
}

export interface MenuTargetProps {
	as?: string;
	children: ReactElement<MenuTriggerChildProps>;
	refProp?: string;
	className?: string;
}

export const MenuTrigger = forwardRef<HTMLElement, MenuTargetProps>(
	({ as = "li", children, refProp = "ref", ...props }, ref) => {
		const ctx = useMenuContext();

		if (!isElement(children)) {
			throw new Error(
				"Menu.Trigger component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported",
			);
		}

		const onClick = (event: React.MouseEvent) => {
			children.props.onClick?.(event);
			if (ctx.trigger === "click") {
				ctx.toggleDropdown();
			} else if (ctx.trigger === "click-hover") {
				ctx.setOpenedViaClick(true);
				if (!ctx.opened) {
					ctx.openDropdown();
				}
			}
		};

		const onMouseEnter = (event: React.MouseEvent) => {
			children.props.onMouseEnter?.(event);
			if (ctx.trigger === "hover" || ctx.trigger === "click-hover") {
				ctx.openDropdown();
			}
		};

		const onMouseLeave = (event: React.MouseEvent) => {
			children.props.onMouseLeave?.(event);
			if (ctx.trigger === "hover") {
				ctx.closeDropdown();
			} else if (ctx.trigger === "click-hover" && !ctx.openedViaClick) {
				ctx.closeDropdown();
			}
		};

		return (
			<Popover.Trigger popupType="menu" refProp={refProp} ref={ref} {...props}>
				{cloneElement(children, {
					onClick,
					onMouseEnter,
					onMouseLeave,
					"data-expanded": ctx.opened ? true : undefined,
				})}
			</Popover.Trigger>
		);
	},
);

MenuTrigger.displayName = "MenuTrigger";
