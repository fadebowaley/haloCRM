'use client';

import {
  reportAnalyticsData,
  type ReportAnalyticsProduct,
} from '@/data/store-analytics-dashboard-data';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { columns } from './column';

export function ReportAnalyticsTable() {
  const { table, setData } = useTanStackTable<ReportAnalyticsProduct>({
    tableData: reportAnalyticsData,
    columnConfig: columns,
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
    <Table
      table={table}
      variant="retro"
      classNames={{ rowClassName: 'last:!border-b-0' }}
    />
  );
}
