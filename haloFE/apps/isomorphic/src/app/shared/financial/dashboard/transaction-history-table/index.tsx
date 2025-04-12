'use client';

import Table from '@core/components/table';
import { transactionHistoryColumns } from './columns';
import WidgetCard from '@core/components/cards/widget-card';
import { transactionHistory } from '@/data/transaction-history';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TablePagination from '@core/components/table/pagination';
import cn from '@core/utils/class-names';
import Filters from './filters';

export type TransactionHistoryDataType = (typeof transactionHistory)[number];

export default function TransactionHistoryTable({
  className,
}: {
  className?: string;
}) {
  const { table, setData } = useTanStackTable<TransactionHistoryDataType>({
    tableData: transactionHistory,
    columnConfig: transactionHistoryColumns,
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
      className={cn('p-0 lg:p-0', className)}
      title="Transaction History"
      titleClassName="w-[19ch]"
      actionClassName="w-full ps-0 items-center"
      headerClassName="mb-6 items-start flex-col @[57rem]:flex-row @[57rem]:items-center px-5 pt-5 lg:pt-7 lg:px-7"
      action={<Filters table={table} />}
    >
      <Table table={table} variant="modern" />
      <TablePagination table={table} className="p-4" />
    </WidgetCard>
  );
}
