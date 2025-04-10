'use client';

import Table from '@core/components/table';
import { orderData } from '@/data/order-data';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { OrdersDataType } from '../../ecommerce/dashboard/recent-order';
import { basicColumns } from './column';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Flex, Input, TableVariantProps, Title } from 'rizzui';
import TablePagination from '@core/components/table/pagination';

export default function RetroTable({
  searchAble = false,
  variant = 'retro',
  tableHeader = false,
  pagination = false,
}: {
  searchAble?: boolean;
  variant?: TableVariantProps;
  tableHeader?: boolean;
  pagination?: boolean;
}) {
  const { table, setData } = useTanStackTable<OrdersDataType>({
    tableData: orderData,
    columnConfig: basicColumns,
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
    <>
      {tableHeader && (
        <Flex
          direction="col"
          justify="between"
          className="mb-4 xs:flex-row xs:items-center"
        >
          <Title as="h3" className="text-base font-semibold sm:text-lg">
            Search Table
          </Title>
          {searchAble && (
            <Input
              type="search"
              clearable={true}
              placeholder="Search order..."
              onClear={() => table.setGlobalFilter('')}
              value={table.getState().globalFilter ?? ''}
              prefix={<PiMagnifyingGlassBold className="size-4" />}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              className="w-full xs:max-w-60"
            />
          )}
        </Flex>
      )}
      <Table
        table={table}
        variant={variant}
        classNames={{ rowClassName: 'last:!border-b-0' }}
      />
      {pagination && <TablePagination table={table} className="mt-4" />}
    </>
  );
}
