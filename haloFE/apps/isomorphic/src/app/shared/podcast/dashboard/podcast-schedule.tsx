'use client';

import { podcastScheduleData } from '@/data/podcasts-data';
import WidgetCard from '@core/components/cards/widget-card';
import { DatePicker } from '@core/ui/datepicker';
import { formatDate } from '@core/utils/format-date';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PiPlusBold, PiVideoCameraFill, PiX, PiXBold } from 'react-icons/pi';
import { ActionIcon } from 'rizzui/action-icon';
import { Box } from 'rizzui/box';
import { Button } from 'rizzui/button';
import { Flex } from 'rizzui/flex';
import { Grid } from 'rizzui/grid';
import { Input } from 'rizzui/input';
import { Modal } from '@core/modal-views/modal';
import { Textarea } from 'rizzui/textarea';
import { Text, Title } from 'rizzui/typography';
import cn from '@core/utils/class-names';

type PodcastScheduleType = (typeof podcastScheduleData)[0];

export default function PodcastSchedule({ className }: { className?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <WidgetCard
        title="Today's Podcast"
        headerClassName="mb-6"
        className={cn('@container', className)}
        action={
          <Link
            href={'/'}
            className="text-sm font-medium text-gray-900 hover:underline"
          >
            See All
          </Link>
        }
      >
        <Grid gap="5" className="grid-cols-2">
          <button
            className="group flex h-full flex-col items-center justify-center gap-6 rounded-lg border p-4 transition hover:border-primary"
            onClick={() => setIsModalOpen(true)}
          >
            <Box className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-900 transition group-hover:!bg-primary group-hover:text-white dark:bg-gray-200">
              <PiPlusBold className="size-4" />
            </Box>
            <Title as="h6" className="font-inter font-semibold">
              Schedule Podcast
            </Title>
          </button>
          {podcastScheduleData.map((schedule) => (
            <ScheduleItem key={schedule.id} data={schedule} />
          ))}
        </Grid>
      </WidgetCard>
      <Modal
        size="md"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <CreatePodcastForm closeModal={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}

function ScheduleItem({ data }: { data: PodcastScheduleType }) {
  const { date, name } = data;
  return (
    <button className="group rounded-lg border border-gray-50 bg-gray-50 p-4 text-left transition hover:border-primary dark:bg-gray-100">
      <Flex>
        <Flex direction="col" gap="1">
          <Text className="text-sm uppercase">
            {formatDate(new Date(date), 'A')}
          </Text>
          <Text className="font-inter text-base font-semibold uppercase text-gray-900 @xs:text-xl">
            {formatDate(new Date(date), 'hh:mm')}
          </Text>
        </Flex>
        <Box className="inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-900 transition group-hover:!bg-primary group-hover:text-white dark:bg-gray-200">
          <PiVideoCameraFill className="size-4" />
        </Box>
      </Flex>
      <Text className="mt-2 line-clamp-2 text-sm">{name}</Text>
    </button>
  );
}

function CreatePodcastForm({ closeModal }: { closeModal: () => void }) {
  const { register, control, handleSubmit } = useForm();

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="px-7 pb-8 pt-6">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h3" className="font-inter font-semibold">
          Schedule Podcast
        </Title>
        <ActionIcon size="sm" variant="text" onClick={closeModal}>
          <PiXBold className="size-6" />
        </ActionIcon>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid className="grid-cols-5 gap-x-5 gap-y-6 [&_label>span]:font-medium">
          <Input
            label="Title"
            inputClassName="border-2"
            placeholder="Enter podcast title..."
            className="col-span-full w-full"
            {...register('title')}
          />
          <Controller
            control={control}
            name="startDate"
            render={({ field: { value, onChange } }) => (
              <DatePicker
                selected={value}
                onChange={onChange}
                dateFormat="d MMMM yyyy"
                placeholderText="Select Date"
                inputProps={{
                  label: 'Start Date',
                  inputClassName: 'border-2',
                }}
                className="col-span-full sm:col-span-3"
              />
            )}
          />
          <Controller
            control={control}
            name="startTime"
            render={({ field: { value, onChange } }) => (
              <DatePicker
                selected={value}
                onChange={onChange}
                dateFormat="h:mm aa"
                showTimeSelect
                showTimeSelectOnly
                placeholderText="Select Time"
                inputProps={{
                  label: 'Start Time',
                  inputClassName: 'border-2',
                }}
                className="col-span-full sm:col-span-2"
              />
            )}
          />
          <Input
            label="Host"
            inputClassName="border-2"
            className="col-span-full w-full"
            placeholder="Enter host name"
            {...register('host')}
          />
          <Textarea
            label="Description"
            textareaClassName="border-2"
            className="col-span-full w-full"
            placeholder="Enter description"
            {...register('description')}
          />
          {/* onClick={closeModal} */}
          <Button type="submit" className="col-span-full mt-2">
            Schedule
          </Button>
        </Grid>
      </form>
    </div>
  );
}
