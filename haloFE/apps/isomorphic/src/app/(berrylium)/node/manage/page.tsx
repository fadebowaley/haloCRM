'use client';

import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import NodeDataForm from './NodeDataForm';

const pageHeader = {
  title: 'Node',
  breadcrumb: [
    {
      href: routes.file.dashboard,
      name: 'Home',
    },
    {
      name: 'Network',
    },
    {
      name: 'Node',
    },
  ],
};

export default function NodePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <NodeDataForm />
    </>
  );
}
