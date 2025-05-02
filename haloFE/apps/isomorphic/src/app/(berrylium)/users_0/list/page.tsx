import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import UsersTable from './users-table/index'

export const metadata = {
  ...metaObject('Blank Page'),
};

const pageHeader = {
  title: 'User Page',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'User',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <UsersTable/>
    </>
  );
}
