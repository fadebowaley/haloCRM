'use client';

import { projectRecentActivitiesData } from '@/data/project-dashboard';
import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';
import { Box, Flex, Tab, Text } from 'rizzui';

export default function RecentActivities({
  className,
}: {
  className?: string;
}) {
  return (
    <WidgetCard
      title="Recent Activities"
      className={cn('@container dark:bg-gray-100/50', className)}
    >
      <Tab className="mt-4">
        <Tab.List className="grid w-full grid-cols-2 gap-0">
          <Tab.ListItem className="justify-center py-4">Activity</Tab.ListItem>
          <Tab.ListItem className="justify-center py-4">Update</Tab.ListItem>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="custom-scrollbar overflow-y-auto scroll-smooth h-[505px] @3xl/pd:h-[700px] @7xl/pd:h-[380px]">
              <ActivityCard />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="custom-scrollbar overflow-y-auto scroll-smooth h-[505px] @3xl/pd:h-[700px] @7xl/pd:h-[380px]">
              <ActivityCard />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab>
    </WidgetCard>
  );
}

function ActivityCard() {
  return (
    <Box className="space-y-2 p-0.5">
      {projectRecentActivitiesData.map((activity) => (
        <Box
          key={activity.id}
          className="group cursor-pointer space-y-1 rounded-lg bg-gray-50 p-4 transition-shadow hover:shadow dark:bg-gray-100"
        >
          <Flex align="center" justify="between" className="gap-0">
            <Text className="font-semibold group-hover:underline">
              {activity.title}
            </Text>
            <Text className="text-gray-400">{activity.date}</Text>
          </Flex>
          <Text className="text-gray-400">{activity.activity}</Text>
        </Box>
      ))}
    </Box>
  );
}
