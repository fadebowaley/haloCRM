'use client';

import cn from '@core/utils/class-names';
import WorldMap from 'react-svg-worldmap';
import { Progressbar, Text } from 'rizzui';
import { useMedia } from '@core/hooks/use-media';
import { SocialMediaFilter } from './utils';
import { formatNumber } from '@core/utils/format-number';
import { useState, type ComponentProps } from 'react';
import WidgetCard from '@core/components/cards/widget-card';
import { useElementSize } from '@core/hooks/use-element-size';
import {
  socialMediaOptions,
  socialMediaTopCountriesData,
} from '@/data/social-media-dashboard-data';

export default function TopCountries({ className }: { className?: string }) {
  const [state, setState] = useState(socialMediaOptions[0]);
  const [ref, { width }] = useElementSize();
  const is4k = useMedia('(min-width: 2000px)', false);

  return (
    <WidgetCard
      title="Top Countries"
      className={cn('@container/tc', className)}
      titleClassName="font-semibold"
      headerClassName="items-center"
      action={<SocialMediaFilter value={state} onChange={setState} />}
    >
      <div className="@4xl/tc:grid @4xl/tc:grid-cols-2 @4xl/tc:items-center @4xl/tc:gap-10">
        <div
          ref={ref}
          className="mt-6 flex flex-col 4xl:mt-0 [&>figure]:flex [&>figure]:items-center [&>figure]:justify-center [&_figure]:!bg-transparent [&_svg]:dark:invert"
        >
          <WorldMap
            color="#6993FF"
            valueSuffix="%"
            size={is4k ? 'xl' : width}
            data={socialMediaTopCountriesData}
            textLabelFunction={createTextLabels}
          />
        </div>

        <div className="mt-1 space-y-3 pt-5 @sm/tc:space-y-6 4xl:mt-0 4xl:pt-0">
          {socialMediaTopCountriesData.map((cou) => {
            const valueInPercentage = (cou.value / 10) * 100;
            return (
              <div key={cou.country}>
                <Text className="font-medium">{cou.name}</Text>
                <Progressbar
                  value={valueInPercentage}
                  label={formatNumber(cou.count)}
                  barClassName="bg-[#6993FF]"
                />
              </div>
            );
          })}
        </div>
      </div>
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
