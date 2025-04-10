import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';
import TableLayout from '@/app/(hydrogen)/tables/table-layout';
import { metaObject } from '@/config/site.config';
import TableColumnDnd from '@/app/shared/tables/column-dnd';
import TableRowDnd from '@/app/shared/tables/row-dnd';

export const metadata = {
  ...metaObject('Table with DnD features'),
};

const pageHeader = {
  title: 'Table Drag & Drop',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Tables',
    },
    {
      name: 'Drag & Drop',
    },
  ],
};

export default function DnDTablePage() {
  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      data={orderData}
      fileName="order_data"
      header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
    >
      <TableColumnDnd />
      <TableRowDnd />
    </TableLayout>
  );
}
