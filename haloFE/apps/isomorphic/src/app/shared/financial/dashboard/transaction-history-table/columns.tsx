'use client';

import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import TableRowActionGroup from '@core/components/table-utils/table-row-action-group';
import MasterCardIcon from '@core/components/icons/mastercard';
import VisaIcon from '@core/components/icons/visa';
import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox, Text } from 'rizzui';
import { TransactionHistoryDataType } from '.';

const statusColorClassName = {
  Complete: 'text-green-dark before:bg-green-dark',
  Pending: 'before:bg-orange text-orange-dark',
  Canceled: 'text-red-dark before:bg-red-dark',
};

const columnHelper = createColumnHelper<TransactionHistoryDataType>();

export const transactionHistoryColumns = [
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
    id: 'id',
    size: 100,
    header: 'User Id',
    cell: ({ row }) => <Text>#{row.original.id}</Text>,
  }),
  columnHelper.display({
    id: 'date',
    size: 180,
    header: 'Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.date)} />,
  }),
  columnHelper.accessor('user.name', {
    id: 'user',
    size: 270,
    header: 'Recipient',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.user.avatar}
        name={row.original.user.name}
        description={row.original.user.email}
      />
    ),
  }),
  columnHelper.accessor('type', {
    id: 'type',
    size: 150,
    header: 'Type',
    cell: ({ row }) => (
      <Text className="whitespace-nowrap font-medium text-gray-900">
        {row.original.type}
      </Text>
    ),
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 100,
    header: 'Amount',
    enableSorting: true,
    cell: ({ row }) => (
      <span className="whitespace-nowrap font-semibold">
        ${row.original.amount}
      </span>
    ),
  }),
  columnHelper.display({
    id: 'currency',
    size: 100,
    header: 'Currency',
    cell: ({ row }) => (
      <span className="whitespace-nowrap font-semibold">
        {row.original.currency}
      </span>
    ),
  }),
  columnHelper.display({
    id: 'paymentMethod',
    size: 130,
    header: 'Method',
    cell: ({ row }) => (
      <PaymentMethodCell
        cardType={row.original.paymentMethod.cardType}
        lastCardNo={row.original.paymentMethod.lastCardNo}
      />
    ),
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 100,
    header: 'Status',
    cell: ({ row }) => getStatusBadge(row.original.status),
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
        onDelete={() =>
          meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
        }
      />
    ),
  }),
];

function PaymentMethodCell({
  cardType,
  lastCardNo,
}: {
  cardType: string;
  lastCardNo: string;
}) {
  return (
    <span className="flex gap-3">
      {cardType === 'Mastercard' ? (
        <MasterCardIcon className="h-auto w-6" />
      ) : (
        <VisaIcon className="h-auto w-6" />
      )}
      <Text className="font-semibold text-gray-900">***{lastCardNo}</Text>
    </span>
  );
}
