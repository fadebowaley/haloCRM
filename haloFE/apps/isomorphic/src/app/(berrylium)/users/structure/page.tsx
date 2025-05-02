import PageHeader from '@/app/shared/page-header';
import UsersTable from './users-table';

const pageHeader = {
  title: 'Structure',
  breadcrumb: [
    {
      href: '/',
      name: 'Dashboard',
    },
    {
      name: 'Structure',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      </PageHeader>
      <UsersTable />
    </>
  );
}
