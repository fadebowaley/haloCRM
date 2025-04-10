"use client";

import { Button, Text } from "rizzui";
import { Table as ReactTableType } from "@tanstack/react-table";

interface TableToolbarProps<TData extends Record<string, any>> {
  table: ReactTableType<TData>;
  showDownloadButton?: boolean;
  onExport?: () => void;
}

export default function TableFooter<TData extends Record<string, any>>({
  table,
  showDownloadButton = true,
  onExport,
}: TableToolbarProps<TData>) {
  const checkedItems = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);
  const meta = table.options.meta;

  if (checkedItems.length === 0) {
    return null;
  }

  return (
    <div className="sticky bottom-0 left-0 z-10 mt-2.5 flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-0 px-5 py-3.5 text-gray-900 shadow-sm dark:border-gray-300 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
      <div>
        <Text as="strong">{checkedItems.length}</Text>
        {checkedItems.length >= 2 ? " Categories" : " Category"} selected{" "}
        <Button
          size="sm"
          variant="text"
          className="underline"
          color="danger"
          onClick={() => meta?.handleMultipleDelete?.(checkedItems)}
        >
          Delete Them
        </Button>
      </div>
      {showDownloadButton && (
        <Button
          size="sm"
          onClick={onExport}
          className="dark:bg-gray-300 dark:text-gray-800"
        >
          Download {checkedItems.length}{" "}
          {checkedItems.length > 1 ? "Items" : "Item"}
        </Button>
      )}
    </div>
  );
}
