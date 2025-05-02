'use client';

import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import LevelDataForm from './LevelDataForm';

const pageHeader = {
  title: 'Level',
  breadcrumb: [
    {
      href: routes.file.dashboard,
      name: 'Home',
    },
    {
        name: 'Network',
    },
    {
      name: 'level',
    },
  ],
};

export default function LevelPage() {
  
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      </PageHeader>
      <LevelDataForm />
    </>
  );
}
