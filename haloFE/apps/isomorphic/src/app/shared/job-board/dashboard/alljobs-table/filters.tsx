'use client';

import { Button, Flex, Input } from 'rizzui';
import { type Table as ReactTableType } from '@tanstack/react-table';
import StatusField from '@core/components/controlled-table/status-field';
import { PiMagnifyingGlassBold, PiTrashDuotone } from 'react-icons/pi';

const categoryOptions = [
  {
    label: 'Motion',
    value: 'motion',
  },
  {
    label: 'UI Designer',
    value: 'ui-designer',
  },
  {
    label: 'Animator',
    value: 'animator',
  },
  {
    label: 'Figma',
    value: 'figma',
  },
];

const statusOptions = [
  {
    label: 'Live',
    value: 'live',
  },
  {
    label: 'Closed',
    value: 'closed',
  },
];

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>;
}

export default function Filters<TData extends Record<string, any>>({
  table,
}: TableToolbarProps<TData>) {
  const isFiltered =
    table.getState().globalFilter || table.getState().columnFilters.length > 0;

  return (
    <Flex
      align="center"
      direction="col"
      className="mt-6 @3xl:flex-row @[62rem]:mt-0"
    >
      <Flex align="center" className="order-2 @3xl:order-1 @3xl:max-w-[360px]">
        <StatusField
          className="w-full"
          placeholder="Category"
          options={categoryOptions}
          dropdownClassName="!z-10 h-auto"
          getOptionValue={(option) => option.label}
          value={table.getColumn('category')?.getFilterValue() ?? ''}
          onChange={(e) => table.getColumn('category')?.setFilterValue(e)}
        />
        <StatusField
          className="w-full"
          options={statusOptions}
          dropdownClassName="!z-10 h-auto"
          getOptionValue={(option) => option.label}
          value={table.getColumn('status')?.getFilterValue() ?? ''}
          onChange={(e) => table.getColumn('status')?.setFilterValue(e)}
        />
      </Flex>

      {isFiltered ? (
        <Button
          variant="flat"
          onClick={() => {
            table.resetGlobalFilter();
            table.resetColumnFilters();
          }}
          className="order-3 h-9 w-full bg-gray-200/70 @3xl:order-2 @3xl:w-24"
        >
          <PiTrashDuotone className="me-1.5 size-4" /> Clear
        </Button>
      ) : null}

      <Input
        type="search"
        clearable={true}
        inputClassName="h-[36px]"
        placeholder="Search by patient name..."
        onClear={() => table.setGlobalFilter('')}
        value={table.getState().globalFilter ?? ''}
        prefix={<PiMagnifyingGlassBold className="size-4" />}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        className="w-full @3xl:order-3 @3xl:ms-auto @3xl:max-w-72"
      />
    </Flex>
  );
}
