import AvatarCard from '@core/ui/avatar-card';
import RatingBar from '@core/components/rating-bar';
import { createColumnHelper } from '@tanstack/react-table';
import { SellerDataType } from '.';
import { formatNumberWithCommas } from '@core/utils/format-number';
import { toCurrency } from '@core/utils/to-currency';
import Rating from '@core/components/rating';
import Link from 'next/link';

const columnHelper = createColumnHelper<SellerDataType>();

export const defaultColumns = [
    columnHelper.accessor('customerName', {
        size: 280,
        header: 'Name',
        cell: ({ row: { original } }) => (
            <AvatarCard
                src={original.image}
                name={original.customerName}
                description={`ID ${original.id}`}
                nameClassName="whitespace-nowrap"
                avatarProps={{
                    rounded: 'sm',
                    name: original.customerName,
                    className: '!bg-transparent border border-muted overflow-hidden size-12',
                }}
            />
        ),
    }),
    columnHelper.accessor('deliveries', {
        size: 160,
        header: 'Deliveries',
        cell: ({ row: { original } }) => (
            <div className="flex flex-col gap-1">
                <span className="block text-sm">Deliveries</span>
                <span className="block text-sm font-semibold text-gray-900 dark:text-gray-700">
                    {formatNumberWithCommas(original.deliveries)}
                </span>
            </div>
        ),
    }),
    columnHelper.accessor('earnings', {
        size: 120,
        header: 'Earnings',
        cell: ({ row: { original } }) => (
            <div className="flex flex-col gap-1">
                <span className="block text-sm">Earnings</span>
                <span className="block text-sm font-semibold text-gray-900 dark:text-gray-700">
                    {toCurrency(original.earnings, true)}
                </span>
            </div>
        ),
    }),
    columnHelper.accessor('rating', {
        size: 120,
        header: 'Rating',
        cell: ({ row: { original } }) => (
            <div className="flex flex-col gap-1">
                <span className="block text-sm">Ratings</span>
                <Rating
                    rating={[original.rating]}
                    className="items-start"
                    disableText
                />
            </div>
        ),
    }),
    columnHelper.accessor('id', {
        size: 120,
        header: 'Action',
        cell: ({ row: { original } }) => (
            <div className="flex flex-col gap-1">
                <span className="block text-sm">Action</span>
                <Link
                    href={'/'}
                    className="text-sm font-medium text-gray-900 underline"
                >
                    View Details
                </Link>
            </div>
        ),
    }),
];
