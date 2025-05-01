import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import UsersTable from './users-table';

const pageHeader = {
  title: 'Levels',
  breadcrumb: [
    {
      href: '/',
      name: 'Dashboard',
    },
    {
      name: 'Levels',
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
