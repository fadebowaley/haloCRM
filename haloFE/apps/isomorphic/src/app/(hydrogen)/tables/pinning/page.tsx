import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';
import TableLayout from '@/app/(hydrogen)/tables/table-layout';
import { metaObject } from '@/config/site.config';
import TableColumnPinning from '@/app/shared/tables/column-pinning';
import TableRowPinning from '@/app/shared/tables/row-pinning';

export const metadata = {
  ...metaObject('Table with Pinning features'),
};

const pageHeader = {
  title: 'Table Pinning',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Tables',
    },
    {
      name: 'Pinning',
    },
  ],
};

export default function PinningTablePage() {
  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      data={orderData}
      fileName="order_data"
      header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
    >
      <TableColumnPinning />
      <TableRowPinning />
    </TableLayout>
  );
}
