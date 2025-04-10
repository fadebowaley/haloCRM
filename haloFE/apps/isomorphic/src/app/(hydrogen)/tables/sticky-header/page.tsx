import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';
import TableLayout from '@/app/(hydrogen)/tables/table-layout';
import { metaObject } from '@/config/site.config';
import BasicTable from '@/app/shared/tables/basic';
import WidgetCard from '@core/components/cards/widget-card';

export const metadata = {
  ...metaObject('Table with Sticky Header'),
};

const pageHeader = {
  title: 'Sticky Table',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Tables',
    },
    {
      name: 'Search',
    },
  ],
};

export default function StickyTablePage() {
  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      data={orderData}
      fileName="order_data"
      header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
    >
      <WidgetCard title="Sticky Header" className="space-y-4">
        <BasicTable stickyHeader={true} variants="minimal" />
      </WidgetCard>
    </TableLayout>
  );
}
