import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import HeaderAction from '../header-action';
import { metaObject } from '@/config/site.config';
import SnippetsTable from '@/app/shared/support/snippets/table';

export const metadata = {
  ...metaObject('Templates'),
};

const pageHeader = {
  title: 'Support Templates',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.support.dashboard,
      name: 'Support',
    },
    {
      name: 'Templates',
    },
  ],
};

export default function SupportTemplatesPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <HeaderAction title="template" />
      </PageHeader>
      <SnippetsTable />
    </>
  );
}
