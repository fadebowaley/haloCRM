'use client';

import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import { Progressbar, Text, Title } from 'rizzui';
import { PiArrowRight, PiArrowLeft } from 'react-icons/pi';
import { projectTaskData } from '@/data/project-dashboard';
import { LooseValue } from 'node_modules/react-calendar/dist/esm/shared/types';
import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';

const day = dayjs();

const dates = [
  day.add(1, 'day').toDate(),
  day.add(3, 'day').toDate(),
  day.add(4, 'day').toDate(),
  day.add(6, 'day').toDate(),
  day.add(8, 'day').toDate(),
  day.add(10, 'day').toDate(),
  day.subtract(1, 'day').toDate(),
  day.subtract(2, 'day').toDate(),
  day.subtract(4, 'day').toDate(),
  day.subtract(10, 'day').toDate(),
  day.subtract(12, 'day').toDate(),
];

export default function ProjectTaskList({ className }: { className?: string }) {
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      if (date.getDay() === 0 || date.getDay() === 6) {
        return null;
      }
      if (dates.find((d) => d.toDateString() === date.toDateString())) {
        return <span className="absolute inset-x-0 bottom-0 h-1 bg-primary" />;
      }
    }
    return null;
  };

  return (
    <WidgetCard
      title="Task List"
      className={cn('@container dark:bg-gray-100/50', className)}
    >
      <Calendar
        prev2Label={false}
        next2Label={false}
        selectRange={false}
        tileContent={tileContent}
        value={dates as LooseValue}
        className="job-schedule-calendar task-list-calendar"
        minDate={day.subtract(1, 'year').toDate()}
        onClickDay={(value) => console.log({ value })}
        prevLabel={<PiArrowLeft className="size-4" />}
        nextLabel={<PiArrowRight className="size-4" />}
      />

      <div className="mt-6 flex flex-col @xl:mt-7 @[90rem]:grow">
        <div className="@[90rem]:grow">
          <div>
            <Title as="h3" className="font-inter text-base font-semibold">
              Creating Isomorphic Project Dashboard
            </Title>
            <Text>UI /UX Designer</Text>

            <div className="my-6 space-y-3 border-b border-muted pb-6">
              <div className="flex items-center justify-between gap-4">
                <Text className="font-semibold">Progress</Text>
                <Text className="font-semibold">80%</Text>
              </div>
              <Progressbar value={80} />
            </div>
          </div>
          <Title
            as="h3"
            className="mb-6 font-inter text-base font-semibold text-gray-800"
          >
            Task Details
          </Title>
          <div className="space-y-3">
            {projectTaskData.map((item, index) => (
              <ScheduledRow
                key={index}
                title={item.title}
                serialNo={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}

function ScheduledRow({
  serialNo,
  title,
}: {
  serialNo: number;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <Text className="rounded-md bg-gray-100 p-2 px-3.5">{serialNo}</Text>
      <Text as="span" className="block font-medium">
        {title}
      </Text>
    </div>
  );
}
