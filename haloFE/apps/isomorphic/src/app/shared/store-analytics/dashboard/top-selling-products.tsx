'use client';

import WidgetCard from '@core/components/cards/widget-card';
import DribbleIcon from '@core/components/icons/dribble';
import FigmaIcon from '@core/components/icons/figma';
import PlayStoreIcon from '@core/components/icons/play-store';
import RippleIcon from '@core/components/icons/ripple';
import Snapchat from '@core/components/icons/snapchat';
import TelegramIcon from '@core/components/icons/telegram';
import cn from '@core/utils/class-names';
import { ReactElement } from 'react';
import { Box, Flex, Text } from 'rizzui';

type Product = {
  icon: ReactElement;
  title: string;
  date: string;
  price: number;
};
const products: Product[] = [
  {
    icon: <DribbleIcon className="h-auto w-7" />,
    title: 'Dribbble App',
    date: '18 Jul . 12:30PM',
    price: 72.59,
  },
  {
    icon: <Snapchat className="h-auto w-7" />,
    title: 'Snapchat',
    date: '18 Jul . 12:30PM',
    price: 72.59,
  },
  {
    icon: <FigmaIcon className="h-auto w-7 scale-[.8]" />,
    title: 'Figma App',
    date: '18 Jul . 12:30PM',
    price: 72.59,
  },
  {
    icon: <PlayStoreIcon className="h-auto w-7 scale-90" />,
    title: 'Google Play Store',
    date: '18 Jul . 12:30PM',
    price: 72.59,
  },
  {
    icon: <RippleIcon className="h-auto w-7 scale-90" />,
    title: 'Ripple',
    date: '18 Jul . 12:30PM',
    price: 72.59,
  },
  {
    icon: <TelegramIcon className="h-auto w-7 scale-90" />,
    title: 'Telegram',
    date: '18 Jul . 12:30PM',
    price: 72.59,
  },
];

export default function TopSellingProducts({
  className,
}: {
  className?: string;
}) {
  return (
    <WidgetCard
      title="Top Selling Products"
      headerClassName="items-center"
      className={cn('@container dark:bg-gray-100/50', className)}
    >
      <div className="custom-scrollbar mt-6 overflow-y-auto pe-2 @lg:mt-8 @3xl/sa:max-h-[330px] @7xl/sa:max-h-[405px]">
        <Box className="w-full space-y-3.5 divide-y divide-gray-200/70">
          {products.map((item, index) => (
            <SingleProduct {...item} key={index} />
          ))}
        </Box>
      </div>
    </WidgetCard>
  );
}

function SingleProduct({
  icon,
  title,
  date,
  price,
}: Product & { className?: string }) {
  return (
    <Flex align="end" className="pt-3.5 first:pt-0">
      <Flex justify="start" align="center" gap="3">
        <Box className="rounded border border-gray-200/50 bg-gray-100 p-2">
          {icon}
        </Box>
        <Box className="space-y-1">
          <Text className="font-semibold text-gray-900">{title}</Text>
          <Text className="text-xs text-gray-500">{date}</Text>
        </Box>
      </Flex>
      <Text as="span" className="font-semibold text-gray-500">
        ${price}
      </Text>
    </Flex>
  );
}
