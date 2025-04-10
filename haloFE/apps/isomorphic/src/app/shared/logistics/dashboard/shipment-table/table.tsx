'use client';

import Filters from './filters';
import Table from '@core/components/table';
import { pendingShipmentsColumns } from './columns';
import { pendingShipments } from '@/data/pending-shipments';
import TablePagination from '@core/components/table/pagination';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';

export type ShipmentTableDataType = (typeof pendingShipments)[number];

export default function ShipmentTable() {
  const { table, setData } = useTanStackTable<ShipmentTableDataType>({
    tableData: pendingShipments,
    columnConfig: pendingShipmentsColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
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
      <Filters table={table} />
      <Table table={table} variant="modern" />
      <TablePagination table={table} className="p-4" />
    </>
  );
}
