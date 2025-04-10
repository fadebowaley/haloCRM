'use client';

import { shipmentData } from '@/data/shipment-data';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TableFooter from '@core/components/table/footer';
import TablePagination from '@core/components/table/pagination';
import Filters from './filters';
import { shipmentListColumns } from './columns';
import { Box } from 'rizzui';
import { exportToCSV } from '@core/utils/export-to-csv';

export type ShipmentListTableDataType = (typeof shipmentData)[number];

export default function ShipmentListTable() {
  const { table, setData } = useTanStackTable<ShipmentListTableDataType>({
    tableData: shipmentData,
    columnConfig: shipmentListColumns,
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
          table.resetRowSelection();
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
          table.resetRowSelection();
        },
      },
      enableColumnResizing: false,
    },
  });

  const selectedData = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  function handleExportData() {
    exportToCSV(
      selectedData,
      'ID,TrackingNumber,CustomerName,CustomerEmail,ShippingDate,Status,Cost,CreatedAt',
      `shipment_data_${selectedData.length}`
    );
  }

  return (
    <Box>
      <Filters table={table} />
      <Table
        table={table}
        variant="modern"
        classNames={{
          container: 'border border-muted rounded-md',
          rowClassName: 'last:border-0',
        }}
      />
      <TableFooter table={table} onExport={handleExportData} />
      <TablePagination table={table} className="py-4" />
    </Box>
  );
}
