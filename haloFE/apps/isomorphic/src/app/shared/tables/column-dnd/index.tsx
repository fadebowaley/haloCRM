'use client';

import React from 'react';
import { defaultColumns } from './column';
import Table from '@core/components/table';
import WidgetCard from '@core/components/cards/widget-card';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { defaultData } from '@/data/tan-table-data';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from '@core/components/table/custom';

export type PersonType = (typeof defaultData)[number];

export default function TableColumnDnd() {
  const { table, setData, handleDragEndColumn, sensors, columnOrder } =
    useTanStackTable<PersonType>({
      tableData: defaultData,
      columnConfig: defaultColumns,
      options: {
        initialState: {
          pagination: {
            pageIndex: 0,
            pageSize: 7,
          },
        },
        meta: {
          handleDeleteRow: (row) => {
            setData((prev) => prev.filter((r) => r.id !== row.id));
          },
        },
        enableColumnResizing: false,
      },
    });

  return (
    <WidgetCard title="Column Drag & Drop" className="space-y-4">
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEndColumn}
        sensors={sensors}
      >
        <Table
          table={table}
          variant="elegant"
          columnOrder={columnOrder}
          components={{
            headerCell: DragAbleHeadWrapper,
            bodyCell: DragAbleCellWrapper,
          }}
          classNames={{
            rowClassName: 'last:border-0',
          }}
        />
      </DndContext>
    </WidgetCard>
  );
}
