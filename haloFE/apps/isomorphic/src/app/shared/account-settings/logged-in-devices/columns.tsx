'use client';

import Image from 'next/image';
import { Checkbox, Title, Text, Tooltip, ActionIcon, Badge } from 'rizzui';
import cn from '@core/utils/class-names';
import PencilIcon from '@core/components/icons/pencil';
import DeletePopover from '@core/components/delete-popover';
import { createColumnHelper } from '@tanstack/react-table';
import { LoggedInDevicesDataType } from './table';

const statusColors = {
  Offline: '',
  Active: 'success',
} as { [key: string]: string };

const chipsColors = {
  Design: 'bg-orange-lighter text-orange-dark',
  Product: 'bg-blue-lighter text-blue-dark',
  'Software Engineering': 'bg-green-lighter text-green-dark',
  Operations: 'bg-red-lighter text-red-dark',
  Finance: 'bg-primary-lighter text-primary-dark',
  'Human Resource': 'bg-secondary-lighter text-secondary-dark',
} as { [key: string]: string };

const columnHelper = createColumnHelper<LoggedInDevicesDataType>();

export const loggedInDeviceColumns = [
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
    id: 'userName',
    size: 350,
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center">
        <Image
          src={row.original.user.avatar}
          alt={row.original.user.name}
          width={36}
          height={36}
          className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 object-cover shadow-xl"
        />
        <div className="ml-3 rtl:ml-0 rtl:mr-3">
          <Title
            as="h6"
            className="mb-0.5 line-clamp-1 whitespace-nowrap !text-sm font-medium"
          >
            {row.original.user.name}
          </Title>
          <Text className="text-xs text-gray-500">
            {row.original.user.email}
          </Text>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 170,
    header: 'Status',
    cell: ({ row }) => (
      <>
        {row.original.status === 'Offline' ? (
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-100/80 px-2.5 py-1">
            <Badge renderAsDot />
            <span className="text-xs font-semibold text-gray-900">
              {row.original.status}
            </span>
          </div>
        ) : (
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-green-lighter px-2.5 py-1">
            <Badge
              renderAsDot
              color={statusColors[row.original.status] as any}
            />
            <span className="text-xs font-semibold text-green-dark">
              {row.original.status}
            </span>
          </div>
        )}
      </>
    ),
  }),
  columnHelper.display({
    id: 'email',
    size: 300,
    header: 'Email',
    cell: ({ row }) => (
      <span className="block whitespace-nowrap">{row.original.email}</span>
    ),
  }),
  columnHelper.display({
    id: 'teams',
    size: 300,
    header: 'Teams',
    cell: ({ row }) => (
      <div className="flex gap-2 whitespace-nowrap">
        {row.original.teams.map((item: any, index: number) => {
          return (
            <Text
              key={`chips-${index}`}
              as="span"
              className={cn(
                'inline-flex items-center justify-center gap-2 rounded-full bg-green-lighter px-2.5 py-1 text-xs font-semibold',
                chipsColors[item]
              )}
            >
              {item}
            </Text>
          );
        })}
      </div>
    ),
  }),
  columnHelper.display({
    id: 'action',
    size: 120,
    header: 'Actions',
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={'Edit Member'}
          placement="top"
          color="invert"
        >
          <ActionIcon size="sm" variant="outline">
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <DeletePopover
          title={`Delete Member`}
          description={`Are you sure you want to delete this #${row.id} member?`}
          onDelete={() => meta?.handleDeleteRow?.(row.original)}
        />
      </div>
    ),
  }),
];
