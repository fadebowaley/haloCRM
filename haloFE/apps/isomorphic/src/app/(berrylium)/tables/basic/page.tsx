import { Box } from 'rizzui/box';
import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';
import { metaObject } from '@/config/site.config';
import TableLayout from '../table-layout';
import BasicTable from '@/app/shared/tables/basic';
import ModernTable from '@/app/shared/tables/basic/modern';
import MinimalTable from '@/app/shared/tables/basic/minimal';
import ElegantTable from '@/app/shared/tables/basic/elegant';
import RetroTable from '@/app/shared/tables/basic/retro';
import WidgetCard from '@core/components/cards/widget-card';

export const metadata = {
  ...metaObject('Basic Table'),
};

const pageHeader = {
  title: 'Basic Table',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Tables',
    },
    {
      name: 'Basic',
    },
  ],
};

export default function BasicTablePage() {
  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      data={orderData}
      fileName="order_data"
      header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
    >
      <Box className="space-y-8">
        <WidgetCard title="Classic Table" className="space-y-4">
          <BasicTable />
        </WidgetCard>
        <WidgetCard title="Modern Table" className="space-y-4">
          <ModernTable />
        </WidgetCard>
        <WidgetCard title={'Minimal Table'} className="space-y-4">
          <MinimalTable />
        </WidgetCard>
        <WidgetCard title="Elegant Table" className="space-y-4">
          <ElegantTable />
        </WidgetCard>
        <WidgetCard title="Retro Table" className="space-y-4">
          <RetroTable />
        </WidgetCard>
      </Box>
    </TableLayout>
  );
}
