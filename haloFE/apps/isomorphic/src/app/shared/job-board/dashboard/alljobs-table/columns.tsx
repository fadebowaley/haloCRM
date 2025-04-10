'use client';

import { Checkbox, Text } from 'rizzui';
import { AllJobsTableDataType } from '.';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import { StatusSelect } from '@core/components/table-utils/status-select';
import TableRowActionGroup from '@core/components/table-utils/table-row-action-group';

const statusOptions = [
  { label: 'Live', value: 'Live' },
  { label: 'Closed', value: 'Closed' },
];

const columnHelper = createColumnHelper<AllJobsTableDataType>();

export const allJobsColumns = [
  columnHelper.display({
    id: 'select',
    size: 50,
    header: ({ table }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select all rows"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
  }),
  columnHelper.display({
    id: 'jobId',
    size: 90,
    header: 'JOB ID',
    cell: ({ row }) => <Text>#{row.original.id}</Text>,
  }),
  columnHelper.display({
    id: 'created',
    size: 180,
    header: 'Created',
    cell: ({ row }) => <DateCell date={new Date(row.original.date)} />,
  }),
  columnHelper.accessor('title', {
    id: 'title',
    size: 200,
    header: 'Job Title',
    cell: ({ row }) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {row.original.title}
      </Text>
    ),
  }),
  columnHelper.display({
    id: 'candidates',
    size: 120,
    header: 'Candidates',
    cell: ({ row }) => <Text>{row.original.candidates}</Text>,
  }),
  columnHelper.display({
    id: 'inProcess',
    size: 100,
    header: 'In Process',
    cell: ({ row }) => <Text>{row.original.inProcess}</Text>,
  }),
  columnHelper.display({
    id: 'hired',
    size: 80,
    header: 'Hired',
    cell: ({ row }) => <Text>{row.original.hired}</Text>,
  }),
  columnHelper.accessor('category', {
    id: 'category',
    size: 200,
    header: 'Category',
    cell: ({ row: { original } }) => {
      let print = original.category?.slice(0, 2);
      let more =
        original.category.length - original.category.slice(0, 2).length;
      return (
        <div className="flex h-auto flex-wrap gap-2">
          {print.map((item: string, index: number) => (
            <span
              key={index}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs"
            >
              {item}
            </span>
          ))}
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
            +{more}
          </span>
        </div>
      );
    },
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 150,
    header: 'Status',
    cell: (info) => (
      <StatusSelect selectItem={info.getValue()} options={statusOptions} />
    ),
  }),
  columnHelper.display({
    id: 'actions',
    size: 140,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <TableRowActionGroup
        onDelete={() => meta?.handleDeleteRow?.(row.original)}
      />
    ),
  }),
];
