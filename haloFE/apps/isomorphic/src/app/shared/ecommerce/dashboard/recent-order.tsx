'use client';

import { orderData } from '@/data/order-data';
import { ordersColumns } from '@/app/shared/ecommerce/order/order-list/columns';
import WidgetCard from '@core/components/cards/widget-card';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TablePagination from '@core/components/table/pagination';
import cn from '@core/utils/class-names';
import { Input } from 'rizzui';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

export type OrdersDataType = (typeof orderData)[number];

export default function RecentOrder({ className }: { className?: string }) {
  const { table, setData } = useTanStackTable<OrdersDataType>({
    tableData: orderData,
    columnConfig: ordersColumns(false),
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
    <WidgetCard
      title="Recent Orders"
      className={cn('p-0 lg:p-0', className)}
      headerClassName="px-5 pt-5 lg:px-7 lg:pt-7 mb-6"
      action={
        <Input
          type="search"
          clearable={true}
          inputClassName="h-[36px]"
          placeholder="Search by patient name..."
          onClear={() => table.setGlobalFilter('')}
          value={table.getState().globalFilter ?? ''}
          prefix={<PiMagnifyingGlassBold className="size-4" />}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="w-full @3xl:order-3 @3xl:ms-auto @3xl:max-w-72"
        />
      }
    >
      <Table
        table={table}
        variant="modern"
        classNames={{
          cellClassName: 'first:ps-6',
          headerCellClassName: 'first:ps-6',
        }}
      />
      <TablePagination table={table} className="p-4" />
    </WidgetCard>
  );
}
