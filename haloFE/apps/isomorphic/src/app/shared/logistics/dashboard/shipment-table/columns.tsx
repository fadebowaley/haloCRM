'use client';

import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import { getStatusColors } from '@core/components/table-utils/get-status-color';
import TableRowActionGroup from '@core/components/table-utils/table-row-action-group';
import { StatusType } from '@/data/shipment-data';
import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { toCurrency } from '@core/utils/to-currency';
import { createColumnHelper } from '@tanstack/react-table';
import { Badge, Checkbox, Text } from 'rizzui';
import { ShipmentTableDataType } from './table';

const columnHelper = createColumnHelper<ShipmentTableDataType>();

export const pendingShipmentsColumns = [
  columnHelper.display({
    id: 'checked',
    size: 70,
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="ps-4"
        />
      );
    },
  }),
  columnHelper.display({
    id: 'trackingNumber',
    size: 180,
    header: 'Tracking Number',
    cell: ({ row }) => {
      return <Text>{row.original.trackingNumber}</Text>;
    },
  }),
  columnHelper.accessor('recipient', {
    id: 'recipient',
    size: 250,
    header: 'Recipient',
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <AvatarCard
          src={row.original.recipient.avatar}
          name={row.original.recipient.name}
          avatarProps={{
            name: row.original.recipient.name,
            size: 'sm',
          }}
        />
      );
    },
  }),
  columnHelper.display({
    id: 'destination',
    size: 200,
    header: 'Destination',
    cell: ({ row }) => {
      return <Text>{row.original.destination}</Text>;
    },
  }),
  columnHelper.accessor('date', {
    id: 'date',
    size: 200,
    header: 'Date',
    cell: ({ row }) => {
      return <DateCell date={new Date(row.original.date)} />;
    },
  }),
  columnHelper.accessor('cost', {
    id: 'cost',
    size: 140,
    header: 'Total Cost',
    cell: ({ row }) => {
      return (
        <Text className="w-full pe-4 text-end font-medium">
          {toCurrency(row.original.cost)}
        </Text>
      );
    },
  }),
  columnHelper.accessor('payment', {
    id: 'payment',
    size: 200,
    header: 'Payment Method',
    cell: ({ row }) => {
      return <Text className="font-medium">{row.original.payment}</Text>;
    },
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 170,
    header: 'Status',
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <Badge
          variant="outline"
          className="w-32 font-medium"
          color={getStatusColors(row.original.status as StatusType)}
          data-color={getStatusColors(row.original.status as StatusType)}
        >
          {row.original.status}
        </Badge>
      );
    },
  }),
  columnHelper.display({
    id: 'invoiceStatus',
    size: 160,
    header: 'Invoice Status',
    cell: ({ row }) => getStatusBadge(row.original.invoiceStatus),
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
