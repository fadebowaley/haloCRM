import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';
import TableLayout from '@/app/(hydrogen)/tables/table-layout';
import { metaObject } from '@/config/site.config';
import TableResizable from '@/app/shared/tables/resizable';

export const metadata = {
  ...metaObject('Table with Resizable columns'),
};

const pageHeader = {
  title: 'Resizable Table',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Tables',
    },
    {
      name: 'Resizable',
    },
  ],
};

export default function ResizableTablePage() {
  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      data={orderData}
      fileName="order_data"
      header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
    >
      <TableResizable />
    </TableLayout>
  );
}
