import { Grid } from 'rizzui/grid';
import { Box } from 'rizzui/box';
import { metaObject } from '@/config/site.config';
import dynamic from 'next/dynamic';

import SalesAnalysis from '@/app/shared/store-analytics/dashboard/sales-analysis';
import StoreAnalyticsStats from '@/app/shared/store-analytics/dashboard/store-analytics-stats';

// dynamic imports
const Audience = dynamic(
  () => import('@/app/shared/store-analytics/dashboard/audience')
);
const Visitor = dynamic(
  () => import('@/app/shared/store-analytics/dashboard/visitor')
);

const CustomersDistribution = dynamic(
  () => import('@/app/shared/store-analytics/dashboard/customers-distribution')
);

const ReportAnalysis = dynamic(
  () =>
    import(
      '@/app/shared/store-analytics/dashboard/report-analytics/report-analytics'
    )
);
const StoreBalance = dynamic(
  () => import('@/app/shared/store-analytics/dashboard/store-balance')
);
const TopSellingProducts = dynamic(
  () => import('@/app/shared/store-analytics/dashboard/top-selling-products')
);

export const metadata = {
  ...metaObject('Store Analytics'),
};

export default function StoreAnalyticsPage() {
  return (
    <Box className="@container/sa">
      <Grid className="grid-cols-1 gap-6 @3xl/sa:grid-cols-12 @7xl/sa:gap-7 3xl:gap-8">
        <StoreAnalyticsStats className="@3xl/sa:col-span-full" />
        <SalesAnalysis className="col-span-full" />
        <Visitor className="@3xl/sa:col-span-6 @7xl/sa:col-span-4" />
        <Audience className="col-span-full @3xl/sa:col-span-6 @7xl/sa:col-span-8" />
        <ReportAnalysis className="@3xl/sa:col-span-full @7xl/sa:col-span-8" />
        <TopSellingProducts className="@3xl/sa:col-span-6 @7xl/sa:col-span-4" />
        <StoreBalance className="@3xl/sa:col-span-6 @7xl/sa:col-span-4" />
        <CustomersDistribution className="@3xl/sa:col-span-full @7xl/sa:col-span-8" />
      </Grid>
    </Box>
  );
}
