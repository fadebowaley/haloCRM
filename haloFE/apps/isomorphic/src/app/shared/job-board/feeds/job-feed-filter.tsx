'use client';

import cn from '@core/utils/class-names';
import { Button, Title } from 'rizzui';
import { PiFunnel } from 'react-icons/pi';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { useFilterControls } from '@core/hooks/use-filter-control';
import FilterWithSearch from '@core/components/filter-with-search';
import JobFeedSalaryRangeCard from './job-feed-salary-range-card';
import {
  initialState,
  jobFeedJobPositions,
  jobFeedJobSpecialties,
  jobFeedJobTypes,
} from '@/data/job-feed-data';

export function JobFeedFilterDrawer() {
  const { openDrawer } = useDrawer();

  return (
    <div className="mb-4 flex justify-end @4xl:hidden">
      <Button
        variant="outline"
        className="flex gap-x-2"
        onClick={() =>
          openDrawer({
            view: <JobFeedFilters />,
            placement: 'right',
          })
        }
      >
        <PiFunnel className="size-5" /> Filter
      </Button>
    </div>
  );
}

export function JobFilters({ className }: { className?: string }) {
  const { state, applyFilter, clearFilter } = useFilterControls(initialState);

  return (
    <div className={cn('space-y-6', className)}>
      <JobFeedSalaryRangeCard
        title="Salary Range"
        min={0}
        max={1000}
        initialMin={200}
        initialMax={600}
      />
      <div className="rounded-[10px] border border-muted p-3 sm:p-5">
        <FilterWithSearch
          title="Job Type"
          name="jobType"
          state={state}
          data={jobFeedJobTypes}
          applyFilter={applyFilter}
          clearFilter={clearFilter}
        />
      </div>
      <div className="rounded-[10px] border border-muted p-3 sm:p-5">
        <FilterWithSearch
          title="Position"
          name="position"
          data={jobFeedJobPositions}
          state={state}
          applyFilter={applyFilter}
          clearFilter={clearFilter}
        />
      </div>
      <div className="rounded-[10px] border border-muted p-3 sm:p-5">
        <FilterWithSearch
          title="Specialties"
          name="specialties"
          data={jobFeedJobSpecialties}
          state={state}
          applyFilter={applyFilter}
          clearFilter={clearFilter}
        />
      </div>
    </div>
  );
}

function JobFeedFilters() {
  const { closeDrawer } = useDrawer();

  return (
    <div className="h-full overflow-y-scroll">
      <Title className="sticky top-0 z-10 border-b border-muted bg-white px-5 py-3 text-center text-lg font-medium">
        Filter Jobs
      </Title>
      <JobFilters className="my-4 px-5" />
      <div className="sticky bottom-0 z-10 flex items-center justify-center border-t border-muted bg-white px-5 py-3">
        <Button onClick={() => closeDrawer()} className="w-full">
          Show Results
        </Button>
      </div>
    </div>
  );
}
