"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  type CSSProperties,
  type PropsWithChildren,
} from "react";
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import cn from "../../utils/class-names";
import { useIsMounted } from "@core/hooks/use-is-mounted";

interface Props {
  as?: React.ElementType;
  id: UniqueIdentifier;
  className?: string;
  data?: any;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() { },
});

export function SortableItem({
  as,
  children,
  id,
  className,
  data,
}: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id, data });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const Component = as || "li";

  return (
    <SortableItemContext.Provider value={context}>
      <Component
        className={cn("SortableItem", className)}
        ref={setNodeRef}
        style={style}
      >
        {children}
      </Component>
    </SortableItemContext.Provider>
  );
}

type DragHandleProps = {
  className?: string;
};

export function DragHandle({
  className,
  children = <PiDotsSixVerticalBold />,
  ...rest
}: PropsWithChildren<DragHandleProps>) {
  const { attributes, listeners, ref } = useContext(SortableItemContext);
  const isMounted = useIsMounted();
  if (!isMounted) return null;
  return (
    <button
      type="button"
      className={cn("h-5 w-5 text-gray-900", className)}
      {...attributes}
      {...listeners}
      {...rest}
      ref={ref}
    >
      {children}
    </button>
  );
}
