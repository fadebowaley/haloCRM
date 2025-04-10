'use client';

import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import { PiStarFill } from 'react-icons/pi';
import { Avatar, Button, Checkbox, Text, Title } from 'rizzui';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import { ReviewTableMoreAction } from '@core/components/table-utils/review-table-more';
import { ReviewsDataType } from './table';

const columnHelper = createColumnHelper<ReviewsDataType>();

export const productsReviewsColumns = [
  columnHelper.display({
    id: 'checked',
    size: 50,
    cell: ({ row }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
  }),
  columnHelper.display({
    id: 'id',
    size: 110,
    header: 'Id',
    cell: ({ row }) => (
      <Text className="text-sm text-gray-500">RW-{row.original.id}</Text>
    ),
  }),
  columnHelper.accessor('customer.name', {
    id: 'customer',
    size: 350,
    header: 'Customer Review',
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center">
        <Avatar
          name={row.original.customer.name}
          src={row.original.customer.avatar}
        />
        <div className="ms-3 pe-4">
          <Title as="h6" className="mb-1 !text-sm font-medium">
            <span className="font-normal text-gray-500">By</span>{' '}
            {row.original.customer.name}
          </Title>
          <Text className="leading-relaxed text-gray-500">
            {row.original.review}
          </Text>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('rating', {
    id: 'rating',
    size: 120,
    header: 'Rating',
    cell: ({ row }) => (
      <Button
        size="sm"
        rounded="pill"
        variant="outline"
        className="cursor-default gap-1 text-sm active:enabled:translate-y-0"
      >
        {row.original.rating}
        <PiStarFill className="-mt-px w-4 fill-orange text-orange" />
      </Button>
    ),
  }),
  columnHelper.accessor('product.name', {
    id: 'product',
    size: 300,
    header: 'Product',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.product.image}
        name={row.original.product.name}
        description={row.original.product.category}
        avatarProps={{
          name: row.original.product.name,
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 150,
    header: 'Created',
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 120,
    header: 'Status',
    cell: ({ row }) => getStatusBadge(row.original.status!),
  }),
  columnHelper.display({
    id: 'action',
    size: 50,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <ReviewTableMoreAction
        onDelete={() => meta?.handleDeleteRow?.(row.original)}
      />
    ),
  }),
];
