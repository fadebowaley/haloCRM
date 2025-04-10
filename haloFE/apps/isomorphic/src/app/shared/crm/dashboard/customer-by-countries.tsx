'use client';

import Link from 'next/link';
import cn from '@core/utils/class-names';
import WorldMap from 'react-svg-worldmap';
import { type ComponentProps } from 'react';
import { useMedia } from '@core/hooks/use-media';
import { Box, Button, Progressbar, Text } from 'rizzui';
import { formatNumber } from '@core/utils/format-number';
import WidgetCard from '@core/components/cards/widget-card';
import { useElementSize } from '@core/hooks/use-element-size';
import { customerByCountryData } from '@/data/crm-dashboard-data';

const barColorClassName = [
  'bg-[#46BFDA]',
  'bg-[#29CCB1]',
  'bg-[#F3CC5C]',
  'bg-[#59A7FF]',
];
export default function CustomerByCountries({
  className,
}: {
  className?: string;
}) {
  const [ref, { width }] = useElementSize();
  const is4k = useMedia('(min-width: 2000px)', false);

  return (
    <WidgetCard
      title="Customer by Countries"
      className={cn('@container', className)}
      titleClassName="font-semibold"
      headerClassName="items-center"
      action={
        <Link href={'#'}>
          <Button as="span" variant="text" className="p-0 underline">
            View All
          </Button>
        </Link>
      }
    >
      <Box className="@3xl:grid @3xl:grid-cols-2 @3xl:items-center @3xl:gap-10">
        <Box
          ref={ref}
          className="my-4 flex flex-col [&>figure]:flex [&>figure]:items-center [&>figure]:justify-center [&_figure]:!bg-transparent [&_svg]:dark:invert"
        >
          <WorldMap
            color="#46BFDA"
            valueSuffix="%"
            size={is4k ? 'lg' : width}
            data={customerByCountryData}
            textLabelFunction={createTextLabels}
            backgroundColor="#F3CC5C"
          />
        </Box>

        <Box className="space-y-3 @sm:space-y-6">
          {customerByCountryData.map((cou, idx) => {
            const valueInPercentage = (cou.value / 10) * 100;
            return (
              <Box key={cou.country}>
                <Text className="font-medium">{cou.name}</Text>
                <Progressbar
                  size="xl"
                  value={valueInPercentage}
                  label={formatNumber(cou.count)}
                  labelClassName="text-xs"
                  barClassName={cn(
                    "relative after:content-[''] after:size-2 after:rounded-full after:bg-white after:absolute after:top-1/2 after:-translate-y-1/2 after:end-1",
                    barColorClassName[idx]
                  )}
                  className="rounded-full bg-gray-100 p-1 pe-2"
                  trackClassName="bg-gray-100"
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </WidgetCard>
  );
}

function createTextLabels(width: number) {
  const labels: ({ label: string } & ComponentProps<'text'>)[] = [
    { label: 'Atlantic', x: 0.37 * width, y: 0.39 * width },
    { label: 'Indian', x: 0.69 * width, y: 0.57 * width },
    { label: 'Pacific', x: 0.083 * width, y: 0.48 * width },
    {
      label: 'Arctic',
      x: 0.75 * width,
      y: 0.058 * width,
    },
  ];
  if (width < 550) {
    return labels.map((label) => ({
      ...label,
      style: { ...label.style, fontSize: '70%' },
    }));
  }
  return labels;
}
