'use client';

import { StatusSelect } from '@core/components/table-utils/status-select';
import TableRowActionGroup from '@core/components/table-utils/table-row-action-group';
import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox, Text } from 'rizzui';
import { AppointmentDataType } from '.';

const statusOptions = [
  { label: 'Waiting', value: 'Waiting' },
  { label: 'Scheduled', value: 'Scheduled' },
];

const columnHelper = createColumnHelper<AppointmentDataType>();

export const appointmentColumns = [
  columnHelper.accessor('id', {
    size: 30,
    enableSorting: false,
    header: ({ table }) => (
      <Checkbox
        className="ps-3"
        aria-label="Select all rows"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-3"
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
  }),
  columnHelper.accessor('patient.email', {
    size: 100,
    header: 'Serial.',
    enableSorting: false,
    cell: ({ row: { original } }) => <Text>#{original.id}</Text>,
  }),
  columnHelper.accessor('date', {
    size: 180,
    header: 'Date',
    enableSorting: false,
    cell: (info) => <DateCell date={new Date(info.getValue())} />,
  }),
  columnHelper.accessor('patient.name', {
    size: 230,
    header: 'Patient Name',
    enableSorting: false,
    cell: ({ row: { original } }) => (
      <>
        <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
          {original.patient.name}
        </Text>
        {original.patient.email && (
          <Text className="text-[13px] text-gray-500">
            {original.patient.email}
          </Text>
        )}
      </>
    ),
  }),
  columnHelper.accessor('doctor.name', {
    size: 300,
    header: 'Appointed To',
    enableSorting: false,
    cell: ({ row: { original } }) => (
      <AvatarCard
        src={original.doctor.avatar}
        name={original.doctor.name}
        description={original.doctor.email}
      />
    ),
  }),
  columnHelper.accessor('type', {
    size: 160,
    header: 'Service Type',
    cell: (info) => (
      <Text className="whitespace-nowrap font-medium text-gray-900">
        {info.getValue()}
      </Text>
    ),
  }),
  columnHelper.accessor('duration', {
    size: 110,
    header: 'Duration',
    enableSorting: false,
    cell: ({ row: { original } }) => {
      const durationHour = Math.trunc(original.duration / 60);
      return (
        <span className="whitespace-nowrap font-semibold">
          {durationHour > 0 && `${Math.trunc(original.duration / 60)}h`}{' '}
          {original.duration % 60 > 0 ? `${original.duration % 60}m` : null}
        </span>
      );
    },
  }),
  columnHelper.accessor('amount', {
    size: 120,
    header: 'Payment',
    cell: ({ row: { original } }) => (
      <span className="whitespace-nowrap font-semibold">
        ${original.amount}
      </span>
    ),
  }),
  columnHelper.accessor('status', {
    size: 160,
    header: 'Status',
    cell: (info) => (
      <StatusSelect selectItem={info.getValue()} options={statusOptions} />
    ),
  }),
  columnHelper.accessor('address', {
    size: 150,
    header: '',
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <TableRowActionGroup
        onDelete={() => meta?.handleDeleteRow?.(row.original)}
      />
    ),
  }),
];
