'use client';

import DateFiled from '@core/components/controlled-table/date-field';
import StatusField from '@core/components/controlled-table/status-field';
import { FilterDrawerView } from '@core/components/controlled-table/table-filter';
import { getStatusColors } from '@core/components/table-utils/get-status-color';
import ToggleColumns from '@core/components/table-utils/toggle-columns';
import { paymentMethods, shippingStatuses } from '@/data/shipment-data';
import cn from '@core/utils/class-names';
import { getDateRangeStateValues } from '@core/utils/get-formatted-date';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { useState } from 'react';
import {
  PiFunnel,
  PiMagnifyingGlassBold,
  PiTrashDuotone,
} from 'react-icons/pi';
import { useMedia } from 'react-use';
import { Badge, Button, Flex, Input, Text } from 'rizzui';

const paymentStatusOptions = Object.entries(shippingStatuses).map(
  ([value, label]) => ({
    label,
    value,
  })
);

const paymentMethodOptions = Object.entries(paymentMethods).map(
  ([value, label]) => ({ label, value })
);

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>;
}

export default function Filters<TData extends Record<string, any>>({
  table,
}: TableToolbarProps<TData>) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isLarge = useMedia('(min-width: 1860px)', false);
  const [showFilters, setShowFilters] = useState(true);
  return (
    <Flex align="center" justify="between" className="mb-4">
      <Flex align="center" gap="3">
        <Input
          type="search"
          placeholder="Search by anything..."
          value={table.getState().globalFilter ?? ''}
          onClear={() => table.setGlobalFilter('')}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          inputClassName="h-9"
          clearable={true}
          prefix={<PiMagnifyingGlassBold className="size-4" />}
        />
        {showFilters && isLarge && <FilterElements table={table} />}
      </Flex>
      {!isLarge && (
        <FilterDrawerView
          isOpen={openDrawer}
          drawerTitle="Table Filters"
          setOpenDrawer={setOpenDrawer}
        >
          <div className="grid grid-cols-1 gap-6">
            <FilterElements table={table} />
          </div>
        </FilterDrawerView>
      )}
      <Flex align="center" justify="end" gap="3" className="w-auto shrink-0">
        <Button
          {...(!isLarge
            ? {
                onClick: () => {
                  setOpenDrawer(() => !openDrawer);
                },
              }
            : { onClick: () => setShowFilters(() => !showFilters) })}
          variant={'outline'}
          className={cn(
            'h-9 pe-3 ps-2.5',
            isLarge && showFilters && 'border-dashed border-gray-700'
          )}
        >
          <PiFunnel className="me-1.5 h-[18px] w-[18px]" strokeWidth={1.7} />
          {isLarge && showFilters ? 'Hide Filters' : 'Filters'}
        </Button>

        <ToggleColumns table={table} />
      </Flex>
    </Flex>
  );
}

function FilterElements<T extends Record<string, any>>({
  table,
}: TableToolbarProps<T>) {
  const date =
    table.getColumn('date')?.getFilterValue() ?? ([null, null] as any);
  const isFiltered =
    table.getState().globalFilter || table.getState().columnFilters.length > 0;
  return (
    <>
      <DateFiled
        selectsRange
        dateFormat={'dd-MMM-yyyy'}
        className="w-full"
        placeholderText="Select created date"
        endDate={getDateRangeStateValues(date[1])!}
        selected={getDateRangeStateValues(date[0])}
        startDate={getDateRangeStateValues(date[0])!}
        onChange={(date) => table.getColumn('date')?.setFilterValue(date)}
        inputProps={{
          label: 'Date',
          labelClassName: '[@media(min-width:1860px)]:hidden',
        }}
      />
      <StatusField
        options={paymentStatusOptions}
        value={table.getColumn('status')?.getFilterValue() ?? []}
        onChange={(e) => table.getColumn('status')?.setFilterValue(e)}
        getOptionValue={(option) => option.label}
        getOptionDisplayValue={(option) =>
          renderOptionDisplayValue(option.label as string)
        }
        displayValue={(selected: string) => renderOptionDisplayValue(selected)}
        dropdownClassName="!z-10 h-auto"
        className="w-full [@media(min-width:1860px)]:w-44"
        label="Status"
        labelClassName="[@media(min-width:1860px)]:hidden"
      />
      <StatusField
        placeholder="Select payment method"
        options={paymentMethodOptions}
        value={table.getColumn('paymentMethod')?.getFilterValue() ?? []}
        onChange={(e) => table.getColumn('paymentMethod')?.setFilterValue(e)}
        getOptionValue={(option: { label: any }) => option.label}
        dropdownClassName="!z-10 h-auto"
        className="w-full [@media(min-width:1860px)]:w-52"
        label="Payment Method"
        labelClassName="[@media(min-width:1860px)]:hidden"
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

function renderOptionDisplayValue(name: string) {
  return (
    <div className="flex items-center">
      <Badge renderAsDot color={getStatusColors(name)} />
      <Text className="ms-2">{name}</Text>
    </div>
  );
}
