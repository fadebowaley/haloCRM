'use client';

import DateFiled from '@core/components/controlled-table/date-field';
import PriceField from '@core/components/controlled-table/price-field';
import StatusField from '@core/components/controlled-table/status-field';
import { FilterDrawerView } from '@core/components/controlled-table/table-filter';
import {
  renderOptionDisplayValue,
  statusOptions,
} from '@/app/shared/invoice/form-utils';
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
import { Button, Flex, Input } from 'rizzui';
import ToggleColumns from '@core/components/table-utils/toggle-columns';

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>;
}

export default function Filters<TData extends Record<string, any>>({
  table,
}: TableToolbarProps<TData>) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const isLarge = useMedia('(min-width: 1920px)', false);

  return (
    <Flex align="center" justify="between" className="mb-4 gap-0">
      <Flex align="center" className="w-auto flex-wrap">
        <Input
          type="search"
          placeholder="Search by customer name..."
          value={table.getState().globalFilter ?? ''}
          onClear={() => table.setGlobalFilter('')}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          inputClassName="h-9"
          clearable={true}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
        />
        {isLarge && showFilters && <FilterElements table={table} />}
      </Flex>
      <Flex align="center" className="w-auto">
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
            'h-[34px] pe-3 ps-2.5',
            isLarge && showFilters && 'border-dashed border-gray-700'
          )}
        >
          <PiFunnel className="me-1.5 size-[18px]" strokeWidth={1.7} />
          {isLarge && showFilters ? 'Hide' : 'Filters'}
        </Button>

        {!isLarge && (
          <FilterDrawerView
            drawerTitle="Table Filters"
            isOpen={openDrawer}
            setOpenDrawer={setOpenDrawer}
          >
            <div className="grid grid-cols-1 gap-6">
              <FilterElements table={table} />
            </div>
          </FilterDrawerView>
        )}

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
    table.getColumn('dueDate')?.getFilterValue() ?? ([null, null] as any);
  const isFiltered =
    table.getState().globalFilter || table.getState().columnFilters.length > 0;
  return (
    <>
      <PriceField
        value={priceFieldValue}
        onChange={(v) => table.getColumn('amount')?.setFilterValue(v)}
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
          labelClassName: '3xl:hidden',
        }}
      />
      <DateFiled
        selectsRange
        dateFormat={'dd-MMM-yyyy'}
        className="w-full"
        placeholderText="Select due date"
        endDate={getDateRangeStateValues(dueDate[1])!}
        selected={getDateRangeStateValues(dueDate[0])}
        startDate={getDateRangeStateValues(dueDate[0])!}
        onChange={(date) => table.getColumn('dueDate')?.setFilterValue(date)}
        inputProps={{
          label: 'Due Date',
          labelClassName: '3xl:hidden',
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
        labelClassName="3xl:hidden"
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
          <PiTrashDuotone className="me-1.5 size-[17px]" /> Clear
        </Button>
      )}
    </>
  );
}
