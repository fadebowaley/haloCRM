'use client';

import { useState } from 'react';
import cn from '@core/utils/class-names';
import { useMedia } from 'react-use';
import { ActionIcon, Button, Checkbox, Input, Popover, Title } from 'rizzui';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { getDateRangeStateValues } from '@core/utils/get-formatted-date';
import {
  PiTrash,
  PiFunnel,
  PiTextColumns,
  PiTrashDuotone,
  PiMagnifyingGlassBold,
} from 'react-icons/pi';
import {
  statusOptions,
  renderOptionDisplayValue,
} from '@/app/shared/invoice/form-utils';
import PriceField from '@core/components/controlled-table/price-field';
import DateFiled from '@core/components/controlled-table/date-field';
import StatusField from '@core/components/controlled-table/status-field';
import { FilterDrawerView } from '@core/components/controlled-table/table-filter';

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>;
}

export default function TableToolbar<TData extends Record<string, any>>({
  table,
}: TableToolbarProps<TData>) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  const isMultipleSelected = table.getSelectedRowModel().rows.length > 1;

  const {
    options: { meta },
  } = table;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap items-center gap-4">
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
        {!isMediumScreen && showFilters && <FilterElements table={table} />}
      </div>
      <div className="flex items-center gap-4">
        <Button
          {...(isMediumScreen
            ? {
                onClick: () => {
                  setOpenDrawer(() => !openDrawer);
                },
              }
            : { onClick: () => setShowFilters(() => !showFilters) })}
          variant={'outline'}
          className={cn(
            'h-[34px] pe-3 ps-2.5',
            !isMediumScreen && showFilters && 'border-dashed border-gray-700'
          )}
        >
          <PiFunnel className="me-1.5 h-[18px] w-[18px]" strokeWidth={1.7} />
          {!isMediumScreen && showFilters ? 'Hide' : 'Filters'}
        </Button>

        {isMediumScreen && (
          <FilterDrawerView isOpen={openDrawer} setOpenDrawer={setOpenDrawer}>
            <div className="grid grid-cols-1 gap-6">
              <FilterElements table={table} />
            </div>
          </FilterDrawerView>
        )}

        {isMultipleSelected ? (
          <Button
            size="sm"
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
              <div className="p-2 text-left rtl:text-right">
                <Title as="h6" className="mb-6 px-0.5 text-sm font-semibold">
                  Toggle Columns
                </Title>
                <div className="grid grid-cols-2 gap-6">
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
    </div>
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
