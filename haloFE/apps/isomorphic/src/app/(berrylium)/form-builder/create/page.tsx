import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import FormBuilder from "../components/FormBuilder/FormBuilder";

export const metadata = {
  ...metaObject('Form Builder'),
};

const pageHeader = {
  title: 'Form Builder',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Form-Builder',
    },
  ],
};

export default function BlankPage() {
  return ( 
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <FormBuilder />
    </>
  );
}
