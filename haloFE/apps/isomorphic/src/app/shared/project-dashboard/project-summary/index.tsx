'use client';

import React from 'react';
import cn from '@core/utils/class-names';
import { defaultColumns } from './column';
import ProjectSummaryToolbar from './toolbar';
import Table from '@core/components/table';
import WidgetCard from '@core/components/cards/widget-card';
import { projectSummaryData } from '@/data/project-dashboard';
import TablePagination from '@core/components/table/pagination';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';

export type ProjectSummaryDataType = (typeof projectSummaryData)[number];

export default function ProjectSummary({ className }: { className?: string }) {
  const { table } = useTanStackTable<ProjectSummaryDataType>({
    tableData: projectSummaryData,
    columnConfig: defaultColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 5,
        },
      },
      enableColumnResizing: false,
    },
  });

  return (
    <WidgetCard
      title="Project Summary"
      actionClassName="ps-0 w-full @xl:ps-2 @xl:w-auto"
      headerClassName="flex-wrap gap-4 @xl:flex-nowrap mb-4 px-5 pt-5 lg:px-7 lg:pt-7"
      className={cn(
        'space-y-4 p-0 @container dark:bg-gray-100/50 lg:p-0',
        className
      )}
      action={
        <ProjectSummaryToolbar
          table={table}
          className="w-full justify-between"
        />
      }
    >
      <Table
        table={table}
        variant="modern"
        classNames={{
          headerCellClassName: 'first:ps-6',
          cellClassName: 'first:ps-6',
        }}
      />
      <TablePagination table={table} className="p-4 pt-0" />
    </WidgetCard>
  );
}
