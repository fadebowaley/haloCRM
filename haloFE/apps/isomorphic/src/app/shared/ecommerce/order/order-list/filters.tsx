'use client';

import DateFiled from '@core/components/controlled-table/date-field';
import PriceField from '@core/components/controlled-table/price-field';
import StatusField from '@core/components/controlled-table/status-field';
import { FilterDrawerView } from '@core/components/controlled-table/table-filter';
import ToggleColumns from '@core/components/table-utils/toggle-columns';
import { getDateRangeStateValues } from '@core/utils/get-formatted-date';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { useState } from 'react';
import {
  PiFunnel,
  PiMagnifyingGlassBold,
  PiTrash,
  PiTrashDuotone,
} from 'react-icons/pi';
import { Badge, Button, Flex, Input, Text } from 'rizzui';

const statusOptions = [
  {
    value: 'completed',
    label: 'Completed',
  },
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'cancelled',
    label: 'Cancelled',
  },
  {
    value: 'refunded',
    label: 'Refunded',
  },
];

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>;
}

export default function Filters<TData extends Record<string, any>>({
  table,
}: TableToolbarProps<TData>) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMultipleSelected = table.getSelectedRowModel().rows.length > 1;

  const {
    options: { meta },
  } = table;

  return (
    <Flex align="center" justify="between" className="mb-4">
      <Input
        type="search"
        placeholder="Search by customer name..."
        value={table.getState().globalFilter ?? ''}
        onClear={() => table.setGlobalFilter('')}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        inputClassName="h-9"
        clearable={true}
        prefix={<PiMagnifyingGlassBold className="size-4" />}
      />

      <FilterDrawerView
        isOpen={openDrawer}
        drawerTitle="Table Filters"
        setOpenDrawer={setOpenDrawer}
      >
        <div className="grid grid-cols-1 gap-6">
          <FilterElements table={table} />
        </div>
      </FilterDrawerView>

      <Flex align="center" gap="3" className="w-auto">
        {isMultipleSelected ? (
          <Button
            color="danger"
            variant="outline"
            className="h-[34px] gap-2 text-sm"
            onClick={() =>
              meta?.handleMultipleDelete &&
              meta.handleMultipleDelete(
                table.getSelectedRowModel().rows.map((r) => r.original.id)
              )
            }
          >
            <PiTrash size={18} />
            Delete
          </Button>
        ) : null}

        <Button
          variant={'outline'}
          onClick={() => setOpenDrawer(!openDrawer)}
          className="h-9 pe-3 ps-2.5"
        >
          <PiFunnel className="me-1.5 size-[18px]" strokeWidth={1.7} />
          Filters
        </Button>

        <ToggleColumns table={table} />
      </Flex>
    </Flex>
  );
}

function FilterElements<T extends Record<string, any>>({
  table,
}: TableToolbarProps<T>) {
  const priceFieldValue = (table.getColumn('amount')?.getFilterValue() ?? [
    '',
    '',
  ]) as string[];
  const createdDate =
    table.getColumn('createdAt')?.getFilterValue() ?? ([null, null] as any);
  const dueDate =
    table.getColumn('updatedAt')?.getFilterValue() ?? ([null, null] as any);
  const isFiltered =
    table.getState().globalFilter || table.getState().columnFilters.length > 0;
  return (
    <>
      <PriceField
        value={priceFieldValue}
        onChange={(v) => table.getColumn('amount')?.setFilterValue(v)}
        label="Amount"
      />
      <DateFiled
        selectsRange
        dateFormat={'dd-MMM-yyyy'}
        className="w-full"
        placeholderText="Select created date"
        endDate={getDateRangeStateValues(createdDate[1])!}
        selected={getDateRangeStateValues(createdDate[0])}
        startDate={getDateRangeStateValues(createdDate[0])!}
        onChange={(date) => table.getColumn('createdAt')?.setFilterValue(date)}
        inputProps={{
          label: 'Created Date',
        }}
      />
      <DateFiled
        selectsRange
        dateFormat={'dd-MMM-yyyy'}
        className="w-full"
        placeholderText="Select modified date"
        endDate={getDateRangeStateValues(dueDate[1])!}
        selected={getDateRangeStateValues(dueDate[0])}
        startDate={getDateRangeStateValues(dueDate[0])!}
        onChange={(date) => table.getColumn('updatedAt')?.setFilterValue(date)}
        inputProps={{
          label: 'Modified Date',
        }}
      />
      <StatusField
        options={statusOptions}
        value={table.getColumn('status')?.getFilterValue() ?? []}
        onChange={(e) => table.getColumn('status')?.setFilterValue(e)}
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option: { value: any }) =>
          renderOptionDisplayValue(option.value as string)
        }
        displayValue={(selected: string) => renderOptionDisplayValue(selected)}
        dropdownClassName="!z-20 h-auto"
        className={'w-auto'}
        label="Status"
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
  switch (value.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-orange-dark">
            {value}
          </Text>
        </div>
      );
    case 'completed':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            {value}
          </Text>
        </div>
      );
    case 'cancelled':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-red-dark">
            {value}
          </Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium capitalize text-gray-600">
            {value}
          </Text>
        </div>
      );
  }
}
