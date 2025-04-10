'use client';

import Image from 'next/image';
import { useState } from 'react';
import JobBadge from './job-badge';
import toast from 'react-hot-toast';
import cn from '@core/utils/class-names';
import { Badge, Button, Text, Title } from 'rizzui';
import { JobType, socialInfos } from '@/data/job-feed-data';
import { useCopyToClipboard } from '@core/hooks/use-copy-to-clipboard';
import {
  PiCaretLeftBold,
  PiLinkSimpleBold,
  PiBookmarkSimpleThin,
  PiBookmarkSimpleFill,
} from 'react-icons/pi';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';

export default function SingleJob({ data }: { data: JobType }) {
  const { closeDrawer } = useDrawer();
  let isCompany = data.type === 'company';
  let isContract = data.type == 'contract';
  const [isBookmark, setIsBookmark] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();

  function handleCopyToClipboard() {
    copyToClipboard('Copied');
    toast.success(<b>Copied</b>);
  }

  return (
    <div className="relative flex h-full flex-col overflow-y-scroll @container">
      <div
        className={cn(
          'grow px-5 py-6 @lg:px-10',
          isCompany && '@5xl:flex @5xl:items-start @5xl:gap-10'
        )}
      >
        <div className="space-y-6">
          <Button
            size="sm"
            variant="text"
            onClick={() => closeDrawer()}
            className="gap-x-2 p-0"
          >
            <PiCaretLeftBold className="size-4 rtl:rotate-180" />
            <Text className="text-sm font-normal">Back to jobs</Text>
          </Button>

          <Title as="h3" className="text-2xl font-medium leading-[30px]">
            {data.jobTitle}
          </Title>

          <div className="flex flex-wrap gap-4">
            {socialInfos.map((info) => {
              const Icon = info.icon;
              return (
                <a
                  key={info.title}
                  href={info.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Button
                    as="span"
                    className="gap-x-2 rounded-[10px]"
                    variant="outline"
                  >
                    {Icon && <Icon className="size-5" />} {info.title}
                  </Button>
                </a>
              );
            })}
            <Button
              variant="outline"
              className="gap-x-2 rounded-[10px]"
              onClick={() => handleCopyToClipboard()}
            >
              <PiLinkSimpleBold size={20} />
              Copy Link
            </Button>
          </div>

          <Text className="leading-relaxed">{data.jobDescription[0].desc}</Text>

          {data.jobDescription.map((job, index) => (
            <div key={index}>
              <Title as="h4" className="mb-2 text-base text-gray-700">
                {job.descTitle}
              </Title>
              <Text className="leading-relaxed">{job.desc}</Text>
            </div>
          ))}

          <Text>
            If you have any questions, email us at{' '}
            <a
              rel="noopener noreferrer"
              href={`mailto${data.support.email}`}
              className="font-medium underline underline-offset-2"
            >
              {data.support.email}
            </a>
          </Text>
          <Text>{data.support.desc}</Text>

          {isContract && (
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 border-y border-muted py-6 @sm:grid-cols-2 @2xl:grid-cols-3">
              {data.info.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-x-4">
                    {Icon && <Icon className="size-6" />}
                    <div>
                      <Text className="mb-1 text-xs">{item.title}</Text>
                      <Text
                        className={cn(
                          !item.badge && 'font-medium text-gray-900'
                        )}
                      >
                        {item.badge == true ? (
                          <span className="flex flex-wrap gap-2">
                            <Badge
                              size="sm"
                              variant="outline"
                              className="border border-[#269A54] text-[#15783C] dark:text-[#8fcea8]"
                            >
                              {item.value[0]}
                            </Badge>
                            <Badge
                              size="sm"
                              variant="outline"
                              className="border border-[#6476D6] text-[#3A447A] dark:text-[#c1c9f8]"
                            >
                              {item.value[1]}
                            </Badge>
                          </span>
                        ) : (
                          item.value
                        )}
                      </Text>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="space-y-3">
            <Title as="h4" className="text-base text-gray-700">
              Skills
            </Title>
            <JobBadge skills={data.skills} />
          </div>
        </div>

        {data.type === 'company' && (
          <div
            className={cn(
              'mt-6 rounded-xl border border-muted p-5 @container/com @lg:p-8',
              isCompany && '@5xl:w-full @5xl:max-w-sm @5xl:shrink-0'
            )}
          >
            <div className="mb-8 space-y-4 @[318px]/com:text-center">
              <Image
                src={data.logo}
                alt="logo"
                width={56}
                height={56}
                className="size-12 @[318px]/com:mx-auto"
              />
              <Title as="h4" className="text-lg font-medium">
                {data.companyName}
              </Title>
            </div>

            <div className="grid grid-cols-1 gap-x-4 gap-y-6 @[318px]/com:grid-cols-2 @[640px]/com:grid-cols-3">
              {data.info.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-x-4">
                    <div>{Icon && <Icon className="size-6" />}</div>
                    <div>
                      <Text className="mb-1 text-xs">{item.title}</Text>
                      <Text
                        className={cn(
                          !item.badge && 'font-medium text-gray-900'
                        )}
                      >
                        {item.badge == true ? (
                          <span className="flex flex-wrap gap-2">
                            <Badge
                              size="sm"
                              variant="outline"
                              className="border border-[#269A54] text-[#15783C] dark:text-[#8fcea8]"
                            >
                              {item.value[0]}
                            </Badge>
                            <Badge
                              size="sm"
                              variant="outline"
                              className="border border-[#6476D6] text-[#3A447A] dark:text-[#c1c9f8]"
                            >
                              {item.value[1]}
                            </Badge>
                          </span>
                        ) : (
                          item.value
                        )}
                      </Text>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* footer */}
      <div className="sticky bottom-0 flex gap-x-5 border-t border-muted bg-white px-4 py-4 @lg:px-10 dark:bg-gray-50">
        <Button>Apply Job</Button>
        <Button
          variant="outline"
          className={cn('gap-2', isBookmark && 'border-primary text-primary')}
          onClick={() => setIsBookmark(!isBookmark)}
        >
          {!isBookmark ? (
            <PiBookmarkSimpleThin size={18} />
          ) : (
            <PiBookmarkSimpleFill size={18} />
          )}
          Save Later
        </Button>
      </div>
    </div>
  );
}
