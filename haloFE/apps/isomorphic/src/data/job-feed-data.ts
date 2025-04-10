import { IconType } from 'react-icons';
import FacebookIcon from '@core/components/icons/facebook';
import {
  PiMapPinLight,
  PiClockLight,
  PiCurrencyCircleDollarLight,
  PiCalendarBlankLight,
  PiShoppingBagLight,
  PiBuildingsLight,
} from 'react-icons/pi';
import TwitterIcon from '@core/components/icons/twitter';

export const jobFeedBannerLogo =
  'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/job-feed-banner.webp';

export const jobFeedLogo =
  'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/job-feed-logo.webp';

export type JobDescription = {
  descTitle: string;
  desc: string;
};

export type JobInfoProps = {
  title: string;
  value: string[];
  badge?: boolean;
  icon: IconType;
};

export type JobType = {
  type: string;
  companyName: string;
  logo: string;
  jobTitle: string;
  price: string;
  time: string;
  jobDescription: JobDescription[];
  skills: string[];
  rating: number;
  location: string;
  support: {
    email: string;
    desc: string;
  };
  breadcrumb: {
    name: string;
    value?: string;
  }[];
  info: JobInfoProps[];
};

export const jobFeedData = [
  {
    type: 'company',
    companyName: 'GreenTech LLC',
    logo: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/job-feed-1.webp',
    jobTitle: 'Senior Product Designer',
    price: '$50-$60',
    time: '1-3 Month',
    breadcrumb: [
      {
        name: 'Hourly:',
        value: '$50 - $60',
      },
      {
        name: 'Remote Friendly',
      },
      {
        name: 'Est Time:',
        value: '1-3 Month',
      },
    ],
    jobDescription: [
      {
        descTitle: 'Who were looking for',
        desc: 'Looking for an experienced UI/UX designer for an on going project? Your will work with an existing SCRUM team for this project. The SCRUM team is comprised of consultants in EU and Asia, working on a bespoke software development..',
      },
      {
        descTitle: 'Dashboard Earth Benefits',
        desc: 'We are a small climate tech startup on a big mission to drive citizen engagement in climate change adaptation. If your excited by the challenge of how to turn recycling and using less plastic into a fun mobile app experience, read on. Were looking for a Lead Product Designer to join us at a really important juncture, as we build the first-ever marketplace for climate outcomes. What powers the marketplace is an engaging consumer app that connects residents to local climate actions. This is an exciting and unique opportunity to design an innovative app that drives peoples real-world actions and reduces their climate anxiety, at a tipping point in public awareness and engagement in climate action',
      },
      {
        descTitle: 'Dashboard Earth Benefits',
        desc: 'We are a small climate tech startup on a big mission to drive citizen engagement in climate change adaptation. If your excited by the challenge of how to turn recycling and using less plastic into a fun mobile app experience, read on. Were looking for a Lead Product Designer to join us at a really important juncture, as we build the first-ever marketplace for climate outcomes. What powers the marketplace is an engaging consumer app that connects residents to local climate actions. This is an exciting and unique opportunity to design an innovative app that drives peoples real-world actions and reduces their climate anxiety, at a tipping point in public awareness and engagement in climate action',
      },
    ],
    skills: [
      'User Interface Design',
      'Figma',
      'Wire Framing',
      'User Experience',
      'Style Guide',
      'Wire Framing',
      'User Experience',
      'Style Guide',
    ],
    rating: 5,
    location: 'New York, USA',
    support: {
      email: 'ops@dashboard.earth.',
      desc: 'Dashboard.earth is an Equal Opportunity Employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. We take a holistic approach to hiring and review every application, even if you do not meet all the qualifications. If you are good at what you do and our mission speaks to you, please apply!',
    },
    info: [
      {
        title: 'Location',
        value: ['New York, USA'],
        icon: PiMapPinLight,
      },
      {
        title: 'Commitment',
        value: ['Full Time', 'Remote'],
        badge: true,
        icon: PiClockLight,
      },
      {
        title: 'Product Type',
        value: ['Management System'],
        icon: PiShoppingBagLight,
      },
      {
        title: 'Salary Range',
        value: ['$60K - $80K'],
        icon: PiCurrencyCircleDollarLight,
      },
      {
        title: 'Start Date',
        value: ['Dec 15, 2023'],
        icon: PiCalendarBlankLight,
      },
      {
        title: 'Industry',
        value: ['IT Department'],
        icon: PiBuildingsLight,
      },
    ],
  },
  {
    type: 'contract',
    companyName: 'GreenTech LLC',
    logo: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/job-feed-2.webp',
    jobTitle: 'Senior Software Engineer',
    price: '$50 - $60',
    time: '1-3 Month',
    breadcrumb: [
      {
        name: 'Hourly:',
        value: '$50 - $60',
      },
      {
        name: 'Remote Friendly',
      },
      {
        name: 'Est Time:',
        value: '1-3 Month',
      },
    ],
    jobDescription: [
      {
        descTitle: 'Who were looking for',
        desc: 'Looking for an experienced UI/UX designer for an on going project? Your will work with an existing SCRUM team for this project. The SCRUM team is comprised of consultants in EU and Asia, working on a bespoke software development..',
      },
      {
        descTitle: 'Dashboard Earth Benefits',
        desc: 'We are a small climate tech startup on a big mission to drive citizen engagement in climate change adaptation. If your excited by the challenge of how to turn recycling and using less plastic into a fun mobile app experience, read on. Were looking for a Lead Product Designer to join us at a really important juncture, as we build the first-ever marketplace for climate outcomes. What powers the marketplace is an engaging consumer app that connects residents to local climate actions. This is an exciting and unique opportunity to design an innovative app that drives peoples real-world actions and reduces their climate anxiety, at a tipping point in public awareness and engagement in climate action',
      },
      {
        descTitle: 'Dashboard Earth Benefits',
        desc: 'We are a small climate tech startup on a big mission to drive citizen engagement in climate change adaptation. If your excited by the challenge of how to turn recycling and using less plastic into a fun mobile app experience, read on. Were looking for a Lead Product Designer to join us at a really important juncture, as we build the first-ever marketplace for climate outcomes. What powers the marketplace is an engaging consumer app that connects residents to local climate actions. This is an exciting and unique opportunity to design an innovative app that drives peoples real-world actions and reduces their climate anxiety, at a tipping point in public awareness and engagement in climate action',
      },
    ],
    skills: [
      'User Interface Design',
      'Figma',
      'Wire Framing',
      'User Experience',
      'StyleGuide',
      'Wire Framing',
      'User Experience',
      'Style Guide',
    ],
    rating: 4,
    location: 'New York, USA',
    support: {
      email: 'ops@dashboard.earth.',
      desc: 'Dashboard.earth is an Equal Opportunity Employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. We take a holistic approach to hiring and review every application, even if you do not meet all the qualifications. If you are good at what you do and our mission speaks to you, please apply!',
    },
    info: [
      {
        title: 'Location',
        value: ['New York, USA'],
        icon: PiMapPinLight,
      },
      {
        title: 'Commitment',
        value: ['Full Time', 'Remote'],
        badge: true,
        icon: PiClockLight,
      },
      {
        title: 'Product Type',
        value: ['Management System'],
        icon: PiShoppingBagLight,
      },
      {
        title: 'Salary Range',
        value: ['$60K - $80K'],
        icon: PiCurrencyCircleDollarLight,
      },
      {
        title: 'Start Date',
        value: ['Dec 15, 2023'],
        icon: PiCalendarBlankLight,
      },
      {
        title: 'Industry',
        value: ['IT Department'],
        icon: PiBuildingsLight,
      },
    ],
  },
  {
    type: 'company',
    companyName: 'GreenTech LLC',
    logo: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/job-feed-3.webp',
    jobTitle: 'Full Stack Web Developer',
    price: '$50 - $60',
    time: '1-3 Month',
    breadcrumb: [
      {
        name: 'Hourly:',
        value: '$50 - $60',
      },
      {
        name: 'Remote Friendly',
      },
      {
        name: 'Est Time:',
        value: '1-3 Month',
      },
    ],
    jobDescription: [
      {
        descTitle: 'Who were looking for',
        desc: 'Looking for an experienced UI/UX designer for an on going project? Your will work with an existing SCRUM team for this project. The SCRUM team is comprised of consultants in EU and Asia, working on a bespoke software development..',
      },
      {
        descTitle: 'Dashboard Earth Benefits',
        desc: 'We are a small climate tech startup on a big mission to drive citizen engagement in climate change adaptation. If your excited by the challenge of how to turn recycling and using less plastic into a fun mobile app experience, read on. Were looking for a Lead Product Designer to join us at a really important juncture, as we build the first-ever marketplace for climate outcomes. What powers the marketplace is an engaging consumer app that connects residents to local climate actions. This is an exciting and unique opportunity to design an innovative app that drives peoples real-world actions and reduces their climate anxiety, at a tipping point in public awareness and engagement in climate action',
      },
      {
        descTitle: 'Dashboard Earth Benefits',
        desc: 'We are a small climate tech startup on a big mission to drive citizen engagement in climate change adaptation. If your excited by the challenge of how to turn recycling and using less plastic into a fun mobile app experience, read on. Were looking for a Lead Product Designer to join us at a really important juncture, as we build the first-ever marketplace for climate outcomes. What powers the marketplace is an engaging consumer app that connects residents to local climate actions. This is an exciting and unique opportunity to design an innovative app that drives peoples real-world actions and reduces their climate anxiety, at a tipping point in public awareness and engagement in climate action',
      },
    ],
    skills: [
      'User Interface Design',
      'Figma',
      'Wire Framing',
      'User Experience',
      'Style Guide',
      'Wire Framing',
      'User Experience',
      'Style Guide',
    ],
    rating: 5,
    location: 'Africa',
    support: {
      email: 'ops@dashboard.earth.',
      desc: 'Dashboard.earth is an Equal Opportunity Employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. We take a holistic approach to hiring and review every application, even if you do not meet all the qualifications. If you are good at what you do and our mission speaks to you, please apply!',
    },
    info: [
      {
        title: 'Location',
        value: ['New York, USA'],
        icon: PiMapPinLight,
      },
      {
        title: 'Commitment',
        value: ['Full Time', 'Remote'],
        badge: true,
        icon: PiClockLight,
      },
      {
        title: 'Product Type',
        value: ['Management System'],
        icon: PiShoppingBagLight,
      },
      {
        title: 'Salary Range',
        value: ['$60K - $80K'],
        icon: PiCurrencyCircleDollarLight,
      },
      {
        title: 'Start Date',
        value: ['Dec 15, 2023'],
        icon: PiCalendarBlankLight,
      },
      {
        title: 'Industry',
        value: ['IT Department'],
        icon: PiBuildingsLight,
      },
    ],
  },
  {
    type: 'company',
    companyName: 'GreenTech LLC',
    logo: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/job-feed-4.webp',
    jobTitle: 'Mid-level Software Engineer',
    price: '$50 - $60',
    time: '1-3 Month',
    breadcrumb: [
      {
        name: 'Hourly:',
        value: '$50 - $60',
      },
      {
        name: 'Remote Friendly',
      },
      {
        name: 'Est Time:',
        value: '1-3 Month',
      },
    ],
    jobDescription: [
      {
        descTitle: 'Who were looking for',
        desc: 'Looking for an experienced UI/UX designer for an on going project? Your will work with an existing SCRUM team for this project. The SCRUM team is comprised of consultants in EU and Asia, working on a bespoke software development..',
      },
      {
        descTitle: 'Dashboard Earth Benefits',
        desc: 'We are a small climate tech startup on a big mission to drive citizen engagement in climate change adaptation. If youre excited by the challenge of how to turn recycling and using less plastic into a fun mobile app experience, read on. Were looking for a Lead Product Designer to join us at a really important juncture, as we build the first-ever marketplace for climate outcomes. What powers the marketplace is an engaging consumer app that connects residents to local climate actions. This is an exciting and unique opportunity to design an innovative app that drives peoples real-world actions and reduces their climate anxiety, at a tipping point in public awareness and engagement in climate action',
      },
      {
        descTitle: 'Dashboard Earth Benefits',
        desc: 'We are a small climate tech startup on a big mission to drive citizen engagement in climate change adaptation. If youre excited by the challenge of how to turn recycling and using less plastic into a fun mobile app experience, read on. Were looking for a Lead Product Designer to join us at a really important juncture, as we build the first-ever marketplace for climate outcomes. What powers the marketplace is an engaging consumer app that connects residents to local climate actions. This is an exciting and unique opportunity to design an innovative app that drives peoples real-world actions and reduces their climate anxiety, at a tipping point in public awareness and engagement in climate action',
      },
    ],
    skills: [
      'User Interface Design',
      'Figma',
      'Wire Framing',
      'User Experience',
      'Style Guide',
      'Wire Framing',
      'User Experience',
      'Style Guide',
    ],
    rating: 5,
    location: 'New York, USA',
    support: {
      email: 'ops@dashboard.earth.',
      desc: 'Dashboard.earth is an Equal Opportunity Employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. We take a holistic approach to hiring and review every application, even if you do not meet all the qualifications. If you are good at what you do and our mission speaks to you, please apply!',
    },
    info: [
      {
        title: 'Location',
        value: ['New York, USA'],
        icon: PiMapPinLight,
      },
      {
        title: 'Commitment',
        value: ['Full Time', 'Remote'],
        badge: true,
        icon: PiClockLight,
      },
      {
        title: 'Product Type',
        value: ['Management System'],
        icon: PiShoppingBagLight,
      },
      {
        title: 'Salary Range',
        value: ['$60K - $80K'],
        icon: PiCurrencyCircleDollarLight,
      },
      {
        title: 'Start Date',
        value: ['Dec 15, 2023'],
        icon: PiCalendarBlankLight,
      },
      {
        title: 'Industry',
        value: ['IT Department'],
        icon: PiBuildingsLight,
      },
    ],
  },
  {
    type: 'company',
    companyName: 'GreenTech LLC',
    logo: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/job-feed-1.webp',
    jobTitle: 'Senior UI/UX Designer',
    price: '$50-$60',
    time: '1-3 Month',
    breadcrumb: [
      {
        name: 'Hourly:',
        value: '$50-$60',
      },
      {
        name: 'Remote Friendly',
      },
      {
        name: 'Est Time:',
        value: '1-3 Month',
      },
    ],
    jobDescription: [
      {
        descTitle: 'Who were looking for',
        desc: 'Looking for an experienced UI/UX designer for an on going project? Your will work with an existing SCRUM team for this project. The SCRUM team is comprised of consultants in EU and Asia, working on a bespoke software development..',
      },
      {
        descTitle: 'Dashboard Earth Benefits',
        desc: 'We are a small climate tech startup on a big mission to drive citizen engagement in climate change adaptation. If your excited by the challenge of how to turn recycling and using less plastic into a fun mobile app experience, read on. Were looking for a Lead Product Designer to join us at a really important juncture, as we build the first-ever marketplace for climate outcomes. What powers the marketplace is an engaging consumer app that connects residents to local climate actions. This is an exciting and unique opportunity to design an innovative app that drives peoples real-world actions and reduces their climate anxiety, at a tipping point in public awareness and engagement in climate action',
      },
      {
        descTitle: 'Dashboard Earth Benefits',
        desc: 'We are a small climate tech startup on a big mission to drive citizen engagement in climate change adaptation. If your excited by the challenge of how to turn recycling and using less plastic into a fun mobile app experience, read on. Were looking for a Lead Product Designer to join us at a really important juncture, as we build the first-ever marketplace for climate outcomes. What powers the marketplace is an engaging consumer app that connects residents to local climate actions. This is an exciting and unique opportunity to design an innovative app that drives peoples real-world actions and reduces their climate anxiety, at a tipping point in public awareness and engagement in climate action',
      },
    ],
    skills: [
      'User Interface Design',
      'Figma',
      'Wire Framing',
      'User Experience',
      'Style Guide',
      'Wire Framing',
      'User Experience',
      'Style Guide',
    ],
    rating: 5,
    location: 'Canada, USA',
    support: {
      email: 'ops@dashboard.earth.',
      desc: 'Dashboard.earth is an Equal Opportunity Employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. We take a holistic approach to hiring and review every application, even if you do not meet all the qualifications. If you are good at what you do and our mission speaks to you, please apply!',
    },
    info: [
      {
        title: 'Location',
        value: ['New York, USA'],
        icon: PiMapPinLight,
      },
      {
        title: 'Commitment',
        value: ['Full Time', 'Remote'],
        badge: true,
        icon: PiClockLight,
      },
      {
        title: 'Product Type',
        value: ['Management System'],
        icon: PiShoppingBagLight,
      },
      {
        title: 'Salary Range',
        value: ['$60K - $80K'],
        icon: PiCurrencyCircleDollarLight,
      },
      {
        title: 'Start Date',
        value: ['Dec 15, 2023'],
        icon: PiCalendarBlankLight,
      },
      {
        title: 'Industry',
        value: ['IT Department'],
        icon: PiBuildingsLight,
      },
    ],
  },
  {
    type: 'contract',
    companyName: 'GreenTech LLC',
    logo: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/job-feed-2.webp',
    jobTitle: 'Senior Software Engineer',
    price: '$50 - $60',
    time: '1-3 Month',
    breadcrumb: [
      {
        name: 'Hourly:',
        value: '$25 - $35',
      },
      {
        name: 'Remote Friendly',
      },
      {
        name: 'Est Time:',
        value: '1-3 Month',
      },
    ],
    jobDescription: [
      {
        descTitle: 'Who were looking for',
        desc: 'Looking for an experienced UI/UX designer for an on going project? Your will work with an existing SCRUM team for this project. The SCRUM team is comprised of consultants in EU and Asia, working on a bespoke software development..',
      },
      {
        descTitle: 'Dashboard Earth Benefits',
        desc: 'We are a small climate tech startup on a big mission to drive citizen engagement in climate change adaptation. If your excited by the challenge of how to turn recycling and using less plastic into a fun mobile app experience, read on. Were looking for a Lead Product Designer to join us at a really important juncture, as we build the first-ever marketplace for climate outcomes. What powers the marketplace is an engaging consumer app that connects residents to local climate actions. This is an exciting and unique opportunity to design an innovative app that drives peoples real-world actions and reduces their climate anxiety, at a tipping point in public awareness and engagement in climate action',
      },
      {
        descTitle: 'Dashboard Earth Benefits',
        desc: 'We are a small climate tech startup on a big mission to drive citizen engagement in climate change adaptation. If your excited by the challenge of how to turn recycling and using less plastic into a fun mobile app experience, read on. Were looking for a Lead Product Designer to join us at a really important juncture, as we build the first-ever marketplace for climate outcomes. What powers the marketplace is an engaging consumer app that connects residents to local climate actions. This is an exciting and unique opportunity to design an innovative app that drives peoples real-world actions and reduces their climate anxiety, at a tipping point in public awareness and engagement in climate action',
      },
    ],
    skills: [
      'User Interface Design',
      'Figma',
      'Wire Framing',
      'User Experience',
      'Style Guide',
      'Wire Framing',
      'User Experience',
      'Style Guide',
    ],
    rating: 5,
    location: 'USA',
    support: {
      email: 'ops@dashboard.earth.',
      desc: 'Dashboard.earth is an Equal Opportunity Employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. We take a holistic approach to hiring and review every application, even if you do not meet all the qualifications. If you are good at what you do and our mission speaks to you, please apply!',
    },
    info: [
      {
        title: 'Location',
        value: ['New York, USA'],
        icon: PiMapPinLight,
      },
      {
        title: 'Commitment',
        value: ['Full Time', 'Remote'],
        badge: true,
        icon: PiClockLight,
      },
      {
        title: 'Product Type',
        value: ['Management System'],
        icon: PiShoppingBagLight,
      },
      {
        title: 'Salary Range',
        value: ['$60K - $80K'],
        icon: PiCurrencyCircleDollarLight,
      },
      {
        title: 'Start Date',
        value: ['Dec 15, 2023'],
        icon: PiCalendarBlankLight,
      },
      {
        title: 'Industry',
        value: ['IT Department'],
        icon: PiBuildingsLight,
      },
    ],
  },
  {
    type: 'company',
    companyName: 'GreenTech LLC',
    logo: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/job-feed-3.webp',
    jobTitle: 'Mid-level Full Stack Web Developer',
    price: '$20 - $30',
    time: '1-3 Month',
    breadcrumb: [
      {
        name: 'Hourly:',
        value: '$50 - $60',
      },
      {
        name: 'Remote Friendly',
      },
      {
        name: 'Est Time:',
        value: '1-3 Month',
      },
    ],
    jobDescription: [
      {
        descTitle: 'Who were looking for',
        desc: 'Looking for an experienced UI/UX designer for an on going project? Your will work with an existing SCRUM team for this project. The SCRUM team is comprised of consultants in EU and Asia, working on a bespoke software development..',
      },
      {
        descTitle: 'Dashboard Earth Benefits',
        desc: 'We are a small climate tech startup on a big mission to drive citizen engagement in climate change adaptation. If your excited by the challenge of how to turn recycling and using less plastic into a fun mobile app experience, read on. Were looking for a Lead Product Designer to join us at a really important juncture, as we build the first-ever marketplace for climate outcomes. What powers the marketplace is an engaging consumer app that connects residents to local climate actions. This is an exciting and unique opportunity to design an innovative app that drives peoples real-world actions and reduces their climate anxiety, at a tipping point in public awareness and engagement in climate action',
      },
      {
        descTitle: 'Dashboard Earth Benefits',
        desc: 'We are a small climate tech startup on a big mission to drive citizen engagement in climate change adaptation. If your excited by the challenge of how to turn recycling and using less plastic into a fun mobile app experience, read on. Were looking for a Lead Product Designer to join us at a really important juncture, as we build the first-ever marketplace for climate outcomes. What powers the marketplace is an engaging consumer app that connects residents to local climate actions. This is an exciting and unique opportunity to design an innovative app that drives peoples real-world actions and reduces their climate anxiety, at a tipping point in public awareness and engagement in climate action',
      },
    ],
    skills: [
      'User Interface Design',
      'Figma',
      'Wire Framing',
      'User Experience',
      'Style Guide',
      'Wire Framing',
      'User Experience',
      'Style Guide',
    ],
    rating: 4,
    location: 'Indonesia',
    support: {
      email: 'ops@dashboard.earth.',
      desc: 'Dashboard.earth is an Equal Opportunity Employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. We take a holistic approach to hiring and review every application, even if you do not meet all the qualifications. If you are good at what you do and our mission speaks to you, please apply!',
    },
    info: [
      {
        title: 'Location',
        value: ['New York, USA'],
        icon: PiMapPinLight,
      },
      {
        title: 'Commitment',
        value: ['Full Time', 'Remote'],
        badge: true,
        icon: PiClockLight,
      },
      {
        title: 'Product Type',
        value: ['Management System'],
        icon: PiShoppingBagLight,
      },
      {
        title: 'Salary Range',
        value: ['$60K - $80K'],
        icon: PiCurrencyCircleDollarLight,
      },
      {
        title: 'Start Date',
        value: ['Dec 15, 2023'],
        icon: PiCalendarBlankLight,
      },
      {
        title: 'Industry',
        value: ['IT Department'],
        icon: PiBuildingsLight,
      },
    ],
  },
  {
    type: 'company',
    companyName: 'GreenTech LLC',
    logo: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/job-feed-4.webp',
    jobTitle: 'Senior Product Designer',
    price: '$30 - $35',
    time: '1-3 Month',
    breadcrumb: [
      {
        name: 'Hourly:',
        value: '$50 - $60',
      },
      {
        name: 'Remote Friendly',
      },
      {
        name: 'Est Time:',
        value: '1-3 Month',
      },
    ],
    jobDescription: [
      {
        descTitle: 'Who were looking for',
        desc: 'Looking for an experienced UI/UX designer for an on going project? Your will work with an existing SCRUM team for this project. The SCRUM team is comprised of consultants in EU and Asia, working on a bespoke software development..',
      },
      {
        descTitle: 'Dashboard Earth Benefits',
        desc: 'We are a small climate tech startup on a big mission to drive citizen engagement in climate change adaptation. If your excited by the challenge of how to turn recycling and using less plastic into a fun mobile app experience, read on. Were looking for a Lead Product Designer to join us at a really important juncture, as we build the first-ever marketplace for climate outcomes. What powers the marketplace is an engaging consumer app that connects residents to local climate actions. This is an exciting and unique opportunity to design an innovative app that drives peoples real-world actions and reduces their climate anxiety, at a tipping point in public awareness and engagement in climate action',
      },
      {
        descTitle: 'Dashboard Earth Benefits',
        desc: 'We are a small climate tech startup on a big mission to drive citizen engagement in climate change adaptation. If your excited by the challenge of how to turn recycling and using less plastic into a fun mobile app experience, read on. Were looking for a Lead Product Designer to join us at a really important juncture, as we build the first-ever marketplace for climate outcomes. What powers the marketplace is an engaging consumer app that connects residents to local climate actions. This is an exciting and unique opportunity to design an innovative app that drives peoples real-world actions and reduces their climate anxiety, at a tipping point in public awareness and engagement in climate action',
      },
    ],
    skills: [
      'User Interface Design',
      'Figma',
      'Wire Framing',
      'User Experience',
      'Style Guide',
      'Wire Framing',
      'User Experience',
      'Style Guide',
    ],
    rating: 4,
    location: 'USA',
    support: {
      email: 'ops@dashboard.earth.',
      desc: 'Dashboard.earth is an Equal Opportunity Employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. We take a holistic approach to hiring and review every application, even if you do not meet all the qualifications. If you are good at what you do and our mission speaks to you, please apply!',
    },
    info: [
      {
        title: 'Location',
        value: ['New York, USA'],
        icon: PiMapPinLight,
      },
      {
        title: 'Commitment',
        value: ['Full Time', 'Remote'],
        badge: true,
        icon: PiClockLight,
      },
      {
        title: 'Product Type',
        value: ['Management System'],
        icon: PiShoppingBagLight,
      },
      {
        title: 'Salary Range',
        value: ['$60K - $80K'],
        icon: PiCurrencyCircleDollarLight,
      },
      {
        title: 'Start Date',
        value: ['Dec 15, 2023'],
        icon: PiCalendarBlankLight,
      },
      {
        title: 'Industry',
        value: ['IT Department'],
        icon: PiBuildingsLight,
      },
    ],
  },
];

export type jobFilterTypeProps = {
  type: string;
  available: number;
};

export const jobFeedJobTypes = [
  {
    id: '1',
    name: 'Current Position',
    count: 103,
  },
  {
    id: '2',
    name: 'Full Time',
    count: 38,
  },
  {
    id: '3',
    name: 'Internship',
    count: 50,
  },
  {
    id: '4',
    name: 'Paid Fellowship',
    count: 68,
  },
  {
    id: '5',
    name: 'Part Time',
    count: 50,
  },
  {
    id: '6',
    name: 'Volunteer',
    count: 83,
  },
];

export const jobFeedJobPositions = [
  {
    id: '1',
    name: 'On-site',
    count: 103,
  },
  {
    id: '2',
    name: 'Remote',
    count: 38,
  },
  {
    id: '3',
    name: 'Hybrid',
    count: 50,
  },
];

export const jobFeedJobSpecialties = [
  {
    id: '1',
    name: 'Graphic Designer',
    count: 103,
  },
  {
    id: '2',
    name: 'UI Engineer',
    count: 38,
  },
  {
    id: '3',
    name: 'UX Engineer',
    count: 50,
  },
  {
    id: '4',
    name: 'Web Designer',
    count: 68,
  },
  {
    id: '5',
    name: 'Full Stack Developer',
    count: 50,
  },
  {
    id: '6',
    name: 'Front-end Developer',
    count: 83,
  },
];

export const socialInfos = [
  {
    title: 'Share',
    icon: FacebookIcon,
    href: 'https://facebook.com',
  },
  {
    title: 'Tweet',
    icon: TwitterIcon,
    href: 'https://.x.com',
  },
];

export type InitialStateType = {
  filter: string;
  recommended: [];
  startDate: string;
};

export const initialState: InitialStateType = {
  filter: '',
  recommended: [],
  startDate: '',
};
