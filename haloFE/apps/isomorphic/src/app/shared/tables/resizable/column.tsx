'use client';

import { routes } from '@/config/routes';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import TableRowActionGroup from '@core/components/table-utils/table-row-action-group';
import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox, Text } from 'rizzui';
import { PersonType } from '.';

const columnHelper = createColumnHelper<PersonType>();

export const defaultColumns = [
  columnHelper.accessor('id', {
    id: 'id',
    size: 60,
    header: ({ table }) => (
      <Checkbox
        className="ps-2"
        aria-label="Select all rows"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-2"
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
    enableSorting: false,
  }),
  columnHelper.accessor('name', {
    id: 'name',
    size: 240,
    header: 'Customer',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
    enableSorting: false,
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 260,
    header: 'Email',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Created At',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Due Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Amount',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 120,
    header: 'Status',
    cell: (info) => getStatusBadge(info.renderValue()!),
  }),
  columnHelper.display({
    id: 'actions',
    size: 160,
    enableResizing: false,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <TableRowActionGroup
        editUrl={routes.invoice.edit(row.original.id)}
        viewUrl={routes.invoice.details(row.original.id)}
        onDelete={() => meta?.handleDeleteRow?.(row.original)}
        deletePopoverTitle={`Delete the invoice`}
        deletePopoverDescription={`Are you sure you want to delete this #${row.id} invoice?`}
      />
    ),
  }),
];
