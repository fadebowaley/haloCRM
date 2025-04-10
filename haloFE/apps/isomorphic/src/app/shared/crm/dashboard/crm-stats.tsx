import cn from '@core/utils/class-names';
import { Badge } from 'rizzui/badge';
import { Box } from 'rizzui/box';
import { Flex } from 'rizzui/flex';
import { Text, Title } from 'rizzui/typography';
import {
  PiCaretRightBold,
  PiTrendDownBold,
  PiTrendUpBold,
} from 'react-icons/pi';
import { formatNumberWithCommas } from '@core/utils/format-number';
import { crmStatData, CrmStatType } from '@/data/crm-dashboard-data';

export type StatCardProps = {
  className?: string;
  statItem: CrmStatType;
};

export default function CRMStats({ className }: { className?: string }) {
  return (
    <Box className={cn('@container', className)}>
      <Box className="grid grid-cols-1 gap-4 @lg:grid-cols-2 @3xl:gap-6 @4xl:grid-cols-4 3xl:gap-8">
        {crmStatData.map((stat: CrmStatType, index: number) => {
          return <StatCard key={'stat-card-' + index} statItem={stat} />;
        })}
      </Box>
    </Box>
  );
}

function StatCard({ className, statItem }: StatCardProps) {
  const { title, customer, increased, percentage, lastMonth } = statItem;

  return (
    <Box
      className={cn(
        'space-y-3 rounded-lg border border-muted p-6 dark:bg-[#181818]',
        className
      )}
    >
      <Flex justify="between" align="center">
        <Text className="font-semibold text-gray-900">{title}</Text>
        <Badge
          style={{
            backgroundColor: increased ? '#C0F2CC' : '#FCECD6',
            color: increased ? '#22973F' : '#EE6D3D',
          }}
        >
          <span className="pe-1">{percentage}%</span>
          {increased ? (
            <PiTrendUpBold className="size-3" />
          ) : (
            <PiTrendDownBold className="size-3" />
          )}
        </Badge>
      </Flex>

      <Title className="text-3xl font-normal leading-none">
        {formatNumberWithCommas(customer)}
      </Title>

      <Box className="text-gray-400">
        vs last month:{' '}
        <strong className="text-gray-900">
          {formatNumberWithCommas(lastMonth)}
        </strong>
      </Box>
    </Box>
  );
}
