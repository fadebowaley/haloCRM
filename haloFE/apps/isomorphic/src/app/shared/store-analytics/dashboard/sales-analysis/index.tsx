'use client';

import WidgetCard from '@core/components/cards/widget-card';
import DropdownAction from '@core/components/charts/dropdown-action';

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('./chart'), {
  ssr: false,
});

import cn from '@core/utils/class-names';
import { Box, Text } from 'rizzui';

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

export default function SalesAnalysis({ className }: { className?: string }) {
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }
  return (
    <WidgetCard
      title="Sales Analysis"
      description="Revealing risk and growth in investments."
      rounded="lg"
      descriptionClassName="text-gray-500 mt-0.5 leading-relaxed hidden sm:inline-block"
      className={cn('dark:bg-gray-100/50', className)}
      headerClassName="flex items-center sm:items-start"
      action={
        <DropdownAction
          className="rounded-md border"
          options={viewOptions}
          onChange={handleChange}
        />
      }
    >
      <Box className="custom-scrollbar overflow-x-auto">
        <Box className="min-w-[900px] @container/sa-sales-analysis">
          <Box className="mb-2 mt-8 grid grid-cols-11 ps-10">
            <Box className="col-span-2">
              <Text>Impression</Text>
              <Text className="mt-1 text-lg font-bold text-gray-700">
                2,620,120
              </Text>
            </Box>
            <Box className="col-span-2">
              <Text>Product View</Text>
              <Text className="mt-1 text-lg font-bold text-gray-700">
                180,410
              </Text>
            </Box>
            <Box className="col-span-2">
              <Text>Initiate Customers</Text>
              <Text className="mt-1 text-lg font-bold text-gray-700">861 </Text>
            </Box>
            <Box className="col-span-2">
              <Text>Total Products</Text>
              <Text className="mt-1 text-lg font-bold text-gray-700">
                10,245{' '}
              </Text>
            </Box>
            <Box className="col-span-2">
              <Text>Marketing Sales</Text>
              <Text className="mt-1 text-lg font-bold text-gray-700">
                12,245
              </Text>
            </Box>
            <Box className="">
              <Text>Purchased</Text>
              <Text className="mt-1 text-lg font-bold text-gray-700">246</Text>
            </Box>
          </Box>

          <Box className="h-[360px] w-full">
            <Chart />
          </Box>
        </Box>
      </Box>
    </WidgetCard>
  );
}
