import LinkedInSquareIcon from '@core/components/icons/linkedin-square';
import FacebookSquareIcon from '@core/components/icons/facebook-square';
import InstagramIcon from '@core/components/icons/instagram';
import { IconType } from 'react-icons';
import {
  PiDesktopDuotone,
  PiDeviceMobileDuotone,
  PiLaptopDuotone,
} from 'react-icons/pi';

export type SocialMediaStatType = {
  title: string;
  amount: number;
  increased: boolean;
  likes: number;
  likeIncreased: boolean;
  icon: IconType;
};

export const socialMediaStatData: SocialMediaStatType[] = [
  {
    title: 'Facebook',
    amount: 279935,
    increased: true,
    likes: 186000,
    likeIncreased: true,
    icon: FacebookSquareIcon,
  },
  {
    title: 'Instagram',
    amount: 279935,
    increased: true,
    likes: 144000,
    likeIncreased: true,
    icon: InstagramIcon,
  },
  {
    title: 'Linkedin',
    amount: 223394,
    increased: true,
    likes: 129000,
    likeIncreased: true,
    icon: LinkedInSquareIcon,
  },
];

export type SocialMediaOverallChartData = {
  name: string;
  profit: number;
};

export const socialMediaOverallChartData: SocialMediaOverallChartData[] = [
  {
    name: 'Jan',
    profit: 50,
  },
  {
    name: 'Feb',
    profit: 120,
  },
  {
    name: 'Mar',
    profit: 80,
  },
  {
    name: 'Apr',
    profit: 200,
  },
  {
    name: 'May',
    profit: 220,
  },
  {
    name: 'Jun',
    profit: 200,
  },
  {
    name: 'Jul',
    profit: 350,
  },
  {
    name: 'Aug',
    profit: 430,
  },
  {
    name: 'Sep',
    profit: 390,
  },
  {
    name: 'Oct',
    profit: 429,
  },
  {
    name: 'Nov',
    profit: 550,
  },
  {
    name: 'Dec',
    profit: 550,
  },
];

export const socialMediaOptions = [
  { label: 'Instagram', value: 'instagram', icon: InstagramIcon },
  { label: 'Facebook', value: 'facebook', icon: FacebookSquareIcon },
  { label: 'LinkedIn', value: 'linkedin', icon: LinkedInSquareIcon },
];

export const genderStatisticsData = [
  { name: 'Male', value: 14530, color: '#6956E5' },
  { name: 'Female', value: 9304, color: '#F8C07F' },
  { name: 'Others', value: 7723, color: '#FB896B' },
];

export const GENDER_COLORS = ['#6956E5', '#F8C07F', '#FB896B'];

export const genderViewOptions = [
  {
    value: 'weekly',
    label: 'Weekly',
  },
  {
    value: 'Monthly',
    label: 'Monthly',
  },
];

export const socialMediaTopCountriesData = [
  {
    country: 'cn',
    name: 'Canada',
    value: 9,
    style: 'bg-[#6993FF]',
    count: 102000,
  },
  {
    country: 'us',
    name: 'USA',
    value: 8,
    style: 'bg-[#6993FF]',
    count: 86000,
  },
  {
    country: 'ru',
    name: 'Australia',
    value: 6,
    style: 'bg-[#6993FF]',
    count: 62000,
  },
  {
    country: 'br',
    name: 'Brazil',
    value: 4,
    style: 'bg-[#6993FF]',
    count: 48000,
  },
  {
    country: 'uk',
    name: 'UK',
    value: 5,
    style: 'bg-[#6993FF]',
    count: 57000,
  },
];

export const socialMediaProfileVisitsData = [
  {
    day: 'Sat',
    visits: 5000,
  },
  {
    day: 'Sun',
    visits: 8500,
  },
  {
    day: 'Mon',
    visits: 7000,
  },
  {
    day: 'Tue',
    visits: 3908,
  },
  {
    day: 'Wed',
    visits: 4890,
  },
  {
    day: 'Thu',
    visits: 8000,
  },
  {
    day: 'Fri',
    visits: 8500,
  },
];

export const FLOW_ON_DEVICES_COLORS = ['#67D7F0', '#FD8050', '#34C759'];

export const flowOnDevicesStatisticsData = [
  {
    icon: PiDeviceMobileDuotone,
    name: 'Mobile',
    value: 25,
    color: '#67D7F0',
  },
  {
    icon: PiDesktopDuotone,
    name: 'Desktop',
    value: 50,
    color: '#FD8050',
  },
  { icon: PiLaptopDuotone, name: 'Laptop', value: 25, color: '#34C759' },
];

export const trafficAnalyticsData = [
  {
    title: 'Organic',
    value: 55,
    label: '55K',
    color: '#6993FF',
  },
  {
    title: 'Paid',
    value: 30,
    label: '30K',
    color: '#E68C12',
  },
];

export const recentActivitiesData = [
  {
    user: '@brayan47',
    action: 'started following you',
    platform: 'Instagram',
    time: '15 min ago',
    icon: InstagramIcon,
  },
  {
    user: '@mic15',
    action: 'started following you',
    platform: 'Facebook',
    time: '15 min ago',
    icon: FacebookSquareIcon,
  },
  {
    user: '@deva_14',
    action: 'added a new photo',
    platform: 'Instagram',
    time: '15 min ago',
    icon: InstagramIcon,
  },
  {
    user: '@brayan17',
    action: 'started following you',
    platform: 'Facebook',
    time: '15 min ago',
    icon: FacebookSquareIcon,
  },
  {
    user: '@mic15',
    action: 'added a new photo',
    platform: 'Instagram',
    time: '15 min ago',
    icon: InstagramIcon,
  },
  {
    user: '@brayan47',
    action: 'started following you',
    platform: 'Instagram',
    time: '15 min ago',
    icon: InstagramIcon,
  },
  {
    user: '@mic15',
    action: 'started following you',
    platform: 'Facebook',
    time: '15 min ago',
    icon: FacebookSquareIcon,
  },
  {
    user: '@deva_14',
    action: 'added a new photo',
    platform: 'Instagram',
    time: '15 min ago',
    icon: InstagramIcon,
  },
  {
    user: '@brayan17',
    action: 'started following you',
    platform: 'Facebook',
    time: '15 min ago',
    icon: FacebookSquareIcon,
  },
  {
    user: '@mic15',
    action: 'added a new photo',
    platform: 'Instagram',
    time: '15 min ago',
    icon: InstagramIcon,
  },
];

export type PostSummaryDataType = {
  id: number;
  image: string;
  title: string;
  link: string;
  availabilityDate: string;
  views: number;
  likes: number;
  comments: number;
  platforms: {
    name: string;
    link: string;
  }[];
};

export const postSummaryData = [
  {
    id: 1,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/liver-pool.webp',
    title: 'Liverpool football club, Laliga',
    link: 'https://dummy.com',
    availabilityDate: 'Jul 07, 2024',
    views: 241000,
    likes: 4785,
    comments: 1587,
    platforms: [
      {
        name: 'Facebook',
        link: 'https://dummy.com',
      },
      {
        name: 'Instagram',
        link: 'https://dummy.com',
      },
      {
        name: 'LinkedIn',
        link: 'https://dummy.com',
      },
    ],
  },
  {
    id: 2,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/xiaomi.webp',
    title: 'Xiaomi USA, and others share',
    link: 'https://dummy.com',
    availabilityDate: 'Jul 07, 2024',
    views: 241000,
    likes: 4785,
    comments: 1587,
    platforms: [
      {
        name: 'Facebook',
        link: 'https://dummy.com',
      },
      {
        name: 'Instagram',
        link: 'https://dummy.com',
      },
      {
        name: 'LinkedIn',
        link: 'https://dummy.com',
      },
    ],
  },
  {
    id: 3,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/crafts.webp',
    title: '5 min crafts recently shared',
    link: 'https://dummy.com',
    availabilityDate: 'Jul 07, 2024',
    views: 241000,
    likes: 4785,
    comments: 1587,
    platforms: [
      {
        name: 'Facebook',
        link: 'https://dummy.com',
      },
      {
        name: 'Instagram',
        link: 'https://dummy.com',
      },
      {
        name: 'LinkedIn',
        link: 'https://dummy.com',
      },
    ],
  },
  {
    id: 4,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/liver-pool.webp',
    title: 'Liverpool football club, Laliga',
    link: 'https://dummy.com',
    availabilityDate: 'Jul 07, 2024',
    views: 241000,
    likes: 4785,
    comments: 1587,
    platforms: [
      {
        name: 'Facebook',
        link: 'https://dummy.com',
      },
      {
        name: 'Instagram',
        link: 'https://dummy.com',
      },
      {
        name: 'LinkedIn',
        link: 'https://dummy.com',
      },
    ],
  },
  {
    id: 5,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/xiaomi.webp',
    title: 'Xiaomi USA, and others share',
    link: 'https://dummy.com',
    availabilityDate: 'Jul 07, 2024',
    views: 241000,
    likes: 4785,
    comments: 1587,
    platforms: [
      {
        name: 'Facebook',
        link: 'https://dummy.com',
      },
      {
        name: 'Instagram',
        link: 'https://dummy.com',
      },
      {
        name: 'LinkedIn',
        link: 'https://dummy.com',
      },
    ],
  },
  {
    id: 6,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/crafts.webp',
    title: '5 min crafts recently shared',
    link: 'https://dummy.com',
    availabilityDate: 'Jul 07, 2024',
    views: 241000,
    likes: 4785,
    comments: 1587,
    platforms: [
      {
        name: 'Facebook',
        link: 'https://dummy.com',
      },
      {
        name: 'Instagram',
        link: 'https://dummy.com',
      },
      {
        name: 'LinkedIn',
        link: 'https://dummy.com',
      },
    ],
  },
  {
    id: 7,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/liver-pool.webp',
    title: 'Liverpool football club, Laliga',
    link: 'https://dummy.com',
    availabilityDate: 'Jul 07, 2024',
    views: 241000,
    likes: 4785,
    comments: 1587,
    platforms: [
      {
        name: 'Facebook',
        link: 'https://dummy.com',
      },
      {
        name: 'Instagram',
        link: 'https://dummy.com',
      },
      {
        name: 'LinkedIn',
        link: 'https://dummy.com',
      },
    ],
  },
  {
    id: 8,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/xiaomi.webp',
    title: 'Xiaomi USA, and others share',
    link: 'https://dummy.com',
    availabilityDate: 'Jul 07, 2024',
    views: 241000,
    likes: 4785,
    comments: 1587,
    platforms: [
      {
        name: 'Facebook',
        link: 'https://dummy.com',
      },
      {
        name: 'Instagram',
        link: 'https://dummy.com',
      },
      {
        name: 'LinkedIn',
        link: 'https://dummy.com',
      },
    ],
  },
  {
    id: 9,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/crafts.webp',
    title: '5 min crafts recently shared',
    link: 'https://dummy.com',
    availabilityDate: 'Jul 07, 2024',
    views: 241000,
    likes: 4785,
    comments: 1587,
    platforms: [
      {
        name: 'Facebook',
        link: 'https://dummy.com',
      },
      {
        name: 'Instagram',
        link: 'https://dummy.com',
      },
      {
        name: 'LinkedIn',
        link: 'https://dummy.com',
      },
    ],
  },
  {
    id: 10,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/xiaomi.webp',
    title: 'Liverpool football club, Laliga',
    link: 'https://dummy.com',
    availabilityDate: 'Jul 07, 2024',
    views: 241000,
    likes: 4785,
    comments: 1587,
    platforms: [
      {
        name: 'Facebook',
        link: 'https://dummy.com',
      },
      {
        name: 'Instagram',
        link: 'https://dummy.com',
      },
      {
        name: 'LinkedIn',
        link: 'https://dummy.com',
      },
    ],
  },
  {
    id: 11,
    image: '/images/social-media-dashboard/post-1.png',
    title: 'Xiaomi USA, and others share',
    link: 'https://dummy.com',
    availabilityDate: 'Jul 07, 2024',
    views: 241000,
    likes: 4785,
    comments: 1587,
    platforms: [
      {
        name: 'Facebook',
        link: 'https://dummy.com',
      },
      {
        name: 'Instagram',
        link: 'https://dummy.com',
      },
      {
        name: 'LinkedIn',
        link: 'https://dummy.com',
      },
    ],
  },
  {
    id: 12,
    image: '/images/social-media-dashboard/post-1.png',
    title: '5 min crafts recently shared',
    link: 'https://dummy.com',
    availabilityDate: 'Jul 07, 2024',
    views: 241000,
    likes: 4785,
    comments: 1587,
    platforms: [
      {
        name: 'Facebook',
        link: 'https://dummy.com',
      },
      {
        name: 'Instagram',
        link: 'https://dummy.com',
      },
      {
        name: 'LinkedIn',
        link: 'https://dummy.com',
      },
    ],
  },
];

export const engagementsChartData = [
  {
    month: 'Jan',
    positive: 50,
    neutral: 10,
    negative: 10,
  },
  {
    month: 'Feb',
    positive: 85,
    neutral: 16,
    negative: 57,
  },
  {
    month: 'Mar',
    positive: 70,
    neutral: 83,
    negative: 30,
  },
  {
    month: 'Apr',
    positive: 39,
    neutral: 17,
    negative: 67,
  },
  {
    month: 'May',
    positive: 48,
    neutral: 25,
    negative: 15,
  },
  {
    month: 'Jun',
    positive: 80,
    neutral: 32,
    negative: 78,
  },
  {
    month: 'Jul',
    positive: 85,
    neutral: 25,
    negative: 25,
  },
  {
    month: 'Aug',
    positive: 37,
    neutral: 39,
    negative: 99,
  },
  {
    month: 'Sep',
    positive: 78,
    neutral: 28,
    negative: 85,
  },
  {
    month: 'Oct',
    positive: 57,
    neutral: 19,
    negative: 72,
  },
  {
    month: 'Nov',
    positive: 47,
    neutral: 19,
    negative: 29,
  },
  {
    month: 'Dec',
    positive: 75,
    neutral: 30,
    negative: 90,
  },
];

export type SchedulePostType = {
  platform: string;
  title: string;
  date: string;
  time: string;
};

export const scheduledPostData: SchedulePostType[] = [
  {
    platform: 'Facebook',
    title: 'It’s not just yoga  it’s a whole lifestyle. Subscribe today...',
    date: '04-07-2024',
    time: '10:30 PM',
  },
  {
    platform: 'Instagram',
    title: 'It’s not just yoga  it’s a whole lifestyle. Subscribe today...',
    date: '04-07-2024',
    time: '10:30 PM',
  },
  {
    platform: 'LinkedIn',
    title: 'It’s not just yoga  it’s a whole lifestyle. Subscribe today...',
    date: '04-07-2024',
    time: '10:30 PM',
  },
  {
    platform: 'Facebook',
    title: 'It’s not just yoga  it’s a whole lifestyle. Subscribe today...',
    date: '04-07-2024',
    time: '10:30 PM',
  },
  {
    platform: 'Instagram',
    title: 'It’s not just yoga  it’s a whole lifestyle. Subscribe today...',
    date: '04-07-2024',
    time: '10:30 PM',
  },
  {
    platform: 'Facebook',
    title: 'It’s not just yoga  it’s a whole lifestyle. Subscribe today...',
    date: '04-07-2024',
    time: '10:30 PM',
  },
  {
    platform: 'LinkedIn',
    title: 'It’s not just yoga  it’s a whole lifestyle. Subscribe today...',
    date: '04-07-2024',
    time: '10:30 PM',
  },
  {
    platform: 'Instagram',
    title: 'It’s not just yoga  it’s a whole lifestyle. Subscribe today...',
    date: '04-07-2024',
    time: '10:30 PM',
  },
];

export const customersDistributionsMapData = [
  { country: 'US', name: 'United States', value: 10, color: '#192f5d' },
  { country: 'SA', name: 'Saudi Arab', value: 20, color: '#199d00' },
  { country: 'CN', name: 'China', value: 30, color: '#afdaf7' },
  { country: 'DK', name: 'United Kingdom', value: 40, color: '#d7ecfb' },
  { country: 'ES', name: 'Spain', value: 20, color: '#d7ecfb' },
];

export const salesAnalysisChartGradientData = [
  {
    offset: 0,
    color: 'rgba(84, 214, 193, 0.1)',
  },
  {
    offset: 9,
    color: 'rgba(84, 214, 193, 0.1)',
  },
  {
    offset: 9,
    color: 'rgba(84, 214, 193, 0.2)',
  },
  {
    offset: 18,
    color: 'rgba(84, 214, 193, 0.2)',
  },
  {
    offset: 18,
    color: 'rgba(84, 214, 193, 0.3)',
  },
  {
    offset: 27,
    color: 'rgba(84, 214, 193, 0.3)',
  },
  {
    offset: 27,
    color: 'rgba(84, 214, 193, 0.4)',
  },
  {
    offset: 36,
    color: 'rgba(84, 214, 193, 0.4)',
  },
  {
    offset: 36,
    color: 'rgba(84, 214, 193, 0.5)',
  },
  {
    offset: 45,
    color: 'rgba(84, 214, 193, 0.5)',
  },
  {
    offset: 45,
    color: 'rgba(84, 214, 193, 0.6)',
  },
  {
    offset: 55,
    color: 'rgba(84, 214, 193, 0.6)',
  },
  {
    offset: 55,
    color: 'rgba(84, 214, 193, 0.7)',
  },
  {
    offset: 64,
    color: 'rgba(84, 214, 193, 0.7)',
  },
  {
    offset: 64,
    color: 'rgba(84, 214, 193, 0.8)',
  },
  {
    offset: 73,
    color: 'rgba(84, 214, 193, 0.8)',
  },
  {
    offset: 73,
    color: 'rgba(84, 214, 193, 0.9)',
  },
  {
    offset: 82,
    color: 'rgba(84, 214, 193, 0.9)',
  },
  {
    offset: 82,
    color: 'rgb(84, 214, 193)',
  },
  {
    offset: 91,
    color: 'rgb(84, 214, 193)',
  },
  {
    offset: 91,
    color: { dark: '#59E9D2', light: '#50CCB8' },
  },
  {
    offset: 100,
    color: { dark: '#59E9D2', light: '#50CCB8' },
  },
];

export const salesAnalysisData = [
  {
    month: 'Jan',
    value: 785,
  },
  {
    month: 'Feb',
    value: 700,
  },
  {
    month: 'Mar',
    value: 600,
  },
  {
    month: 'Apr',
    value: 515,
  },
  {
    month: 'May',
    value: 435,
  },
  {
    month: 'Jun',
    value: 370,
  },
  {
    month: 'Jul',
    value: 315,
  },
  {
    month: 'Aug',
    value: 275,
  },
  {
    month: 'Sep',
    value: 250,
  },
  {
    month: 'Oct',
    value: 240,
  },
  {
    month: 'Nov',
    value: 245,
  },
  {
    month: 'Dec',
    value: 260,
  },
];
