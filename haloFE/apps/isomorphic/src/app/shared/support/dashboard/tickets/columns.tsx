'use client';

import TableRowActionGroup from '@core/components/table-utils/table-row-action-group';
import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import { Badge, Checkbox } from 'rizzui';
import { TicketsDataType } from './table';

const colors = {
  Low: 'success',
  Medium: 'warning',
  High: 'danger',
};

const statusColors = {
  'In Progress': 'info',
  Completed: 'success',
  Open: 'secondary',
  Closed: 'danger',
};

const columnHelper = createColumnHelper<TicketsDataType>();

export const ticketsColumns = [
  columnHelper.display({
    id: 'select',
    size: 50,
    cell: ({ row }) => (
      <Checkbox
        variant="flat"
        className="ps-3.5"
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
  }),
  columnHelper.accessor('issue', {
    id: 'issue',
    size: 300,
    header: 'Issue',
    cell: ({ row }) => <p className="line-clamp-1">{row.original.issue}</p>,
  }),
  columnHelper.accessor('author.name', {
    id: 'author',
    size: 300,
    header: 'Client',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.author.avatar}
        name={row.original.author.name}
      />
    ),
  }),
  columnHelper.accessor('agent.name', {
    id: 'agent',
    size: 270,
    header: 'Assigned To',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.agent.avatar}
        name={row.original.agent.name}
      />
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 190,
    header: 'Date Created',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 190,
    header: 'Due Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.dueDate)} />,
  }),
  columnHelper.accessor('priority', {
    id: 'priority',
    size: 140,
    header: 'Priority',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Badge
          renderAsDot
          color={colors[row.original.priority as keyof typeof colors] as any}
        />
        <span>{row.original.priority}</span>
      </div>
    ),
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 140,
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="w-[90px] font-medium"
        color={
          statusColors[row.original.status as keyof typeof statusColors] as any
        }
      >
        {row.original.status}
      </Badge>
    ),
  }),
  columnHelper.display({
    id: 'actions',
    size: 120,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <TableRowActionGroup
        onDelete={() =>
          meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
        }
      />
    ),
  }),
];
