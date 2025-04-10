'use client';

import FolderIcon from '@core/components/icons/folder-solid';
import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from 'rizzui';
import { SnippetsAndTemplatesDataType } from './table';
import { SnippetsTableActions } from './snippets-table-actions';

const columnHelper = createColumnHelper<SnippetsAndTemplatesDataType>();

export const snippetsAndTemplatesColumns = [
  columnHelper.display({
    id: 'checked',
    size: 50,
    header: ({ table }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select all rows"
        checked={table.getIsAllRowsSelected()}
        onChange={() => table.toggleAllRowsSelected()}
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
  columnHelper.accessor('name', {
    id: 'name',
    size: 250,
    header: 'Name',
    cell: ({ row }) => row.original.name,
  }),
  columnHelper.accessor('createdBy', {
    id: 'createdBy',
    size: 300,
    header: 'Created By',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        avatarProps={{
          name: row.original.name,
          size: 'sm',
        }}
      />
    ),
  }),
  columnHelper.accessor('folder', {
    id: 'folder',
    size: 200,
    header: 'Folder',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <FolderIcon className="h-6 w-6" />
        <span className="font-medium">{row.original.folder}</span>
      </div>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Date Created',
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  }),
  columnHelper.accessor('updatedAt', {
    id: 'updatedAt',
    size: 200,
    header: 'Date Modified',
    cell: ({ row }) => <DateCell date={row.original.updatedAt} />,
  }),
  columnHelper.display({
    id: 'action',
    size: 120,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <SnippetsTableActions
        row={row.original}
        onDelete={() => meta?.handleDeleteRow?.(row.original)}
      />
    ),
  }),
];
