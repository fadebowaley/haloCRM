'use client';

import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import StructureDataForm from './StructureDataForm';

const pageHeader = {
  title: 'Structure',
  breadcrumb: [
    {
      href: routes.file.dashboard,
      name: 'Home',
    },
    {
        name: 'Network',
      },
    {
      name: 'Structure',
    },
  ],
};

export default function StructurePage() {
  
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      </PageHeader>
      <StructureDataForm />
    </>
  );
}
