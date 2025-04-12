'use client';

import WidgetCard from '@core/components/cards/widget-card';
import DropdownAction from '@core/components/charts/dropdown-action';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import cn from '@core/utils/class-names';
import Table from '@core/components/table';
import { defaultColumns } from './column';
import { popularSellersData } from '@/data/bidding-data';

const viewOptions = [
  {
    value: 'Daily',
    label: 'Daily',
  },
  {
    value: 'Monthly',
    label: 'Monthly',
  },
];

export type SellerDataType = (typeof popularSellersData)[0];

export default function PopularSellers({ className }: { className?: string }) {
  const { table } = useTanStackTable<SellerDataType>({
    tableData: popularSellersData,
    columnConfig: defaultColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 5,
        },
      },
      enableSorting: false,
      enableColumnResizing: false,
    },
  });

  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      className={cn('@container', className)}
      title="Most Popular Sellers"
      titleClassName="font-inter"
      headerClassName="flex-wrap gap-4 items-center"
      actionClassName="ml-auto"
      action={
        <DropdownAction
          className="rounded-lg border"
          options={viewOptions}
          onChange={handleChange}
          dropdownClassName="!z-0"
        />
      }
    >
      <Table
        table={table}
        variant="minimal"
        classNames={{
          container:
            'mt-6 rounded-lg border [&>table>thead>tr>th]:whitespace-nowrap [&>table>thead]:hidden [&>table>tbody>tr]:border-t first:[&>table>tbody>tr]:border-t-0 bg-gray-50',
        }}
      />
    </WidgetCard>
  );
}
