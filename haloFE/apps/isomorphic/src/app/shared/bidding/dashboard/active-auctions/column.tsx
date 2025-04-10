'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { ActiveAuctionType } from '.';
import { toCurrency } from '@core/utils/to-currency';
import Link from 'next/link';
import { Checkbox } from 'rizzui';
import dayjs from 'dayjs';
import Image from 'next/image';

function timeDifferenceFromNow(date: Date) {
    const now = dayjs();
    const target = dayjs(date);

    const diffInSeconds = target.diff(now, 'second'); // Difference in seconds
    const isPast = diffInSeconds < 0;

    if (isPast) {
        return 'expired';
    }

    const absDiffInSeconds = Math.abs(diffInSeconds);
    const hours = Math.floor(absDiffInSeconds / 3600);
    const minutes = Math.floor((absDiffInSeconds % 3600) / 60);
    const seconds = absDiffInSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
}

const columnHelper = createColumnHelper<ActiveAuctionType>();

export const activeAuctionsColumns = [
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
        size: 250,
        header: 'Product',
        enableSorting: false,
        cell: ({ row: { original } }) => (
            <div className="flex items-center gap-4">
                <div className="relative size-12 rounded-lg overflow-hidden">
                    <Image
                        src={original.image}
                        alt={original.name}
                        className="object-cover"
                        fill
                    />
                </div>
                <div className="flex self-stretch justify-between flex-col">
                    <Link href="/" className='block text-sm font-semibold text-gray-900 dark:text-gray-700'>Surreal Cityscape Art</Link>
                    <span>Gina Vanleuven</span>
                </div>
            </div>
        ),
    }),
    columnHelper.accessor('openPrice', {
        size: 120,
        header: 'Open Price',
        cell: ({ row: { original } }) => (
            <span className="text-sm font-medium text-gray-900 dark:text-gray-700">
                {toCurrency(original.openPrice, false)}
            </span>
        ),
    }),
    columnHelper.accessor('yourPrice', {
        size: 120,
        header: 'Your Price',
        cell: ({ row: { original } }) => (
            <span className="text-sm font-medium text-gray-900 dark:text-gray-700">
                {toCurrency(original.openPrice, false)}
            </span>
        ),
    }),
    columnHelper.accessor('recentOfferPrice', {
        size: 130,
        header: 'Recent Offer',
        cell: ({ row: { original } }) => (
            <span className="text-sm font-medium text-gray-900 dark:text-gray-700">
                {toCurrency(original.recentOfferPrice, false)}
            </span>
        ),
    }),
    columnHelper.accessor('endTime', {
        size: 150,
        header: 'Time Left',
        enableSorting: false,
        cell: ({ row: { original } }) => (
            <span>{timeDifferenceFromNow(original.endTime)}</span>
        ),
    }),
    columnHelper.accessor('id', {
        size: 130,
        header: 'Action',
        cell: ({ row: { original } }) => (
            <Link href={'/'} className="text-sm font-medium text-gray-900 underline">
                View Details
            </Link>
        ),
    }),
];
