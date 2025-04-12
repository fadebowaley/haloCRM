'use client';

import { routes } from '@/config/routes';
import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox, Flex, Text } from 'rizzui';
import { PersonType } from '.';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import { PinningActions } from '@core/components/table-utils/row-pinning-actions';
import TableRowActionGroup from '@core/components/table-utils/table-row-action-group';

const columnHelper = createColumnHelper<PersonType>();

export const defaultColumns = [
  columnHelper.display({
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
  }),
  columnHelper.display({
    id: 'name',
    size: 220,
    header: 'Customer',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 220,
    header: 'Email',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 180,
    header: 'Created At',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 180,
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
  columnHelper.display({
    id: 'status',
    size: 120,
    header: 'Status',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
  columnHelper.display({
    id: 'actions',
    size: 240,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="end" gap="3" className="pe-3">
        <TableRowActionGroup
          className="pe-0"
          editUrl={routes.invoice.edit(row.original.id)}
          viewUrl={routes.invoice.details(row.original.id)}
          deletePopoverTitle="Delete the invoice"
          deletePopoverDescription={`Are you sure you want to delete this #${row.id} invoice?`}
          onDelete={() => meta?.handleDeleteRow?.(row.original)}
        />
        <PinningActions
          isPinned={Boolean(row.getIsPinned())}
          onPinTop={() => row.pin('top')}
          onPinBottom={() => row.pin('bottom')}
          onUnpin={() => row.pin(false)}
        />
      </Flex>
    ),
  }),
];
