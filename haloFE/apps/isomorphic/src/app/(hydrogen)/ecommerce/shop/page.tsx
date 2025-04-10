import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import FiltersButton from '@/app/shared/filters-button';
import ProductFeed from '@/app/shared/ecommerce/shop/product-feed';
import ShopFilters from '@/app/shared/ecommerce/shop/shop-filters';

const pageHeader = {
  title: 'Shop',
  breadcrumb: [
    {
      name: 'Home',
    },
    {
      href: routes.eCommerce.dashboard,
      name: 'E-Commerce',
    },
    {
      name: 'Shop',
    },
  ],
};

export const metadata = {
  ...metaObject('Shop'),
};

export default function ShopPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <FiltersButton placement="right" modalView={<ShopFilters />} />
      </PageHeader>

      <ProductFeed />
    </>
  );
}
