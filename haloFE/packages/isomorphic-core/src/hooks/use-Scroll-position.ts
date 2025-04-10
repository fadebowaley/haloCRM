'use client';

import React from 'react';
import { useScroll, useSize } from 'ahooks';

export function getPercentage(partialValue?: number, totalValue?: number) {
  if (partialValue && totalValue) return (100 * partialValue) / totalValue;
  return;
}

export function useScrollPosition() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [currentOffset, setCurrentOffset] = React.useState<number>();
  const tableRef = React.useRef(null);
  const scroll = useScroll(containerRef);
  const tableSize = useSize(tableRef);
  const containerSize = useSize(containerRef);

  React.useEffect(() => {
    if (containerRef.current && tableSize) {
      setCurrentOffset(tableSize.width - containerRef.current.clientWidth);
    }
  }, [tableSize, containerRef]);

  const scrollPercentage = getPercentage(scroll?.left, currentOffset) ?? 0;

  const isLeftScrollable =
    tableSize?.width !== containerSize?.width && scrollPercentage < 100;
  const isRightScrollable =
    tableSize?.width !== containerSize?.width && scrollPercentage > 0;

  return {
    containerRef,
    scrollPercentage,
    isLeftScrollable,
    isRightScrollable,
    tableRef,
  };
}
