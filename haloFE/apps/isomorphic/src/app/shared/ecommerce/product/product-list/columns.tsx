'use client';

import DeletePopover from '@core/components/delete-popover';
import { getRatings } from '@core/components/table-utils/get-ratings';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import { getStockStatus } from '@core/components/table-utils/get-stock-status';
import { routes } from '@/config/routes';
import { ProductType } from '@/data/products-data';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import AvatarCard from '@core/ui/avatar-card';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from 'rizzui';

const columnHelper = createColumnHelper<ProductType>();

export const productsListColumns = [
  columnHelper.display({
    id: 'select',
    size: 50,
    header: ({ table }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select all rows"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
  }),
  columnHelper.accessor('name', {
    id: 'name',
    size: 300,
    header: 'Product',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.image}
        name={row.original.name}
        description={row.original.category}
        avatarProps={{
          name: row.original.name,
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  }),
  columnHelper.display({
    id: 'sku',
    size: 150,
    header: 'SKU',
    cell: ({ row }) => <Text className="text-sm">SKU-{row.original.sku}</Text>,
  }),
  columnHelper.accessor('stock', {
    id: 'stock',
    size: 200,
    header: 'Stock',
    cell: ({ row }) => getStockStatus(row.original.stock),
  }),
  columnHelper.accessor('price', {
    id: 'price',
    size: 150,
    header: 'Price',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700">${row.original.price}</Text>
    ),
  }),
  columnHelper.display({
    id: 'rating',
    size: 200,
    header: 'Rating',
    cell: ({ row }) => getRatings(row.original.rating),
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 120,
    header: 'Status',
    enableSorting: false,
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
  columnHelper.display({
    id: 'action',
    size: 120,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="end" gap="3" className="pe-4">
        <Tooltip
          size="sm"
          content={'Edit Product'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.ediProduct(row.original.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'Edit Product'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Product'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.productDetails(row.original.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'View Product'}
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the product`}
          description={`Are you sure you want to delete this #${row.original.id} product?`}
          onDelete={() =>
            meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
          }
        />
      </Flex>
    ),
  }),
];
