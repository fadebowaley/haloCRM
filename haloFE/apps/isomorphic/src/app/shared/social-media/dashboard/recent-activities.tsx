'use client';

import { recentActivitiesData } from '@/data/social-media-dashboard-data';
import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';
import { Badge, Button, Text } from 'rizzui';

export default function RecentActivities({
  className,
}: {
  className?: string;
}) {
  return (
    <WidgetCard
      title="Recent Activities"
      headerClassName="items-center"
      action={
        <Button variant="text" className="p-0 underline">
          View All
        </Button>
      }
      className={cn('relative', className)}
    >
      <div className="custom-scrollbar overflow-y-auto scroll-smooth mt-2 max-h-[400px] @4xl:max-h-[500px] @7xl:max-h-[550px]">
        {recentActivitiesData.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-start gap-2 border-b border-muted py-4 last:border-b-0"
            >
              <Badge variant="outline" className="size-7 border-muted">
                <Badge renderAsDot size="sm" className="bg-gray-500" />
              </Badge>

              <div className="grow space-y-2">
                <Text>
                  <strong className="cursor-pointer pe-1 hover:underline">
                    {item.user}
                  </strong>
                  {item.action}
                </Text>

                <Text className="flex items-center justify-between">
                  <span className="text-gray-500">{item.time}</span>
                  <span className="flex items-center gap-1">
                    <Icon className="size-4 shrink-0" /> {item.platform}
                  </span>
                </Text>
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute inset-x-0 bottom-3 z-10 h-20 bg-gradient-to-t from-white to-transparent dark:from-gray-50" />
    </WidgetCard>
  );
}
