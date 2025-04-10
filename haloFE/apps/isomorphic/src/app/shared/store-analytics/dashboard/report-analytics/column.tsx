'use client';

import {
  ReportAnalyticsProduct,
  ReportAnalyticsProductItemKey,
} from '@/data/store-analytics-dashboard-data';
import DribbleIcon from '@core/components/icons/dribble';
import FigmaIcon from '@core/components/icons/figma';
import PlayStoreIcon from '@core/components/icons/play-store';
import RippleIcon from '@core/components/icons/ripple';
import SnapchatIcon from '@core/components/icons/snapchat';
import { getOnlyRatings } from '@core/components/table-utils/get-ratings';
import { toCurrency } from '@core/utils/to-currency';
import { createColumnHelper } from '@tanstack/react-table';
import { ReactElement } from 'react';
import { Box, Flex, Text } from 'rizzui';

const columnHelper = createColumnHelper<ReportAnalyticsProduct>();

export const columns = [
  columnHelper.accessor('product', {
    id: 'name',
    size: 150,
    header: 'Product',
    enableSorting: false,
    cell: ({ row }) => (
      <Flex gap="3" align="center">
        <ProductIcon data={row.original.product.key} />
        <Text className="font-semibold text-gray-900">
          {row.original.product.title}
        </Text>
      </Flex>
    ),
  }),
  columnHelper.accessor('soldAmount', {
    id: 'soldAmount',
    size: 150,
    header: 'Sold Amount',
    enableSorting: false,
    cell: ({ row }) => <>{toCurrency(row.original.soldAmount)}</>,
  }),
  columnHelper.accessor('unitPrice', {
    id: 'unitPrice',
    size: 150,
    header: 'Unit Price',
    enableSorting: false,
    cell: ({ row }) => <>{toCurrency(row.original.unitPrice)}</>,
  }),
  columnHelper.accessor('revenue', {
    id: 'revenue',
    size: 150,
    header: 'Revenue',
    enableSorting: false,
    cell: ({ row }) => <>{toCurrency(row.original.revenue)}</>,
  }),
  columnHelper.display({
    id: 'review',
    size: 120,
    header: 'Rating',
    cell: ({ row }) => (
      <Box className="space-y-1">
        <Text as="span" className="text-xs text-gray-900">
          {row.original.rating.type}
        </Text>
        {getOnlyRatings(row.original.rating.values)}
      </Box>
    ),
  }),
];

const ICONS: Record<ReportAnalyticsProductItemKey, ReactElement> = {
  dribbble: <DribbleIcon className="h-auto w-5" />,
  snapchat: <SnapchatIcon className="h-auto w-6" />,
  figma: <FigmaIcon className="h-auto w-4" />,
  ripple: <RippleIcon className="h-auto w-5" />,
  playstore: <PlayStoreIcon className="h-auto w-5" />,
};

function ProductIcon({ data }: { data: ReportAnalyticsProductItemKey }) {
  return (
    <Flex
      className="size-10 rounded border bg-gray-100"
      align="center"
      justify="center"
    >
      {ICONS[data]}
    </Flex>
  );
}
