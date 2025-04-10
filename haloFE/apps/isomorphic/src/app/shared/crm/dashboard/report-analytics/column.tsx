import AvatarCard from '@core/ui/avatar-card';
import { ReportAnalyticsDataType } from '.';
import Rating from '@core/components/rating';
import { toCurrency } from '@core/utils/to-currency';
import { formatNumber } from '@core/utils/format-number';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<ReportAnalyticsDataType>();

export const defaultColumns = [
  columnHelper.accessor('image', {
    size: 200,
    header: 'Post Content',
    cell: ({ row: { original } }) => (
      <AvatarCard
        src={original.image}
        name={original.name}
        nameClassName="line-clamp-1"
        avatarProps={{
          rounded: 'sm',
          name: original.name,
          className: '!bg-transparent border border-muted overflow-hidden',
        }}
      />
    ),
  }),
  columnHelper.accessor('soldAmount', {
    size: 160,
    header: 'Sold Amount',
    cell: ({ row: { original } }) => toCurrency(original.soldAmount),
  }),
  columnHelper.accessor('unitPrice', {
    size: 120,
    header: 'Unit Price',
    cell: ({ row: { original } }) => toCurrency(original.unitPrice),
  }),
  columnHelper.accessor('revenue', {
    size: 120,
    header: 'Revenue',
    cell: ({ row: { original } }) => <>${formatNumber(original.revenue)}</>,
  }),
  columnHelper.accessor('rating', {
    size: 120,
    header: () => (
      <span className="block w-full whitespace-nowrap text-end">Rating</span>
    ),
    cell: ({ row: { original } }) => <Rating rating={[original.rating]} />,
  }),
];
