'use client';

import { Text } from 'rizzui';
import { useState } from 'react';
import cn from '@core/utils/class-names';
import WidgetCard from '@core/components/cards/widget-card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import {
  FLOW_ON_DEVICES_COLORS,
  flowOnDevicesStatisticsData,
} from '@/data/social-media-dashboard-data';

export default function FlowOnDevices({ className }: { className?: string }) {
  const [chartData] = useState(flowOnDevicesStatisticsData);

  return (
    <WidgetCard
      title="Flow on Device"
      className={cn('@container/fd', className)}
    >
      <div className="mt-8 flex flex-col items-center justify-center gap-8 @sm/fd:mt-12 @sm/fd:flex-row @lg/fd:gap-12">
        <div className="relative h-[100px] w-[120px]">
          <div className="absolute start-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-[23px] border-gray-100 dark:border-muted" />
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cornerRadius={10}
                innerRadius={40}
                outerRadius={50}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {flowOnDevicesStatisticsData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      FLOW_ON_DEVICES_COLORS[
                        index % FLOW_ON_DEVICES_COLORS.length
                      ]
                    }
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

function CustomLegend() {
  return (
    <div className="flex items-center justify-center gap-10">
      {flowOnDevicesStatisticsData.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.name}>
            <Icon className="size-8" fill={item.color} />
            <Text className="mb-0.5 mt-2">{item.name}</Text>
            <Text
              className="font-inter text-[22px] font-bold leading-none"
              style={{
                color: item.color,
              }}
            >
              {item.value}%
            </Text>
          </div>
        );
      })}
    </div>
  );
}
