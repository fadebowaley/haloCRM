'use client';

import { Title, Input, Button } from 'rizzui';
import { PiMagnifyingGlassBold, PiTrashDuotone } from 'react-icons/pi';
import ViewSwitcher from '@/app/shared/file/manager/view-switcher';
import { type Table as ReactTableType } from '@tanstack/react-table';
import FileTypeDropdown from '@/app/shared/file/manager/file-sortby-type';
import FileDateSortingDropdown from '@/app/shared/file/manager/file-sortby-date';

export default function FileTableFilters<TData extends Record<string, any>>({
  table,
}: {
  table: ReactTableType<TData>;
}) {
  const isFiltered =
    table.getState().globalFilter || table.getState().columnFilters.length > 0;
  return (
    <div className="mb-4 flex flex-wrap items-center">
      <Title
        as="h4"
        className="order-1 basis-1/2 md:order-1 md:me-3 md:basis-auto"
      >
        All Files
      </Title>
      <div className="order-3 mt-4 flex flex-grow basis-full items-center gap-2 md:order-2 md:mt-0 md:basis-auto">
        <FileTypeDropdown
          updateFilter={(_, value) =>
            table.getColumn('type')?.setFilterValue(value)
          }
        />
        <FileDateSortingDropdown />
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
      </div>
      <div className="order-2 ml-auto flex basis-1/2 items-center justify-end gap-3 md:order-3 md:basis-auto md:gap-5">
        <Input
          type="search"
          placeholder="Search by file name..."
          value={table.getState().globalFilter ?? ''}
          onClear={() => table.setGlobalFilter('')}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          inputClassName="h-9"
          clearable={true}
          prefix={<PiMagnifyingGlassBold className="size-4" />}
        />
        <ViewSwitcher />
      </div>
    </div>
  );
}
