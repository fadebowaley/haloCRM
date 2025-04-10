'use client';

import { loggedInDeviceData } from '@/data/logged-in-device';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { loggedInDeviceColumns } from './columns';
import TablePagination from '@core/components/table/pagination';
import TableFooter from '@core/components/table/footer';
import { exportToCSV } from '@core/utils/export-to-csv';

export type LoggedInDevicesDataType = (typeof loggedInDeviceData)[number];

export default function LoggedInDevices({ className }: { className?: string }) {
  const { table, setData } = useTanStackTable<LoggedInDevicesDataType>({
    tableData: loggedInDeviceData,
    columnConfig: loggedInDeviceColumns,
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
      'ID,Name,Email,Status,Teams',
      `logged_in_devices_data_${selectedData.length}`
    );
  }

  return (
    <div className={className}>
      <Table table={table} variant="modern" />
      <TableFooter table={table} onExport={handleExportData} />
      <TablePagination table={table} className="mt-4" />
    </div>
  );
}
