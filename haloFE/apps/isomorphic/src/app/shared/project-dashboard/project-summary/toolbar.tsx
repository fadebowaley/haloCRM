'use client';

import { PiTextColumns, PiTrashDuotone } from 'react-icons/pi';
import { type Table as ReactTableType } from '@tanstack/react-table';
import StatusField from '@core/components/controlled-table/status-field';
import {
  ActionIcon,
  Badge,
  Button,
  Checkbox,
  Popover,
  Text,
  Title,
} from 'rizzui';
import cn from '@core/utils/class-names';

export const statusOptions = [
  {
    label: 'Completed',
    value: 'completed',
  },
  {
    label: 'On Going',
    value: 'onGoing',
  },
  {
    label: 'Delayed',
    value: 'delayed',
  },
  {
    label: 'At Risk',
    value: 'atRisk',
  },
];

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>;
  className?: string;
}

export default function ProjectSummaryToolbar<
  TData extends Record<string, any>,
>({ table, className }: TableToolbarProps<TData>) {
  return (
    <div className={cn('flex items-center justify-end gap-4', className)}>
      <FilterElements table={table} />
      {table && (
        <Popover shadow="sm" placement="bottom-end">
          <Popover.Trigger>
            <ActionIcon
              variant="outline"
              title={'Toggle Columns'}
              className="h-auto w-auto p-1"
            >
              <PiTextColumns strokeWidth={3} className="size-6" />
            </ActionIcon>
          </Popover.Trigger>
          <Popover.Content className="z-0">
            <div className="px-0.5 pt-2 text-left rtl:text-right">
              <Title as="h6" className="mb-1 px-0.5 text-sm font-semibold">
                Toggle Columns
              </Title>
              <div className="grid grid-cols-2 gap-x-0 gap-y-5 px-1.5 pb-3.5 pt-4">
                {table.getAllLeafColumns().map((column) => {
                  return (
                    typeof column.columnDef.header === 'string' &&
                    column.columnDef.header.length > 0 && (
                      <Checkbox
                        key={column.id}
                        label={<>{column.columnDef.header}</>}
                        checked={column.getIsVisible()}
                        onChange={column.getToggleVisibilityHandler()}
                      />
                    )
                  );
                })}
              </div>
            </div>
          </Popover.Content>
        </Popover>
      )}
    </div>
  );
}

function FilterElements<T extends Record<string, any>>({
  table,
}: TableToolbarProps<T>) {
  const isFiltered =
    table.getState().globalFilter || table.getState().columnFilters.length > 0;
  return (
    <>
      <StatusField
        options={statusOptions}
        value={table.getColumn('status')?.getFilterValue() ?? []}
        onChange={(e) => table.getColumn('status')?.setFilterValue(e)}
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option) =>
          renderOptionDisplayValue(option.value as string)
        }
        displayValue={(selected: string) => renderOptionDisplayValue(selected)}
        dropdownClassName="!z-20 h-auto"
        className="w-auto"
      />

      {isFiltered && (
        <Button
          size="sm"
          onClick={() => {
            table.resetGlobalFilter();
            table.resetColumnFilters();
          }}
          variant="flat"
          className="h-9 bg-gray-200/70"
        >
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
        </Button>
      )}
    </>
  );
}

function renderOptionDisplayValue(value: string) {
  switch (value.toString()) {
    case 'onGoing':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-orange-dark">
            On Going
          </Text>
        </div>
      );
    case 'completed':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            Completed
          </Text>
        </div>
      );
    case 'atRisk':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-red-dark">
            At Risk
          </Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium capitalize text-gray-600">
            Delayed
          </Text>
        </div>
      );
  }
}
