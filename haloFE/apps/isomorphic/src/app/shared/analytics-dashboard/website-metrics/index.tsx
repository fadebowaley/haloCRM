'use client';

import React from 'react';
import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { websiteMetricData } from '@/data/website-metrics-data';
import TablePagination from '@core/components/table/pagination';
import { Input } from 'rizzui';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { websiteMetricColumns } from './columns';

export type websiteMetricDataType = (typeof websiteMetricData)[number];

export default function WebsiteMetrics({ className }: { className?: string }) {
  const { table } = useTanStackTable<websiteMetricDataType>({
    tableData: websiteMetricData,
    columnConfig: websiteMetricColumns,
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
      title={'Website Metrics'}
      className={cn('p-0 lg:p-0', className)}
      headerClassName="px-5 pt-5 lg:pt-7 lg:px-7 mb-6"
      action={
        <Input
          type="search"
          clearable={true}
          inputClassName="h-[36px]"
          placeholder="Search by channel..."
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
        variant="elegant"
        classNames={{
          headerCellClassName:
            '[&>div]:flex [&>div]:justify-end [&>div]:first:justify-start',
        }}
      />
      <TablePagination table={table} className="p-4" />
    </WidgetCard>
  );
}
