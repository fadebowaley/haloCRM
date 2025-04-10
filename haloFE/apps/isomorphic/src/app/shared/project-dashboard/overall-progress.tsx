'use client';

import { useState } from 'react';
import { Box, Text } from 'rizzui';
import cn from '@core/utils/class-names';
import WidgetCard from '@core/components/cards/widget-card';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DropdownAction from '@core/components/charts/dropdown-action';
import {
  overAllProgressData,
  overAllProgressViewOptions,
} from '@/data/project-dashboard';

export default function OverallProgress({ className }: { className?: string }) {
  const [state, setState] = useState('');

  return (
    <WidgetCard
      title="Overall Progress"
      headerClassName="items-center"
      className={cn('@container dark:bg-gray-100/50', className)}
      action={
        <DropdownAction
          className="rounded-md border"
          options={overAllProgressViewOptions}
          onChange={setState}
          dropdownClassName="!z-0"
        />
      }
    >
      <Box className="relative h-60 w-full translate-y-6 @sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart
            margin={{
              top: 40,
              right: 10,
            }}
            className="relative focus:[&_.recharts-sector]:outline-none"
          >
            <Pie
              label
              data={overAllProgressData}
              endAngle={-10}
              stroke="none"
              startAngle={190}
              paddingAngle={1}
              cornerRadius={12}
              dataKey="percentage"
              innerRadius={'85%'}
              outerRadius={'100%'}
            >
              {overAllProgressData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <Box className="absolute bottom-20 start-1/2 -translate-x-1/2 text-center @sm:bottom-28">
          <Text className="text-2xl font-bold text-gray-800 @lg:text-4xl">
            72%
          </Text>
          <Text className="font-medium">Completed</Text>
        </Box>
      </Box>

      <Box className="grid grid-cols-2 gap-8 text-center @sm:flex @sm:flex-wrap @sm:justify-center @sm:text-start">
        {overAllProgressData.map((item) => (
          <Box key={item.name}>
            <Text
              className="block text-xl font-bold @xl:text-2xl"
              style={{ color: item.color }}
            >
              {item.count}
            </Text>
            <Text className="whitespace-nowrap">{item.name}</Text>
          </Box>
        ))}
      </Box>
    </WidgetCard>
  );
}
