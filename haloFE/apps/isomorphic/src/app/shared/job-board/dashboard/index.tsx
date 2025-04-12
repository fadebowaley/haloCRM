import { Box } from 'rizzui/box';
import ActiveUsers from './active-users';
import AllJobsTable from './alljobs-table';
import DeviceAnalytics from './device-analytics';
import JobOverview from './job-overview';
import JobStats from './job-stats';
import OpenJobOverview from './open-job-status';
import JobScheduleList from './schedule-list';
import TopReferrers from './top-referrers';

export default function JobDashboard() {
  return (
    <Box className="@container/jd">
      <JobStats className="mb-6 3xl:mb-8" />
      <Box className="space-y-6 @3xl/jd:grid @3xl/jd:grid-cols-12 @3xl/jd:gap-6 @3xl/jd:space-y-0 3xl:gap-8">
        <Box className="space-y-6 @3xl/jd:col-span-full @3xl/jd:grid @3xl/jd:grid-cols-2 @3xl/jd:gap-6 @3xl/jd:space-y-0 @5xl/jd:col-span-8 3xl:gap-8">
          <JobOverview className="@3xl/jd:col-span-full" />
          <DeviceAnalytics className="@3xl/jd:col-span-1" />
          <TopReferrers className="@3xl/jd:col-span-1" />
        </Box>
        <JobScheduleList className="@3xl/jd:col-span-full @5xl/jd:col-span-4" />
        <AllJobsTable className="@3xl/jd:col-span-full" />
        <OpenJobOverview className="@3xl/jd:col-span-full @5xl/jd:col-span-6" />
        <ActiveUsers className="@3xl/jd:col-span-full @5xl/jd:col-span-6" />
      </Box>
    </Box>
  );
}
