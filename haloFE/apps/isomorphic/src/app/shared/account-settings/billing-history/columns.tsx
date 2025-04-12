'use client';

import { exportToCSV } from '@core/utils/export-to-csv';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import Image from 'next/image';
import { PiCloudArrowDown } from 'react-icons/pi';
import { Badge, Button, Checkbox, Flex, Text, Title } from 'rizzui';
import { BillingHistoryDataType } from './table';

const statusColors: any = {
  'In Progress': 'info',
  Paid: 'success',
  Canceled: 'secondary',
  'On hold': 'danger',
};

function handleDownloadRowData(row: { [key: string]: any }) {
  exportToCSV(
    [row],
    'Title,Amount,Date,Status,Shared',
    `billing_history_${row.id}`
  );
}

const columnHelper = createColumnHelper<BillingHistoryDataType>();

export const billingHistoryColumns = [
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
    id: 'name',
    size: 250,
    header: 'Name',
    cell: ({ row }) => (
      <Title as="h6" className="mb-0.5 !text-sm font-medium text-gray-700">
        {row.original.title} - {dayjs(row.original.date).format('MMM YYYY')}
      </Title>
    ),
  }),
  columnHelper.display({
    id: 'amount',
    size: 150,
    header: 'Amount',
    cell: ({ row }) => (
      <span className="text-gray-700">{row.original.amount}</span>
    ),
  }),
  columnHelper.display({
    id: 'date',
    size: 150,
    header: 'Date',
    cell: ({ row }) => (
      <Text className="mb-1 text-gray-700">
        {dayjs(row.original.date).format('DD MMM YYYY')}
      </Text>
    ),
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 180,
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        variant="flat"
        rounded="pill"
        className="w-[90px] font-medium"
        color={statusColors[row.original.status]}
      >
        {row.original.status}
      </Badge>
    ),
  }),
  columnHelper.display({
    id: 'shared',
    size: 200,
    header: 'Shared',
    cell: ({ row }) => (
      <Flex align="center" justify="start" className="gap-0">
        {row.original.shared.map((avatar: any, index: number) => {
          return (
            <Image
              key={`file-avatar-${index}`}
              src={avatar}
              width={26}
              height={26}
              className="-me-2 aspect-square rounded-full border-2 border-gray-0"
              alt="File Avatar"
            />
          );
        })}
      </Flex>
    ),
  }),
  columnHelper.display({
    id: 'action',
    size: 120,
    cell: ({ row }) => (
      <Button
        variant="text"
        onClick={() => handleDownloadRowData(row.original)}
      >
        <PiCloudArrowDown className="size-6 text-gray-500" />
      </Button>
    ),
  }),
];
