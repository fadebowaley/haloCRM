'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@core/utils/class-names';
import dayjs from 'dayjs';
import { LooseValue } from 'node_modules/react-calendar/dist/esm/shared/types';
import Calendar from 'react-calendar';
import {
  PiArrowLeft,
  PiArrowRight,
  PiClock,
  PiDotsThreeVerticalBold,
  PiPlusBold,
} from 'react-icons/pi';
import { ActionIcon, Box, Button, Flex, Title } from 'rizzui';
import ScheduleModal from './schedule-modal';
import JobUpgradeStorage from './upgrade-storage';

interface ScheduledRowProps {
  data?: {
    title?: string;
    time?: string;
    day?: string;
    date?: string;
  };
}

const scheduledData = [
  {
    title: 'Interview with Mark',
    time: '9:00 AM - 11:30 AM',
    day: 'fri',
    date: '15',
  },
  {
    title: 'Interview with Ashley',
    time: '9:00 AM - 11:30 AM',
    day: 'Mon',
    date: '25',
  },
  {
    title: 'Interview with Brown',
    time: '9:00 AM - 11:30 AM',
    day: 'Tue',
    date: '26',
  },
  {
    title: 'Interview with Helen',
    time: '9:00 AM - 11:30 AM',
    day: 'Wed',
    date: '13',
  },
  {
    title: 'Interview with Bush',
    time: '9:00 AM - 11:30 AM',
    day: 'Wed',
    date: '12',
  },
  {
    title: 'Interview with Uno',
    time: '9:00 AM - 11:30 AM',
    day: 'Wed',
    date: '11',
  },
];

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

export default function JobScheduleList({ className }: { className?: string }) {
  const { openModal } = useModal();

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      if (date.getDay() === 0 || date.getDay() === 6) {
        return null;
      }
      if (dates.find((d) => d.toDateString() === date.toDateString())) {
        return (
          <span className="absolute bottom-2 start-1/2 h-1 w-6 -translate-x-1/2 rounded-md bg-primary rtl:translate-x-1/2" />
        );
      }
    }
    return null;
  };

  return (
    <Box className={cn('@container', className)}>
      <Box className="h-full rounded-lg border border-muted @4xl:grid @4xl:grid-cols-2">
        <Box className="border-r border-muted pt-5">
          <Title
            as="h3"
            className="px-5 pb-4 font-inter text-base font-semibold text-gray-800 sm:text-lg lg:px-7"
          >
            Schedule Calendar
          </Title>
          <Calendar
            prev2Label={false}
            next2Label={false}
            selectRange={false}
            tileContent={tileContent}
            value={dates as LooseValue}
            className="job-schedule-calendar"
            minDate={day.subtract(1, 'year').toDate()}
            nextLabel={<PiArrowRight className="size-4" />}
            prevLabel={<PiArrowLeft className="size-4" />}
          />
        </Box>

        <Box className="p-5">
          <Flex justify="between" align="center">
            <Title
              as="h3"
              className="font-inter text-base font-semibold text-gray-800 sm:text-lg"
            >
              Schedule list
            </Title>

            <Button
              variant="text"
              color="primary"
              className="h-auto gap-1 p-0 font-bold text-primary"
              onClick={() =>
                openModal({
                  view: <ScheduleModal />,
                  customSize: 700,
                })
              }
            >
              <PiPlusBold className="size-3.5" />
              Add New
            </Button>
          </Flex>
          <Box className="relative">
            <div className="custom-scrollbar -mx-0.5 my-5 -me-2 h-72 overflow-y-auto scroll-smooth pe-2 @4xl:h-52">
              <Box className="space-y-5 p-0.5 pb-8">
                {scheduledData.map((item) => (
                  <ScheduledRow key={item.date} data={item} />
                ))}
              </Box>
            </div>
            <Box className="absolute -end-0 -start-1 bottom-0 h-6 w-[101%] bg-gradient-to-t from-gray-0 via-gray-50 to-transparent dark:from-gray-50 dark:via-gray-50" />
          </Box>
          <JobUpgradeStorage />
        </Box>
      </Box>
    </Box>
  );
}

function ScheduledRow({ data }: ScheduledRowProps) {
  return (
    <Flex align="center">
      <div className="w-14 shrink-0 space-y-0.5 rounded-xl px-3 py-2.5 text-center text-sm shadow dark:shadow-gray-300">
        <span className="block font-medium uppercase text-red-dark">
          {data?.day}
        </span>
        <span className="block font-semibold leading-none text-gray-900">
          {data?.date}
        </span>
      </div>
      <div className="text-xs @md:text-sm">
        <span className="line-clamp-1 block font-semibold text-gray-900 dark:text-gray-700">
          {data?.title}
        </span>
        <span className="mt-0.5 flex items-center gap-1">
          <PiClock className="size-5" />
          {data?.time}
        </span>
      </div>
      <ActionIcon className="ms-auto" size="sm" variant="outline" rounded="lg">
        <PiDotsThreeVerticalBold className="size-4" />
      </ActionIcon>
    </Flex>
  );
}
