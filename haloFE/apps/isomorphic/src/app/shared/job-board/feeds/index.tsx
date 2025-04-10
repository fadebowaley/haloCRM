'use client';

import JobFeed from './job-feed';
import cn from '@core/utils/class-names';
import JobFeedHeader from './job-feed-header';
import { JobFilters } from './job-feed-filter';
import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';

export default function JobFeedTemplate() {
  let { layout } = useLayout();
  return (
    <div className="@container">
      <JobFeedHeader />
      <div
        className={cn(
          'grid grid-cols-12 gap-x-6',
          layout === LAYOUT_OPTIONS.LITHIUM && 'mx-auto max-w-[1400px]'
        )}
      >
        <JobFeed className="col-span-full @4xl:col-span-8 @6xl:col-span-9" />
        <div className="col-span-4 hidden @4xl:grid @6xl:col-span-3">
          <JobFilters />
        </div>
      </div>
    </div>
  );
}
