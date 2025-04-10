'use client';

import { productsData } from '@/data/products-data';
import { productsListColumns } from '@/app/shared/ecommerce/product/product-list/columns';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import Table from '@core/components/table';
import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';
import TablePagination from '@core/components/table/pagination';
import { Input } from 'rizzui';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

export type ProductsDataType = (typeof productsData)[number];

export default function StockReport({ className }: { className?: string }) {
  const { table, setData } = useTanStackTable<ProductsDataType>({
    tableData: productsData,
    columnConfig: productsListColumns,
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
  return (
    <WidgetCard
      title="Stock Report"
      className={cn('p-0 lg:p-0', className)}
      headerClassName="mb-6 px-5 pt-5 lg:px-7 lg:pt-7"
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
          rowClassName: 'last:border-0',
        }}
      />
      <TablePagination table={table} className="p-4" />
    </WidgetCard>
  );
}
