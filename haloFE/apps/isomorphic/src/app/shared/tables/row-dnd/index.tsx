'use client';

import React from 'react';
import { defaultColumns } from './column';
import Table from '@core/components/table';
import WidgetCard from '@core/components/cards/widget-card';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { defaultData } from '@/data/tan-table-data';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { DragAbleRowWrapper } from '@core/components/table/custom';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';

export type PersonType = (typeof defaultData)[number];

export default function TableRowDnd() {
  const { table, sensors, dataIds, setData, columnOrder, handleDragEndRow } =
    useTanStackTable<PersonType>({
      tableData: defaultData,
      columnConfig: defaultColumns,
      options: {
        initialState: {
          pagination: {
            pageIndex: 0,
            pageSize: 8,
          },
        },
        meta: {
          handleDeleteRow: (row) => {
            setData((prev) => prev.filter((r) => r.id !== row.id));
          },
        },
        getRowId: (row) => row.id,
        enableColumnResizing: false,
      },
    });

  return (
    <WidgetCard title="Row Drag & Drop" className="mt-7 space-y-4">
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEndRow}
        sensors={sensors}
      >
        <Table
          table={table}
          dataIds={dataIds}
          columnOrder={columnOrder}
          variant="minimal"
          classNames={{
            container: 'overflow-y-hidden',
          }}
          components={{
            bodyRow: DragAbleRowWrapper,
          }}
        />
      </DndContext>
    </WidgetCard>
  );
}
