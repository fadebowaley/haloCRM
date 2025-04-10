'use client';

import { getStatusColors } from '@core/components/table-utils/get-status-color';
import TableRowActionGroup from '@core/components/table-utils/table-row-action-group';
import { routes } from '@/config/routes';
import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { Badge, Checkbox } from 'rizzui';
import { ShipmentListTableDataType } from './table';
import { table } from 'console';

const columnHelper = createColumnHelper<ShipmentListTableDataType>();

export const shipmentListColumns = [
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
  columnHelper.accessor('trackingId', {
    id: 'trackingId',
    size: 150,
    header: 'Tracking ID',
    cell: ({ row }) => (
      <Link
        href={routes.logistics.shipmentDetails(row.original.id)}
        className="duration-200 hover:text-gray-900 hover:underline"
      >
        {row.original.trackingId}
      </Link>
    ),
  }),
  columnHelper.accessor('date', {
    id: 'date',
    size: 150,
    header: 'Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.date)} />,
  }),
  columnHelper.accessor('sender.name', {
    id: 'sender',
    size: 250,
    header: 'Sender',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.sender.avatar}
        name={row.original.sender.name}
      />
    ),
  }),
  columnHelper.accessor('receiver.name', {
    id: 'receiver',
    size: 250,
    header: 'Receiver',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.receiver.avatar}
        name={row.original.receiver.name}
      />
    ),
  }),
  columnHelper.accessor('origin', {
    id: 'origin',
    size: 200,
    header: 'Origin',
    cell: ({ row }) => row.original.origin,
  }),
  columnHelper.accessor('destination', {
    id: 'destination',
    size: 200,
    header: 'Destination',
    cell: ({ row }) => row.original.destination,
  }),
  columnHelper.accessor('paymentMethod', {
    id: 'paymentMethod',
    size: 220,
    header: 'Payment Method',
    cell: ({ row }) => row.original.paymentMethod,
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 180,
    header: 'Status',
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Badge renderAsDot color={getStatusColors(row.original.status)} />
        {row.original.status}
      </div>
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
        deletePopoverTitle="Delete the shipment"
        onDelete={() => {
          meta?.handleDeleteRow?.(row.original);
        }}
        editUrl={routes.logistics.editShipment(row.original.id)}
        viewUrl={routes.logistics.shipmentDetails(row.original.id)}
        deletePopoverDescription={`Are you sure you want to delete this #${row.original.id} shipment?`}
      />
    ),
  }),
];
