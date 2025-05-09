'use client';

import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import { Badge, Checkbox, Flex } from 'rizzui';
import { UsersTableDataType } from '.';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import TableRowActionGroup from '@core/components/table-utils/table-row-action-group';

const columnHelper = createColumnHelper<UsersTableDataType>();

export const usersColumns = [
  columnHelper.display({
    id: 'select',
    size: 50,
    header: ({ table }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select all Rows"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select Row"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  }),
  columnHelper.accessor('userId', {
    id: 'userId',
    size: 120,
    header: 'Halo ID',
    cell: ({ row }) => <>#{row.original.userId}</>,
  }),
  columnHelper.accessor('fullName', {
    id: 'fullName',
    size: 300,
    header: 'Name',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.fullName}
        description={row.original.email}
      />
    ),
  }),
  columnHelper.accessor('roles', {
    id: 'roles',
    size: 150,
    header: 'Role',
    cell: ({ row }) => {
      const roles: string[] = row.getValue('roles') || [];
      const hasRoles = roles.length > 0;
      const primaryRole = hasRoles ? roles[0] : 'No Role';
      const extraCount = hasRoles ? roles.length - 1 : 0;

      return (
        <div className="relative inline-block">
          <Badge variant="outline" color="primary" className="text-xs">
            {primaryRole}
          </Badge>
          {extraCount > 0 && (
            <span className="absolute -right-3 -top-2 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              +{extraCount}
            </span>
          )}
        </div>
      );
    },
  }),

  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Created',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('otpVerified', {
    id: 'otpVerified',
    size: 150,
    header: 'Verification',
    cell: ({ row }) =>
      row.original.otpVerified ? (
        <Badge variant="outline" color="success">
          Verified
        </Badge>
      ) : (
        <Badge variant="outline" color="danger">
          Unverified
        </Badge>
      ),
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 150,
    header: 'Status',
    enableSorting: false,
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
  columnHelper.display({
    id: 'action',
    size: 140,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <TableRowActionGroup
        deletePopoverTitle={`Delete this user`}
        deletePopoverDescription={`Are you sure you want to delete this #${row.original.userId} user?`}
        onDelete={() => meta?.handleDeleteRow?.(row.original.id)}
        viewUrl={`/users/${row.original.id}`}
        editUrl={`/users/${row.original.id}/edit`}
      />
    ),
  }),
];
