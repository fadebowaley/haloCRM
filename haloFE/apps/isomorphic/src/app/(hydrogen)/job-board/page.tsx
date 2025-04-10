import JobDashboard from '@/app/shared/job-board/dashboard';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Job Board'),
};

export default function JobBoardPage() {
  return <JobDashboard />;
}
