'use client';

import DeletePopover from '@core/components/delete-popover';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { StatusSelect } from '@core/components/table-utils/status-select';
import EyeIcon from '@core/components/icons/eye';
import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from 'rizzui';
import { AppointmentDataType } from '.';
import CreateUpdateAppointmentForm from '../appointment-form';
import AppointmentDetails from './appointment-details';

const statusOptions = [
  { label: 'Waiting', value: 'Waiting' },
  { label: 'Scheduled', value: 'Scheduled' },
];

const columnHelper = createColumnHelper<AppointmentDataType>();

export const appointmentColumns = [
  columnHelper.display({
    id: 'select',
    size: 30,
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all rows"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
  }),
  columnHelper.display({
    id: 'serialNo',
    size: 100,
    header: 'Serial No',
    cell: ({ row }) => <Text>#{row.original.id}</Text>,
  }),
  columnHelper.accessor('date', {
    id: 'date',
    size: 170,
    header: 'Date',
    enableSorting: false,
    cell: ({ row }) => <DateCell date={new Date(row.original.date)} />,
  }),
  columnHelper.accessor('patient.name', {
    id: 'patientName',
    size: 230,
    header: 'Patient Name',
    enableSorting: false,
    cell: ({ row: { original } }) => (
      <div>
        <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
          {original.patient.name}
        </Text>
        {original.patient.email && (
          <Text className="text-[13px] text-gray-500">
            {original.patient.email}
          </Text>
        )}
      </div>
    ),
  }),
  columnHelper.accessor('doctor.name', {
    id: 'doctorName',
    size: 270,
    header: 'Appointed to',
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
    id: 'type',
    size: 180,
    header: 'Service Type',
    cell: ({ row }) => (
      <Text className="whitespace-nowrap font-medium text-gray-900">
        {row.original.type}
      </Text>
    ),
  }),
  columnHelper.display({
    id: 'duration',
    size: 100,
    header: 'Duration',
    cell: ({ row }) => {
      const durationHour = Math.trunc(row.original.duration / 60);
      return (
        <span className="whitespace-nowrap font-semibold">
          {durationHour > 0 && `${Math.trunc(row.original.duration / 60)}h`}{' '}
          {row.original.duration % 60 > 0
            ? `${row.original.duration % 60}m`
            : null}
        </span>
      );
    },
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 100,
    header: 'Payment',
    cell: ({ row }) => (
      <span className="whitespace-nowrap font-semibold">
        ${row.original.amount}
      </span>
    ),
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 150,
    header: 'Status',
    cell: ({ row }) => (
      <StatusSelect options={statusOptions} selectItem={row.original.status} />
    ),
  }),
  columnHelper.display({
    id: 'actions',
    size: 80,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <AppointmentListActions
        row={row.original}
        onDelete={() => meta?.handleDeleteRow?.(row.original)}
      />
    ),
  }),
];

function AppointmentListActions({
  row,
  onDelete,
}: {
  row: AppointmentDataType;
  onDelete: () => void;
}) {
  const { openModal, closeModal } = useModal();
  function handleCreateModal() {
    closeModal(),
      openModal({
        view: <CreateUpdateAppointmentForm />,
        customSize: 700,
      });
  }
  return (
    <Flex align="center" justify="end" gap="3" className="pe-3">
      <Tooltip
        size="sm"
        content={'View Appointment'}
        placement="top"
        color="invert"
      >
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'View Appointment'}
          className="hover:!border-gray-900 hover:text-gray-700"
          onClick={() =>
            openModal({
              view: (
                <AppointmentDetails
                  data={row}
                  onDelete={onDelete}
                  onEdit={handleCreateModal}
                />
              ),
              customSize: 900,
            })
          }
        >
          <EyeIcon className="size-4" />
        </ActionIcon>
      </Tooltip>
      <DeletePopover
        title={`Delete the appointment`}
        description={`Are you sure you want to delete this #${row.id} appointment?`}
        onDelete={onDelete}
      />
    </Flex>
  );
}
