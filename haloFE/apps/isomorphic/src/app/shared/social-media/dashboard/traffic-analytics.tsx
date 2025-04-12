'use client';

import cn from '@core/utils/class-names';
import { Progressbar, Text } from 'rizzui';
import WidgetCard from '@core/components/cards/widget-card';
import { trafficAnalyticsData } from '@/data/social-media-dashboard-data';

export default function TrafficAnalytics({
  className,
}: {
  className?: string;
}) {
  const barColorClassName = ['bg-[#6993FF]', 'bg-[#E68C12]'];
  return (
    <WidgetCard title="Traffic Analytics" className={className}>
      {trafficAnalyticsData.map((item, idx) => (
        <div className="my-6 space-y-2" key={idx}>
          <Text className="font-medium">{item.title}</Text>
          <Progressbar
            size="xl"
            value={item.value}
            label={item.label}
            labelClassName="text-xs"
            barClassName={cn(
              "relative after:content-[''] after:size-2 after:rounded-full after:bg-white after:absolute after:top-1/2 after:-translate-y-1/2 after:end-1",
              barColorClassName[idx]
            )}
            className="rounded-full bg-muted p-1 pe-2"
          />
        </div>
      ))}
    </WidgetCard>
  );
}
