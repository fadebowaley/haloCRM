'use client';

import Link from 'next/link';
import { Box, Title } from 'rizzui';
import { routes } from '@/config/routes';
import Table from '@core/components/table';
import { fileListColumns } from './columns';
import { allFilesData } from '@/data/all-files';
import TablePagination from '@core/components/table/pagination';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';

export type FileListDataType = (typeof allFilesData)[number];

export default function FileListTable({ className }: { className?: string }) {
  const { table, setData } = useTanStackTable<FileListDataType>({
    tableData: allFilesData,
    columnConfig: fileListColumns,
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
    <div className={className}>
      <div className="mb-3 flex items-center justify-between 2xl:mb-5">
        <Title
          as="h3"
          className="text-lg font-semibold text-gray-900 xl:text-xl"
        >
          All Files
        </Title>
        <Link
          href={routes.file.manager}
          className="text-sm font-medium text-gray-900 hover:underline"
        >
          View all
        </Link>
      </div>
      <Box className="space-y-4">
        <Table
          table={table}
          classNames={{
            container: 'border border-muted rounded-lg',
            rowClassName: 'last:border-b-0',
            headerClassName: '!border-t-0',
          }}
        />
        <TablePagination table={table} />
      </Box>
    </div>
  );
}
