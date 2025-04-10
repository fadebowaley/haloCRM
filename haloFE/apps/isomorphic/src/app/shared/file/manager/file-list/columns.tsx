'use client';

import Favorite from '@/app/shared/file/manager/favorite';
import { MoreActions } from '@core/components/table-utils/more-actions';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import Image from 'next/image';
import { Checkbox, Flex, Text, Title } from 'rizzui';
import { FileListTableDataType } from './table';

const columnHelper = createColumnHelper<FileListTableDataType>();

export const allFilesColumns = [
  columnHelper.display({
    id: 'checked',
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
  columnHelper.accessor('file.name', {
    id: 'name',
    size: 320,
    header: 'Name',
    cell: ({ row }) => (
      <Flex align="center">
        <Flex
          align="center"
          justify="center"
          className="size-12 rounded-xl bg-gray-100"
        >
          <Image
            src={row.original.file.avatar}
            className="aspect-square"
            width={26}
            height={26}
            alt={row.original.file.name}
          />
        </Flex>
        <Title as="h6" className="mb-0.5 !text-sm font-medium">
          {row.original.file.name}
        </Title>
      </Flex>
    ),
  }),
  columnHelper.display({
    id: 'size',
    size: 130,
    header: 'Size',
    cell: ({ row }) => (
      <span className="text-gray-500">{row.original.size}</span>
    ),
  }),
  columnHelper.accessor('type', {
    id: 'type',
    size: 130,
    header: 'Type',
    enableSorting: false,
    cell: ({ row }) => (
      <span className="capitalize text-gray-500">{row.original.type}</span>
    ),
  }),
  columnHelper.accessor('modified', {
    id: 'modified',
    size: 200,
    header: 'Modified',
    cell: ({ row }) => (
      <Text className="mb-1 text-gray-500">
        {dayjs(row.original.modified).format('DD MMM YYYY')}
      </Text>
    ),
  }),
  columnHelper.display({
    id: 'shared',
    size: 200,
    header: '',
    cell: ({ row }) => (
      <div className="flex items-center justify-start">
        {row.original.shared.map((img: any, index: number) => {
          return (
            <Image
              key={`file-avatar-${index}`}
              src={img}
              width={30}
              height={30}
              className="-me-2 aspect-square rounded-full border-2 border-gray-0 dark:border-gray-50"
              alt="File Avatar"
            />
          );
        })}
      </div>
    ),
  }),
  columnHelper.display({
    id: 'action',
    size: 100,
    header: '',
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="end">
        <Favorite />
        <MoreActions onDelete={() => meta?.handleDeleteRow?.(row.original)} />
      </Flex>
    ),
  }),
];
