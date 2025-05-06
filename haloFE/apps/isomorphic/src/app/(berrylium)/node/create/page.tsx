'use client';

import PageHeader from '@/app/shared/page-header';
import UsersTable from '@/app/shared/roles-permissions/users-table';
import ImportButton from '@/app/shared/import-button';
import ExportButton from '@/app/shared/export-button';

const pageHeader = {
  title: 'Nodes',
  breadcrumb: [
    {
      href: '/',
      name: 'Dashboard',
    },
    {
      name: 'Create Node',
    },
  ],
};

type ListPageProps = {
  data: unknown[];
  header: string;
  fileName: string;
};

export default function ListPage({
  data,
  header,
  fileName,
}: React.PropsWithChildren<ListPageProps>) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton data={data ?? []} fileName={fileName} header={header} />
          <ImportButton title="Bulk Import User" buttonLabel="Bulk Import Nodes" />
        </div>
      </PageHeader>
      <UsersTable />
    </>
  );
}
