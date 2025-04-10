'use client';

import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';
import { Box, Flex, Text } from 'rizzui';

const CELL_PER_ROW = 40;

export default function Audience({ className }: { className?: string }) {
  return (
    <WidgetCard
      title="Audience"
      headerClassName="items-center"
      className={cn('@container dark:bg-gray-100/50', className)}
      action={<Legend />}
    >
      <Box className="custom-scrollbar mt-10 overflow-x-auto pb-4">
        <AudienceOverview className="min-w-[510px]" />
      </Box>
    </WidgetCard>
  );
}

function AudienceOverview({ className }: { className?: string }) {
  return (
    <Box className={cn('space-y-7', className)}>
      <OverviewRow title="15 - 30 Years Old" percentage={30} />
      <OverviewRow title="31 - 45 Years Old" percentage={40} />
      <OverviewRow title="45 - 60 Years Old" percentage={30} />
    </Box>
  );
}

function OverviewRow({
  title,
  percentage,
}: {
  title: string;
  percentage: number;
}) {
  return (
    <Box>
      <Box className="mb-3 flex justify-between">
        <Text as="span" className="font-medium">
          {title}
        </Text>
        <Text as="span" className="font-medium">
          {percentage}%
        </Text>
      </Box>
      <Flex className="w-full gap-[3px] 3xl:gap-2" justify="between">
        {Array.from({ length: CELL_PER_ROW }).map((_, idx) => {
          const TYPE =
            idx >= getValueFromPercentage(percentage, CELL_PER_ROW)
              ? 'female'
              : 'male';
          return <Cell type={TYPE} key={idx} />;
        })}
      </Flex>
    </Box>
  );
}

function getValueFromPercentage(percentage: number, total: number) {
  const PERCENTAGE = Math.min(percentage, 100);
  return Math.round((total * PERCENTAGE) / 100);
}

function Cell({ type }: { type: 'male' | 'female' }) {
  return (
    <Text
      as="span"
      className={cn(
        'inline-block h-10 w-[7px] rounded bg-[#59A7FF] 3xl:w-3',
        type === 'female' && 'opacity-50'
      )}
    />
  );
}

function Legend({ className }: { className?: string }) {
  return (
    <Flex gap="3" className={cn('text-xs @3xl:text-sm lg:gap-4', className)}>
      {['Male', 'Female'].map((item, index) => (
        <Flex align="center" gap="2" key={item + index}>
          <Text
            as="span"
            className={cn(
              'inline-block h-3 w-4 rounded bg-[#59A7FF]',
              item === 'Female' && 'opacity-50'
            )}
          />
          <span className="whitespace-nowrap">{item}</span>
        </Flex>
      ))}
    </Flex>
  );
}
