'use client';

import { invoiceData } from '@/data/invoice-data';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { invoiceListColumns } from '../../invoice/invoice-list/columns';
import { InvoiceTableDataType } from '../../invoice/invoice-list/table';

export default function MinimalTable() {
  const { table, setData } = useTanStackTable<InvoiceTableDataType>({
    tableData: invoiceData,
    columnConfig: invoiceListColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 7,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
      },
      enableColumnResizing: false,
    },
  });

  return (
    <>
      <Table table={table} variant="minimal" />;
    </>
  );
}
