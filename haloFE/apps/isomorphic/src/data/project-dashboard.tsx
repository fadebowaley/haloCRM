import { createId } from '@paralleldrive/cuid2';
import SuitcaseIcon from '@core/components/icons/suit-case';
import CheckCircleIcon from '@core/components/icons/check-circle';
import HourGlassRoundIcon from '@core/components/icons/hour-glass-round';
import StackIcon from '@core/components/icons/stack';
import { IconType } from 'react-icons/lib';

export const projectStatData: StatType[] = [
  {
    title: 'Total Projects',
    amount: 89935,
    increased: true,
    percentage: '10.2',
    icon: SuitcaseIcon,
  },
  {
    title: 'Completed Projects',
    amount: 78478,
    increased: true,
    percentage: '10.2',
    icon: CheckCircleIcon,
  },
  {
    title: 'In Progress',
    amount: 20321,
    increased: false,
    percentage: '10.2',
    icon: HourGlassRoundIcon,
  },
  {
    title: 'Active Projects',
    amount: 10636,
    increased: true,
    percentage: '10.2',
    icon: StackIcon,
  },
];

export const projectStatViewOptions = [
  {
    label: 'Last Day',
    value: 'last-day',
  },
  {
    label: 'Last 7 Days',
    value: 'last-seven-days',
  },
  {
    label: 'Last 30 Days',
    value: 'last-thirty-days',
  },
];

export type StatType = {
  icon: IconType;
  title: string;
  amount: number;
  increased: boolean;
  percentage: string;
  iconWrapperFill?: string;
  className?: string;
};

type OverAllProgressDataDataType = {
  name: string;
  color: string;
  percentage: number;
  count: number;
};

export const overAllProgressData: OverAllProgressDataDataType[] = [
  { name: 'Total Projects', percentage: 126, color: '#00858D', count: 124 },
  { name: 'Completed', percentage: 26, color: '#65BE58', count: 26 },
  { name: 'Delayed', percentage: 36, color: '#FF712F', count: 36 },
  { name: 'On going', percentage: 46, color: '#666666', count: 46 },
];

export const overAllProgressViewOptions = [
  {
    label: 'Weekly',
    value: 'week',
  },
  {
    label: 'Monthly',
    value: 'month',
  },
];

export const activitiesData = [
  {
    label: 'React.js',
    completed: 80,
    inProgress: 100,
  },
  {
    label: 'WordP:',
    completed: 65,
    inProgress: 85,
  },
  {
    label: 'Design',
    completed: 95,
    inProgress: 65,
  },
  {
    label: 'Laravel',
    completed: 78,
    inProgress: 101,
  },
];

export const activitiesStatus = [
  { name: 'Completed' },
  { name: 'In Progress' },
];

export const ACTIVITIES_COLORS = ['#3AA6B9', '#365486'];

export const clientList = [
  {
    id: createId(),
    avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
    name: 'Gina Vanleuven',
    address: 'USA',
    workType: 'AI App Development',
    workProgress: 80,
  },
  {
    id: createId(),
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    name: 'Albert Flores',
    address: 'London',
    workType: 'AI App Development',
    workProgress: 70,
  },
  {
    id: createId(),
    avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
    name: 'Matte Hannery',
    address: 'Spain',
    workType: 'AI App Development',
    workProgress: 55,
  },
  {
    id: createId(),
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    name: 'Bucky Robert',
    address: 'Canada',
    workType: 'AI App Development',
    workProgress: 100,
  },
  {
    id: createId(),
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    name: 'Albert Flores',
    address: 'London',
    workType: 'AI App Development',
    workProgress: 70,
  },
  {
    id: createId(),
    avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
    name: 'Matte Hannery',
    address: 'Spain',
    workType: 'AI App Development',
    workProgress: 55,
  },
  {
    id: createId(),
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    name: 'Bucky Robert',
    address: 'Canada',
    workType: 'AI App Development',
    workProgress: 100,
  },
  {
    id: createId(),
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    name: 'Albert Flores',
    address: 'London',
    workType: 'AI App Development',
    workProgress: 70,
  },
];

export const projectStatisticsDailyData = [
  {
    label: 'Sat',
    completed: 9800,
    inProgress: 8000,
    active: 1800,
  },
  {
    label: 'Sun',
    completed: 8700,
    inProgress: 4900,
    active: 1600,
  },
  {
    label: 'Mon',
    completed: 5000,
    inProgress: 8600,
    active: 3200,
  },
  {
    label: 'Tue',
    completed: 4500,
    inProgress: 6800,
    active: 1200,
  },
  {
    label: 'Wed',
    completed: 2500,
    inProgress: 3800,
    active: 1000,
  },
  {
    label: 'Thu',
    completed: 8000,
    inProgress: 5900,
    active: 1200,
  },
  {
    label: 'Fri',
    completed: 8700,
    inProgress: 4800,
    active: 1600,
  },
];

export const projectStatisticsMonthlyData = [
  {
    label: 'Jan',
    completed: 5650,
    inProgress: 4540,
    active: 3200,
  },
  {
    label: 'Feb',
    completed: 1890,
    inProgress: 5510,
    active: 680,
  },
  {
    label: 'Mar',
    completed: 4300,
    inProgress: 3000,
    active: 1500,
  },
  {
    label: 'Apr',
    completed: 5710,
    inProgress: 5830,
    active: 2300,
  },
  {
    label: 'May',
    completed: 5710,
    inProgress: 5830,
    active: 2300,
  },
  {
    label: 'Jun',
    completed: 5710,
    inProgress: 5830,
    active: 2300,
  },
];

export const projectStatisticsTicketStatus = [
  { name: 'Completed' },
  { name: 'In Progress' },
  { name: 'Active' },
];

export const PROJECT_STATISTICS_COLORS = ['#3562FC', '#FC9D23', '#81868F'];

export const projectStatisticsViewOptions = [
  {
    label: 'Weekly',
    value: 'week',
  },
  {
    label: 'Monthly',
    value: 'month',
  },
];

export const projectTaskData = [
  {
    title: 'Understanding the tools in Figma',
  },
  {
    title: 'Understand the basics of making designs',
  },
  {
    title: 'Design a mobile application with figma',
  },
];

// project summary table data
export const projectSummaryData = [
  {
    id: createId(),
    project: 'Android app development',
    manager: 'Rachel Green',
    dueData: 'Jul 07, 2024',
    assignedTo: 'Mobile Team',
    status: 'completed',
    progress: 100,
  },
  {
    id: createId(),
    project: 'E-commerce platform',
    manager: 'Matte Henry',
    dueData: 'Jul 24, 2024',
    assignedTo: 'DevOps Team',
    status: 'on_going',
    progress: 70,
  },
  {
    id: createId(),
    project: 'IOS app development',
    manager: 'Michael Brown',
    dueData: 'Jul 25, 2024',
    assignedTo: 'Backend Team',
    status: 'delayed',
    progress: 35,
  },
  {
    id: createId(),
    project: 'Marketing website',
    manager: 'Rachel Green',
    dueData: 'Jul 12, 2024',
    assignedTo: 'WordPress Team',
    status: 'completed',
    progress: 100,
  },
  {
    id: createId(),
    project: 'IOS app development',
    manager: 'John Bushmill',
    dueData: 'Jun 29, 2024',
    assignedTo: 'Backend Team',
    status: 'at_risk',
    progress: 42,
  },
  {
    id: createId(),
    project: 'IOS app development',
    manager: 'Anna Smith',
    dueData: 'Jul 07, 2024',
    assignedTo: 'WordPress Team',
    status: 'completed',
    progress: 100,
  },
  {
    id: createId(),
    project: 'Data analytics tool',
    manager: 'Rachel Green',
    dueData: 'Jun 30, 2024',
    assignedTo: 'Backend Team',
    status: 'completed',
    progress: 80,
  },
  {
    id: createId(),
    project: 'Internal dashboard',
    manager: 'Rachel Green',
    dueData: 'Jul 27, 2024',
    assignedTo: 'Angular Team',
    status: 'on_going',
    progress: 51,
  },
  {
    id: createId(),
    project: 'Internal dashboard',
    manager: 'Anna Smith',
    dueData: 'Jul 02, 2024',
    assignedTo: 'React Team',
    status: 'delayed',
    progress: 51,
  },
  {
    id: createId(),
    project: 'Data analytics tool',
    manager: 'Tom Hanks',
    dueData: 'Jun 28, 2024',
    assignedTo: 'React Team',
    status: 'at_risk',
    progress: 34,
  },
];

export const projectRecentActivitiesData = [
  {
    id: createId(),
    title: 'Android app development',
    activity: 'Rachel Green added a new task in IOS app development',
    date: '1 hour ago',
  },
  {
    id: createId(),
    title: 'E-commerce platform',
    activity: 'Anna Smith added a new task in Data analytics tool',
    date: '2 hours ago',
  },
  {
    id: createId(),
    title: 'IOS app development',
    activity: 'John Bushmill added a new task in IOS app development',
    date: '3 hours ago',
  },
  {
    id: createId(),
    title: 'Marketing website',
    activity: 'Rachel Green added a new task in IOS app development',
    date: '4 hours ago',
  },
  {
    id: createId(),
    title: 'IOS app development',
    activity: 'Anna Smith added a new task in Data analytics tool',
    date: '5 hours ago',
  },
  {
    id: createId(),
    title: 'IOS app development',
    activity: 'John Bushmill added a new task in IOS app development',
    date: '6 hours ago',
  },
  {
    id: createId(),
    title: 'Data analytics tool',
    activity: 'Rachel Green added a new task in IOS app development',
    date: '7 hours ago',
  },
  {
    id: createId(),
    title: 'Internal dashboard',
    activity: 'Anna Smith added a new task in Data analytics tool',
    date: '8 hours ago',
  },
  {
    id: createId(),
    title: 'Internal dashboard',
    activity: 'John Bushmill added a new task in IOS app development',
    date: '9 hours ago',
  },
  {
    id: createId(),
    title: 'Data analytics tool',
    activity: 'Rachel Green added a new task in IOS app development',
    date: '10 hours ago',
  },
  {
    id: createId(),
    title: 'IOS app development',
    activity: 'Anna Smith added a new task in Data analytics tool',
    date: '11 hours ago',
  },
  {
    id: createId(),
    title: 'IOS app development',
    activity: 'John Bushmill added a new task in IOS app development',
    date: '12 hours ago',
  },
  {
    id: createId(),
    title: 'Data analytics tool',
    activity: 'Rachel Green added a new task in IOS app development',
    date: '13 hours ago',
  },
  {
    id: createId(),
    title: 'Internal dashboard',
    activity: 'Anna Smith added a new task in Data analytics tool',
    date: '14 hours ago',
  },
  {
    id: createId(),
    title: 'Internal dashboard',
    activity: 'John Bushmill added a new task in IOS app development',
    date: '15 hours ago',
  },
  {
    id: createId(),
    title: 'Data analytics tool',
    activity: 'Rachel Green added a new task in IOS app development',
    date: '16 hours ago',
  },
  {
    id: createId(),
    title: 'IOS app development',
    activity: 'Anna Smith added a new task in Data analytics tool',
    date: '17 hours ago',
  },
];

export const activeTasksData = [
  {
    title: 'Analysis',
    start: 1,
    end: 3,
  },
  {
    title: 'Design',
    start: 3,
    end: 5,
  },
  {
    title: 'Development',
    start: 5,
    end: 7,
  },
  {
    title: 'Testing',
    start: 7,
    end: 9,
  },
  {
    title: 'Deployment',
    start: 9,
    end: 10,
  },
];

export const activeTaskMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const activeTaskViewOptions = [
  {
    label: 'Today',
    value: 'today',
  },
  {
    label: 'Month',
    value: 'month',
  },
];
