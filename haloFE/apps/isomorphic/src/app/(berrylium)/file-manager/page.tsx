import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import FileStats from '@/app/shared/file/manager/file-stats';
import { metaObject } from '@/config/site.config';
import UploadButton from '@/app/shared/upload-button';
import PageLayout from '@/app/(berrylium)/file-manager/page-layout';
import FileUpload from '@/app/shared/file-upload';

export const metadata = {
  ...metaObject('File Manager'),
};

const pageHeader = {
  title: 'File Manager',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.file.dashboard,
      name: 'File Manager',
    },
    {
      name: 'List',
    },
  ],
};

export default function FileListPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <UploadButton modalView={<FileUpload />} />
      </PageHeader>

      <FileStats className="mb-6 @5xl:mb-8 @7xl:mb-11" />
      <PageLayout />
    </>
  );
}
