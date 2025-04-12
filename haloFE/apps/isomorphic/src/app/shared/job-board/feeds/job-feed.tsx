'use client';

import Image from 'next/image';
import { useState } from 'react';
import JobBadge from './job-badge';
import cn from '@core/utils/class-names';
import SingleJob from './single-job-page';
import JobFeedRating from './job-feed-rating';
import Breadcrumb from '@core/ui/breadcrumb';
import { Button, Text, Title } from 'rizzui';
import { JobFeedFilterDrawer } from './job-feed-filter';
import { type JobType, jobFeedData } from '@/data/job-feed-data';
import {
  PiMapPin,
  PiSealCheckFill,
  PiBookmarkSimpleFill,
  PiBookmarkSimpleThin,
} from 'react-icons/pi';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';

let countPerPage = 4;

export default function JobFeed({ className }: { className?: string }) {
  const [isLoading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(countPerPage);
  let isLoadMore = nextPage < jobFeedData?.length;

  function handleLoadMore() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNextPage(nextPage + countPerPage);
    }, 600);
  }

  return (
    <div className={cn(className)}>
      <JobFeedFilterDrawer />

      {jobFeedData.slice(0, nextPage).map((job, index) => {
        return <JobFeedCard key={index} data={job} />;
      })}

      {isLoadMore && (
        <div className="mb-4 flex justify-center">
          <Button
            variant="solid"
            isLoading={isLoading}
            onClick={() => handleLoadMore()}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

function JobFeedCard({ data }: { data: JobType }) {
  const { openDrawer } = useDrawer();
  const [isBookMark, setIsBookMark] = useState(false);

  return (
    <>
      <div
        className="mb-6 flex w-full cursor-pointer flex-col gap-y-4 rounded-[10px] border border-muted p-4 @lg:gap-y-6 sm:p-[30px]"
        onClick={() =>
          openDrawer({
            view: <SingleJob data={data} />,
            placement: 'right',
            containerClassName: 'max-w-full xl:max-w-[60%] dark:bg-gray-50',
          })
        }
      >
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex flex-col items-start gap-4 @xl:flex-row">
            <Image
              src={data.logo}
              alt="job feed image"
              width={56}
              height={56}
              className="size-12 @6xl:size-14"
            />
            <div className="space-y-1">
              <Title as="h3" className="text-base font-medium @xl:text-lg">
                {data.jobTitle}
              </Title>
              <Breadcrumb
                separator=""
                separatorVariant="circle"
                className="flex-wrap gap-y-1 [&>a]:text-xs [&>a]:!text-gray-500 @7xl:[&>a]:text-sm"
              >
                {data.breadcrumb.map((item) => (
                  <Breadcrumb.Item key={item.name}>
                    {item.name} {item.value}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className={cn('h-10', isBookMark && 'bg-primary/10 text-primary')}
            onClick={(e) => {
              e.stopPropagation();
              setIsBookMark(!isBookMark);
            }}
            aria-label="Bookmark this job"
          >
            {!isBookMark ? (
              <PiBookmarkSimpleThin className="size-4 @7xl:size-5" />
            ) : (
              <PiBookmarkSimpleFill className="size-4 @7xl:size-5" />
            )}
          </Button>
        </div>

        <Text className="text-sm font-normal leading-normal @xl:leading-relaxed">
          {data.jobDescription[0].desc}
        </Text>
        <JobBadge skills={data.skills} />

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 @lg:gap-x-8">
          <div className="flex gap-x-1.5">
            <PiSealCheckFill size={20} className="text-primary" />
            <Text className="text-sm font-medium">Payment Verified</Text>
          </div>
          <JobFeedRating rating={[data.rating]} />
          <div className="flex gap-x-1.5">
            <PiMapPin size={20} />
            <Text className="text-sm font-medium">{data.location}</Text>
          </div>
        </div>
      </div>
    </>
  );
}
