'use client';

import { Text } from 'rizzui';
import cn from '@core/utils/class-names';
import WidgetCard from '@core/components/cards/widget-card';
import DropdownAction from '@core/components/charts/dropdown-action';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import {
  GENDER_COLORS,
  genderViewOptions,
  genderStatisticsData,
} from '@/data/social-media-dashboard-data';

export default function GenderStatistics({
  className,
}: {
  className?: string;
}) {
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      title="Statistic By Gender"
      headerClassName="items-center"
      className={cn('@container/gs', className)}
      action={
        <DropdownAction
          className="rounded-lg border"
          options={genderViewOptions}
          onChange={handleChange}
        />
      }
    >
      <div className="h-full items-center @sm/gs:flex @sm:gap-8">
        <div className="relative mt-8 h-[200px] w-full @sm:my-4 @sm:h-[230px] @sm:w-3/5 @sm:py-3 4xl:my-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart className="w-20 [&_.recharts-layer:focus]:outline-none [&_.recharts-sector:focus]:outline-none dark:[&_.recharts-text.recharts-label]:first-of-type:fill-white">
              <Pie
                data={genderStatisticsData}
                cornerRadius={8}
                innerRadius={55}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {genderStatisticsData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={GENDER_COLORS[index % GENDER_COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <CustomLegend />
      </div>
    </WidgetCard>
  );
}

function CustomLegend({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-wrap justify-center gap-5 pt-5 @sm:flex-col @sm:items-center @sm:gap-7 @sm:pt-0 @md:justify-start',
        className
      )}
    >
      {genderStatisticsData.map((item) => (
        <div
          key={item.name}
          className="flex w-2/5 flex-col items-center text-gray-500 @sm:items-start"
        >
          <div className="relative">
            <span
              className="absolute start-0 top-1/2 size-3 -translate-x-6 -translate-y-1/2 rounded rtl:translate-x-6"
              style={{ backgroundColor: item?.color }}
            />
            <Text className="mb-0.5 block text-xs 3xl:text-sm">
              {item.name}
            </Text>
            <Text className="font-inter text-lg font-semibold leading-none text-gray-900">
              {item.value}+
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}
