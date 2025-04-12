'use client';

import {
  scheduledPostData,
  SchedulePostType,
} from '@/data/social-media-dashboard-data';
import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';
import { PiCalendarBlankDuotone, PiClockDuotone } from 'react-icons/pi';
import { Badge, Tab, Text } from 'rizzui';
import { GetSocialOption } from './utils';

const tabList = ['All Post', 'Facebook', 'Instagram', 'LinkedIn'];

export default function ScheduledPost({ className }: { className?: string }) {
  return (
    <WidgetCard title="Scheduled Post" className={cn('relative', className)}>
      <Tab className="mt-4">
        <Tab.List>
          {tabList.map((tab) => (
            <Tab.ListItem key={tab} className="justify-center py-2">
              {tab}
            </Tab.ListItem>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ActivityCard posts={scheduledPostData} />
          </Tab.Panel>
          <Tab.Panel>
            <ActivityCard
              posts={scheduledPostData.filter(
                (i) => i.platform.toLowerCase() === 'facebook'
              )}
            />
          </Tab.Panel>
          <Tab.Panel>
            <ActivityCard
              posts={scheduledPostData.filter(
                (i) => i.platform.toLowerCase() === 'instagram'
              )}
            />
          </Tab.Panel>
          <Tab.Panel>
            <ActivityCard
              posts={scheduledPostData.filter(
                (i) => i.platform.toLowerCase() === 'linkedin'
              )}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab>
      <div className="absolute inset-x-0 bottom-3 z-10 h-20 bg-gradient-to-t from-white to-transparent dark:from-gray-50" />
    </WidgetCard>
  );
}

function ActivityCard({ posts }: { posts: SchedulePostType[] }) {
  return (
    <div className="custom-scrollbar overflow-y-auto scroll-smooth max-h-[465px] @7xl:max-h-[500px]">
      {posts?.map((p, idx) => (
        <div key={idx} className="space-y-3 border-b border-muted py-4">
          <GetSocialOption platform={p.platform} />
          <Text>{p.title}</Text>
          <div className="flex items-center justify-between">
            <Badge rounded="md" variant="flat" color="info">
              Schedule
            </Badge>

            <Text className="flex items-center gap-1 rounded-md border border-muted px-2 py-1">
              <PiCalendarBlankDuotone className="size-4" />
              {p.date}
              <PiClockDuotone className="size-4" />
              {p.time}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}
