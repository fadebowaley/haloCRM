'use client';

import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';
import shuffle from 'lodash/shuffle';
import { Box, Flex, Text } from 'rizzui';

const COLORS = {
  gray: 'rgba(170, 170, 170, 0.247)',
  light: 'rgba(70, 191, 218, 0.2)',
  default: 'rgba(70, 191, 218, 0.4)',
  dark: 'rgba(70, 191, 218, 0.8)',
  deep: 'rgba(70, 191, 218, 1)',
};

type ColorType = keyof typeof COLORS;

export default function Visitor({ className }: { className?: string }) {
  return (
    <WidgetCard
      title="Visitor"
      headerClassName="items-start"
      description="Social Media Visitor"
      descriptionClassName="mt-2 whitespace-nowrap"
      className={cn('@container dark:bg-gray-100/50', className)}
      action={<Legend />}
      actionClassName="pt-1"
    >
      <Box className="custom-scrollbar mt-7 overflow-x-auto @3xl/sa:mt-11">
        <Overview className="min-w-[400px]" />
      </Box>
    </WidgetCard>
  );
}

function OverviewCell({ colorType }: { colorType: ColorType }) {
  return (
    <Text
      as="span"
      style={{ backgroundColor: COLORS[colorType] }}
      className="inline-block aspect-[48/40] rounded"
    />
  );
}

const rowData: ColorType[] = [
  'gray',
  'light',
  'default',
  'dark',
  'deep',
  'deep',
  'light',
];

function OverviewRow({ title }: { title: string }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      <span className="flex items-center text-sm">{title}</span>
      <div className="col-span-4 grid grid-cols-7 gap-1">
        {shuffle(rowData).map((item, idx) => (
          <OverviewCell key={idx} colorType={item} />
        ))}
      </div>
    </div>
  );
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function OverviewFooter({ className }: { className?: string }) {
  return (
    <div className={cn('grid grid-cols-5 gap-2', className)}>
      <span />
      <div className="col-span-4 grid grid-cols-7 gap-1">
        {days.map((day, idx) => (
          <Text as="span" className="text-center" key={day + idx}>
            {day}
          </Text>
        ))}
      </div>
    </div>
  );
}

function Overview({ className }: { className?: string }) {
  return (
    <Box className={cn('space-y-1', className)}>
      <OverviewRow title="Whatsapp" />
      <OverviewRow title="Instagram" />
      <OverviewRow title="Google" />
      <OverviewRow title="Facebook" />
      <OverviewRow title="Linkedin" />
      <OverviewFooter className="pt-3" />
    </Box>
  );
}

const legendsData: ColorType[] = ['gray', 'light', 'default', 'dark', 'deep'];

function Legend() {
  return (
    <Flex gap="1" align="center">
      <Text>0</Text>
      <Flex className="gap-0.5">
        {legendsData.map((item, index) => (
          <Text
            as="span"
            key={item + index}
            style={{ backgroundColor: COLORS[item] }}
            className="h-3 w-3 rounded @md:w-4"
          />
        ))}
      </Flex>
      <Text>500</Text>
    </Flex>
  );
}
