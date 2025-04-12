'use client';

import cn from '@core/utils/class-names';
import { jobData } from '@/data/job-data';
import { allJobsColumns } from './columns';
import Table from '@core/components/table';
import WidgetCard from '@core/components/cards/widget-card';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TablePagination from '@core/components/table/pagination';
import Filters from './filters';

export type AllJobsTableDataType = (typeof jobData)[number];

export default function AllJobsTable({ className }: { className?: string }) {
  const { table, setData } = useTanStackTable<AllJobsTableDataType>({
    tableData: jobData,
    columnConfig: allJobsColumns,
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
      title="All Job List"
      className={cn('p-0 @container lg:p-0', className)}
      titleClassName="whitespace-nowrap font-inter"
      headerClassName="mb-6 items-start flex-col @[57rem]:flex-row @[57rem]:items-center pt-5 px-5 lg:pt-7 lg:px-7"
      actionClassName="grow @[57rem]:ps-11 ps-0 items-center w-full @[42rem]:w-full @[57rem]:w-auto "
      action={<Filters table={table} />}
    >
      <Table table={table} variant="modern" />
      <TablePagination table={table} className="p-4" />
    </WidgetCard>
  );
}
