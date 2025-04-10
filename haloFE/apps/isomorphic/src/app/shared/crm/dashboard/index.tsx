import { Box } from 'rizzui/box';
import CRMStats from './crm-stats';
import TeamActivity from './team-activity';
import CustomerList from './customer-list';
import RevenueGrowth from './revenue-growth';
import SalesAnalytics from './sales-analytics';
import RatingAnalytics from './rating-analytics';
import ReportAnalytics from './report-analytics';
import SalesPerformance from './sales-performance';
import CustomerByCountries from './customer-by-countries';
import CustomerGrowthSummary from './customer-growth-summary';
import CustomerAreaByPlatform from './customer-area-by-platform';

export default function CrmDashboard() {
  return (
    <Box className="@container/crm">
      <Box className="grid grid-cols-1 gap-6 @3xl/crm:grid-cols-12 @7xl/crm:gap-7 3xl:gap-8">
        <CRMStats className="@3xl/crm:col-span-full" />
        <CustomerGrowthSummary className="@3xl/crm:col-span-full @7xl/crm:col-span-8 dark:bg-[#181818]" />
        <SalesAnalytics className="@3xl/crm:col-span-6 @7xl/crm:col-span-4 dark:bg-[#181818]" />
        <CustomerAreaByPlatform className="@3xl/crm:col-span-6 @7xl/crm:col-span-4 dark:bg-[#181818]" />
        <CustomerList className="@3xl/crm:col-span-full @7xl/crm:col-span-8 dark:bg-[#181818]" />
        <CustomerByCountries className="@3xl/crm:col-span-full @7xl/crm:col-span-8 dark:bg-[#181818]" />
        <TeamActivity className="@3xl/crm:col-span-6 @7xl/crm:col-span-4 dark:bg-[#181818]" />
        <SalesPerformance className="@3xl/crm:col-span-6 @7xl/crm:col-span-4 dark:bg-[#181818]" />
        <RevenueGrowth className="@3xl/crm:col-span-full @7xl/crm:col-span-8 dark:bg-[#181818]" />
        <ReportAnalytics className="@3xl/crm:col-span-full @5xl/crm:col-span-8 dark:bg-[#181818]" />
        <RatingAnalytics className="@3xl/crm:col-span-full @5xl/crm:col-span-4 dark:bg-[#181818]" />
      </Box>
    </Box>
  );
}