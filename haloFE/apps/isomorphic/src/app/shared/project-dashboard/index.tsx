import { Box } from 'rizzui/box';
import ProjectActiveTasks from './active-tasks';
import ProjectActivities from './activities';
import ProjectClientList from './client-list';
import OverallProgress from './overall-progress';
import ProjectStatistics from './project-statistics';
import ProjectStats from './project-stats';
import ProjectSummary from './project-summary';
import RecentActivities from './recent-activities';
import ProjectTaskList from './task-list';

export default function ProjectDashboard() {
  return (
    <Box className="@container/pd">
      <ProjectStats className="mb-6 3xl:mb-8" />
      <Box className="grid grid-flow-row grid-cols-1 gap-6 @3xl/pd:grid-cols-12 3xl:gap-8">
        <ProjectStatistics className="@3xl/pd:col-span-full @7xl/pd:col-span-8" />
        <OverallProgress className="@3xl/pd:col-span-6 @7xl/pd:col-span-4" />
        <ProjectActivities className="@3xl/pd:col-span-6 @7xl/pd:col-span-4" />
        <ProjectClientList className="@3xl/pd:col-span-full @7xl/pd:col-span-4" />
        <ProjectActiveTasks className="@3xl/pd:col-span-full @7xl/pd:col-span-8" />
        <ProjectSummary className="@3xl/pd:col-span-full @7xl/pd:col-span-8" />
        <ProjectTaskList className="@3xl/pd:col-span-6 @7xl/pd:col-span-4 @7xl/pd:col-start-9 @7xl/pd:col-end-13 @7xl/pd:row-start-2 @7xl/pd:row-end-4" />
        <RecentActivities className="@3xl/pd:col-span-6 @7xl/pd:col-span-4" />
      </Box>
    </Box>
  );
}
