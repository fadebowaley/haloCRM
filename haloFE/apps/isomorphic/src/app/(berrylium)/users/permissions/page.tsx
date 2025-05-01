import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import UsersTable from './permissions-table';
import RolesGrid from '@/app/shared/roles-permissions/roles-grid';
import CreateRole from '@/app/shared/roles-permissions/create-role';

const pageHeader = {
  title: 'Permissions',
  breadcrumb: [
    {
      href: '/',
      name: 'Dashboard',
    },
    {
      name: 'Permissions Table',
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
