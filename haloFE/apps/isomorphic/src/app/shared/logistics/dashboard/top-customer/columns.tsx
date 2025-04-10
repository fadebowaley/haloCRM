'use client';

import Image from 'next/image';
import { Text, Checkbox, Flex } from 'rizzui';
import { HeaderCell } from '@core/components/legacy-table';
import { toCurrency } from '@core/utils/to-currency';
import AvatarCard from '@core/ui/avatar-card';
import { createColumnHelper } from '@tanstack/react-table';
import { TopCustomersDataType } from '.';

type Columns = {
  sortConfig?: any;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
};

const columnHelper = createColumnHelper<TopCustomersDataType>();

export const topCustomersColumns = [
  columnHelper.display({
    id: 'checked',
    size: 70,
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="ps-4"
        />
      );
    },
  }),
  columnHelper.display({
    id: 'id',
    size: 80,
    header: 'ID',
    cell: ({ row }) => {
      return (
        <span className="font-medium text-gray-700">{row.original.id}</span>
      );
    },
  }),
  columnHelper.accessor('user.name', {
    id: 'user',
    size: 250,
    header: 'Customer',
    enableSorting: false,
    cell: ({ row }) => {
      const { name, avatar, email } = row.original.user;
      return (
        <AvatarCard
          src={avatar}
          name={name}
          description={email?.toLowerCase()}
          avatarProps={{
            name,
            size: 'sm',
          }}
        />
      );
    },
  }),
  columnHelper.display({
    id: 'country',
    size: 220,
    header: 'Country',
    cell: ({ row }) => {
      const { name, code } = row.original.country;
      return (
        <Flex align="center" gap="2">
          <figure className="relative size-10">
            <Image
              fill
              quality={100}
              alt={`${name} Flag icon`}
              className="object-contain"
              src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
              sizes="(max-width: 768px) 100vw"
            />
          </figure>
          <span>{name}</span>
        </Flex>
      );
    },
  }),
  columnHelper.accessor('cost', {
    id: 'cost',
    size: 180,
    header: 'Total Cost',
    cell: ({ row }) => (
      <Text className="w-full pe-4 text-end font-medium text-gray-700 dark:text-gray-600">
        {toCurrency(row.original.cost)}
      </Text>
    ),
  }),
];
