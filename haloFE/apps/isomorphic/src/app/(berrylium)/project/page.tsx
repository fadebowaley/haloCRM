import ProjectDashboard from '@/app/shared/project-dashboard';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Project Management Dashboard'),
};

export default function ProjectDashboardPage() {
  return <ProjectDashboard />;
}
