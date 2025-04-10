import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';
import TableLayout from '@/app/(hydrogen)/tables/table-layout';
import { metaObject } from '@/config/site.config';
import RetroTable from '@/app/shared/tables/basic/retro';
import WidgetCard from '@core/components/cards/widget-card';

export const metadata = {
  ...metaObject('Table with search'),
};

const pageHeader = {
  title: 'Search Table',
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

export default function SearchTablePage() {
  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      data={orderData}
      fileName="order_data"
      header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
    >
      <WidgetCard>
        <RetroTable tableHeader={true} searchAble={true} pagination={true} />
      </WidgetCard>
    </TableLayout>
  );
}
