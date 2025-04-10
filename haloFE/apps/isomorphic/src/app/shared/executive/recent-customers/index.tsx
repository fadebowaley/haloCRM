'use client';

import { Input } from 'rizzui';
import cn from '@core/utils/class-names';
import Table from '@core/components/table';
import { recentCustomersColumns } from './columns';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import WidgetCard from '@core/components/cards/widget-card';
import { recentCustomers } from '@/data/recent-customers-data';
import TablePagination from '@core/components/table/pagination';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';

export type RecentCustomersDataType = (typeof recentCustomers)[number];

export default function RecentCustomers({ className }: { className?: string }) {
  const { table } = useTanStackTable<RecentCustomersDataType>({
    tableData: recentCustomers,
    columnConfig: recentCustomersColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 7,
        },
      },
      enableColumnResizing: false,
    },
  });
  return (
    <WidgetCard
      title="Recent Customers"
      className={cn('p-0 lg:p-0', className)}
      headerClassName="mb-4 px-5 pt-5 lg:px-7 lg:pt-7"
      action={
        <Input
          type="search"
          placeholder="Search by customer name..."
          value={table.getState().globalFilter ?? ''}
          onClear={() => table.setGlobalFilter('')}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          inputClassName="h-9"
          clearable={true}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
        />
      }
    >
      <Table table={table} variant="modern" />
      <TablePagination table={table} className="p-4" />
    </WidgetCard>
  );
}
