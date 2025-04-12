'use client';

import Table from '@core/components/table';
import { productsData } from '@/data/products-data';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { ProductsDataType } from '@/app/shared/ecommerce/dashboard/stock-report';
import { productsListColumns } from '../../ecommerce/product/product-list/columns';

export default function ElegantTable() {
  const { table, setData } = useTanStackTable<ProductsDataType>({
    tableData: productsData,
    columnConfig: productsListColumns,
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
    <Table
      table={table}
      variant="elegant"
      classNames={{ rowClassName: 'last:border-0' }}
    />
  );
}
