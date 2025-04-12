'use client';

import React from 'react';
import { defaultColumns } from './column';
import Table from '@core/components/table';
import WidgetCard from '@core/components/cards/widget-card';
import { defaultData } from '@/data/tan-table-data';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';

export type PersonType = (typeof defaultData)[number];

export default function TableRowPinning() {
  const { table, setData } = useTanStackTable<PersonType>({
    tableData: defaultData,
    columnConfig: defaultColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 12,
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
    <WidgetCard title="Row Pinning" className="mt-8 space-y-4">
      <Table
        table={table}
        variant="modern"
        classNames={{
          container: 'h-[500px]',
          rowClassName: 'last:border-0',
        }}
      />
    </WidgetCard>
  );
}
