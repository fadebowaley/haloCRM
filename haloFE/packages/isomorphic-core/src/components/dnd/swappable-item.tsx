"use client";

import { UniqueIdentifier } from "@dnd-kit/core";
import { NewIndexGetter, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SwapAbleItem({
  id,
  children,
  data,
  className,
  getNewIndex,
}: {
  id: UniqueIdentifier;
  children: React.ReactNode;
  data?: any;
  className?: string;
  getNewIndex?: NewIndexGetter;
}) {
  const { setNodeRef, transform, transition } = useSortable({
    id,
    data,
    getNewIndex,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={className}
    >
      {children}
    </div>
  );
}
