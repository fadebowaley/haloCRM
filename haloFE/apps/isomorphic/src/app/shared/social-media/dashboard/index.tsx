import SocialMediaStats from './social-media-stats';
import OverallFollowers from './overall-followers';
import TrafficAnalytics from './traffic-analytics';
import GenderStatistics from './gender-statistics';
import RecentActivities from './recent-activities';
import FlowOnDevices from './flow-on-devices';
import ScheduledPost from './scheduled-post';
import ProfileVisits from './profile-visits';
import TopCountries from './top-countries';
import AccountCard from './account-card';
import PostSummary from './post-summary';
import EngageMents from './engagements';

export default function SocialMediaDashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 @container @7xl:grid-rows-12 sm:gap-6 3xl:gap-8">
      <SocialMediaStats className="order-1 col-span-full @7xl:col-span-8 @7xl:row-span-1" />
      <AccountCard className="order-2 col-span-full @4xl:order-3 @4xl:col-span-4 @7xl:order-2 @7xl:row-span-2" />
      <OverallFollowers className="order-3 col-span-full @4xl:order-2 @4xl:col-span-8 @7xl:order-3 @7xl:row-span-3" />
      <GenderStatistics className="order-4 col-span-full @2xl:col-span-6 @7xl:order-5 @7xl:col-span-4 @7xl:row-span-2" />
      <ProfileVisits className="order-5 col-span-full @2xl:col-span-6 @7xl:col-span-4 @7xl:row-span-2" />
      <FlowOnDevices className="order-6 col-span-full @2xl:col-span-6 @7xl:order-7 @7xl:col-span-4 @7xl:row-span-1" />
      <TrafficAnalytics className="order-7 col-span-full @2xl:col-span-6 @7xl:order-8 @7xl:col-span-4 @7xl:row-span-1" />
      <PostSummary className="order-8 col-span-full @7xl:order-10 @7xl:col-span-8 @7xl:row-span-3" />
      <EngageMents className="order-9 col-span-full @7xl:order-11 @7xl:col-span-8 @7xl:row-span-2" />
      <TopCountries className="order-10 col-span-full @7xl:order-4 @7xl:col-span-4 @7xl:row-span-4" />
      <RecentActivities className="order-11 col-span-full @4xl:col-span-6 @7xl:order-9 @7xl:col-span-4 @7xl:row-span-3" />
      <ScheduledPost className="order-12 col-span-full @4xl:col-span-6 @7xl:order-12 @7xl:col-span-4 @7xl:col-start-9 @7xl:col-end-13 @7xl:row-span-3 @7xl:row-start-10 @7xl:row-end-13" />
    </div>
  );
}
