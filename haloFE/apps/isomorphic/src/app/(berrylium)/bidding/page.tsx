import BiddingDashboard from "@/app/shared/bidding/dashboard";
import { metaObject } from "@/config/site.config";

export const metadata = {
    ...metaObject('Bidding'),
};

export default function BiddingDashboardPage() {
    return <BiddingDashboard />
}