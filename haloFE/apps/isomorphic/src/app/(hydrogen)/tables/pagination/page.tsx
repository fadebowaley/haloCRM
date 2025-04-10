import { routes } from '@/config/routes';
import { productsData } from '@/data/products-data';
import TableLayout from '@/app/(hydrogen)/tables/table-layout';
import { metaObject } from '@/config/site.config';
import ProductsTable from '@/app/shared/ecommerce/product/product-list/table';
import WidgetCard from '@core/components/cards/widget-card';

export const metadata = {
  ...metaObject('Paginated Table'),
};

const pageHeader = {
  title: 'Pagination Table',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Tables',
    },
    {
      name: 'Pagination',
    },
  ],
};

export default function PaginationTablePage() {
  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      data={productsData}
      fileName="product_data"
      header="ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating"
    >
      <WidgetCard
        title="Pagination Table"
        className="p-0 lg:p-0"
        headerClassName="mb-4 px-5 pt-5 lg:px-7 lg:pt-7"
      >
        <ProductsTable
          pageSize={7}
          hideFilters={true}
          hideFooter={true}
          classNames={{}}
          paginationClassName="px-4"
        />
      </WidgetCard>
    </TableLayout>
  );
}
