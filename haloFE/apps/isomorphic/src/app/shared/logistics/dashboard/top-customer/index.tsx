'use client';

import { Input } from 'rizzui';
import cn from '@core/utils/class-names';
import Table from '@core/components/table';
import { topCustomersColumns } from './columns';
import { useMedia } from '@core/hooks/use-media';
import { topCustomers } from '@/data/top-customer';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import WidgetCard from '@core/components/cards/widget-card';
import TablePagination from '@core/components/table/pagination';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { useEffect } from 'react';

export type TopCustomersDataType = (typeof topCustomers)[number];

export default function TopCustomer({ className }: { className?: string }) {
  const isBigScreen = useMedia('(min-width: 2100px)', false);

  const { table, setData } = useTanStackTable<TopCustomersDataType>({
    tableData: topCustomers,
    columnConfig: topCustomersColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 5,
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

  useEffect(() => {
    table.setPageSize(isBigScreen ? 6 : 5);
  }, [isBigScreen, table]);

  return (
    <>
      <WidgetCard
        title="Top Customer"
        className={cn('p-0 lg:p-0', className)}
        headerClassName="mb-6 px-5 pt-5 lg:px-7 lg:pt-7 items-center"
        action={
          <>
            <Input
              type="search"
              clearable={true}
              inputClassName="h-[36px]"
              placeholder="Search customer"
              onClear={() => table.setGlobalFilter('')}
              value={table.getState().globalFilter ?? ''}
              prefix={<PiMagnifyingGlassBold className="size-4" />}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              className="w-full max-w-64"
            />
          </>
        }
      >
        <Table
          table={table}
          variant="modern"
          classNames={{
            headerCellClassName:
              '[&>div]:last:flex [&>div]:last:justify-end [&>div]:last:pe-4',
          }}
        />
        <TablePagination table={table} className="p-4" />
      </WidgetCard>
    </>
  );
}
