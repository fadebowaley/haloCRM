import AvatarCard from '@core/ui/avatar-card';
import RatingBar from '@core/components/rating-bar';
import { createColumnHelper } from '@tanstack/react-table';
import { CustomerListDataType } from '.';

const columnHelper = createColumnHelper<CustomerListDataType>();

export const defaultColumns = [
  columnHelper.accessor('image', {
    size: 280,
    header: 'Post Content',
    cell: ({ row: { original } }) => (
      <AvatarCard
        src={original.image}
        name={original.customerName}
        nameClassName="whitespace-nowrap"
        avatarProps={{
          rounded: 'sm',
          name: original.customerName,
          className: '!bg-transparent border border-muted overflow-hidden',
        }}
      />
    ),
  }),
  columnHelper.accessor('salesRepresentative', {
    size: 160,
    header: 'Sales Representative',
  }),
  columnHelper.accessor('type', {
    size: 120,
    header: 'Type',
  }),
  columnHelper.accessor('projectValue', {
    size: 120,
    header: 'Project Value',
  }),
  columnHelper.accessor('rating', {
    size: 120,
    header: 'Rating',
    cell: ({ row: { original } }) => (
      <RatingBar ratingCount={original.rating} />
    ),
  }),
];
