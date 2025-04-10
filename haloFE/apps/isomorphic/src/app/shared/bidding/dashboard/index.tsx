import ActiveAuctions from './active-auctions/index';
import Analytics from './analytics';
import BiddingActivity from './bidding-activity';
import FeaturedBid from './featured-bid';
import HotBids from './hot-bids';
import LeadingTeams from './leading-teams';
import PledgesNumber from './pledges-number';
import PopularSellers from './popular-sellers';
import WelcomeBanner from './welcome-banner';

export default function BiddingDashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 @container lg:grid-cols-12">
      <div className="col-span-full flex flex-col gap-6 @5xl:col-span-8 3xl:col-span-9">
        <WelcomeBanner />
        <HotBids />
        <Analytics />
        <PopularSellers />
        <ActiveAuctions />
      </div>
      <div className="col-span-full @container/sidebar @5xl:col-span-4 3xl:col-span-3">
        <div className="grid grid-cols-1 gap-6 @2xl/sidebar:grid-cols-2">
          <FeaturedBid className="order-1" />
          <PledgesNumber className="order-2 @2xl/sidebar:order-3" />
          <LeadingTeams className="order-3 @2xl/sidebar:order-2" />
          <BiddingActivity className="order-4" />
        </div>
      </div>
    </div>
  );
}
