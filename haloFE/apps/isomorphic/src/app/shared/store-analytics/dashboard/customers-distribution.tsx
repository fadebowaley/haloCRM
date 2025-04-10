'use client';
import { customersDistributionsMapData } from '@/data/social-media-dashboard-data';
import WidgetCard from '@core/components/cards/widget-card';
import CNFlagIcon from '@core/components/icons/language/CNFlag';
import DEFlagIcon from '@core/components/icons/language/DEFlag';
import ESFlagIcon from '@core/components/icons/language/ESFlag';
import SAFlagIcon from '@core/components/icons/language/SAFlag';
import USFlagIcon from '@core/components/icons/language/USFlag';
import { useMeasure } from '@core/hooks/use-measure';
import cn from '@core/utils/class-names';
import WorldMap from 'react-svg-worldmap';
import { Box, Grid, Text } from 'rizzui';

const countriesData = [
  {
    name: 'Saudi Arabia',
    icon: <SAFlagIcon className="h-auto w-8 @[40rem]:w-10 @[55rem]:w-12" />,
    value: '14,879',
  },
  {
    name: 'United States',
    icon: <USFlagIcon className="h-auto w-8 @[40rem]:w-10 @[55rem]:w-12" />,
    value: '12,879',
  },
  {
    name: 'China',
    icon: <CNFlagIcon className="h-auto w-8 @[40rem]:w-10 @[55rem]:w-12" />,
    value: '10,879',
  },
  {
    name: 'Denmark',
    icon: <DEFlagIcon className="h-auto w-8 @[40rem]:w-10 @[55rem]:w-12" />,
    value: '8,879',
  },
  {
    name: 'Spain',
    icon: <ESFlagIcon className="h-auto w-8 @[40rem]:w-10 @[55rem]:w-12" />,
    value: '7,879',
  },
];
export default function CustomersDistribution({ className }: { className?: string }) {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  return (
    <WidgetCard
      title="Customers Distribution"
      description="Top selling countries"
      headerClassName="items-center"
      className={cn('@container dark:bg-gray-100/50', className)}
    >
      <Grid className="grid-cols-6 gap-6">
        <Box
          ref={ref}
          className="relative -bottom-2.5 col-span-full flex items-center justify-center @[30rem]:col-span-3 [&_figure]:!bg-transparent [&_svg]:dark:invert"
        >
          <WorldMap
            color="#028ca6"
            valueSuffix="%"
            size={width}
            data={customersDistributionsMapData}
          />
        </Box>
        <Countries className="col-span-full h-full @[30rem]:col-span-3 @[30rem]:ps-12 @[40rem]:ps-16" />
      </Grid>
    </WidgetCard>
  );
}

function Countries({ className }: { className?: string }) {
  return (
    <Box
      className={cn(
        'grid grid-cols-1 @[26rem]:grid-cols-2 @[30rem]:flex @[30rem]:flex-col @[30rem]:justify-center',
        'divide-y divide-gray-200/70',
        className
      )}
    >
      {countriesData.map((item, idx) => (
        <Box
          className="flex items-center justify-between gap-3 py-2.5 @[40rem]:gap-3"
          key={idx}
        >
          <Box>{item.icon}</Box>
          <Text as="span">
            {item.name}&nbsp;&nbsp;({item.value})
          </Text>
        </Box>
      ))}
    </Box>
  );
}
