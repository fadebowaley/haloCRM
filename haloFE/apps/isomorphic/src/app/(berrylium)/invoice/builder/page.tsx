'use client';

import PageHeader from '@/app/shared/page-header';
import PrintButton from '@/app/shared/print-button';
import { routes } from '@/config/routes';
import InvoiceBuilder from '@core/components/invoice-builder';
import { useReactToPrint } from 'react-to-print';
import { RefObject, useRef } from 'react';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import { Button } from 'rizzui';

const pageHeader = {
  title: 'Invoice Builder',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.invoice.home,
      name: 'Invoice',
    },
    {
      name: 'Builder',
    },
  ],
};

export default function InvoiceBuilderPage() {
  const printRef = useRef<Element>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef as RefObject<Element>,
  })

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <PrintButton onClick={() => handlePrint()} />
          <Button className="w-full @lg:w-auto">
            <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
            Download
          </Button>
        </div>
      </PageHeader>
      <InvoiceBuilder printRef={printRef} />
    </>
  );
}
