'use client';

import { leadingTeamsData } from '@/data/bidding-data';
import WidgetCard from '@core/components/cards/widget-card';
import DropdownAction from '@core/components/charts/dropdown-action';
import TrendingDownIcon from '@core/components/icons/trending-down';
import TrendingUpIcon from '@core/components/icons/trending-up';
import cn from '@core/utils/class-names';
import { formatNumberWithCommas } from '@core/utils/format-number';
import { Box, Flex, Grid, Text, Title } from 'rizzui';

const viewOptions = [
  {
    value: 'Daily',
    label: 'Daily',
  },
  {
    value: 'Monthly',
    label: 'Monthly',
  },
];

export default function LeadingTeams({ className }: { className?: string }) {
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      className={cn('flex flex-col @container/lead', className)}
      title="Leading Teams"
      titleClassName="font-inter"
      headerClassName="mb-7 flex-wrap gap-4 items-center"
      actionClassName="ml-auto"
      action={
        <DropdownAction
          className="rounded-lg border"
          options={viewOptions}
          onChange={handleChange}
          dropdownClassName="!z-0"
        />
      }
    >
      <Grid
        columns="1"
        gap="5"
        className="custom-scrollbar max-h-[428px] overflow-y-auto @2xl/sidebar:max-h-[550px]"
      >
        {leadingTeamsData.map((team) => (
          <Flex key={team.id} align="center" justify="between" gap="3">
            <Flex
              align="center"
              justify="center"
              className="inline-flex size-11 shrink-0 rounded-lg bg-gray-100 p-2"
            >
              {team.icon}
            </Flex>
            <Flex
              align="center"
              justify="between"
              className="flex-grow flex-wrap gap-x-4 gap-y-2"
            >
              <Box className="flex-grow">
                <Title
                  as="h4"
                  className="mb-1 font-inter text-sm font-semibold"
                >
                  {team.name}
                </Title>
                <Text className="truncate text-gray-500">{team.content}</Text>
              </Box>
              <Text className="flex w-full shrink-0 items-center gap-2 self-end leading-none text-gray-500 @xs/lead:w-auto">
                <Text as="span" className="font-semibold text-gray-900">
                  {formatNumberWithCommas(team.value)}
                </Text>
                <Text
                  as="span"
                  className={cn(
                    'me-2 inline-flex items-center font-medium',
                    team.fluctuation === 'increased' ? 'text-green' : 'text-red'
                  )}
                >
                  {team.fluctuation === 'increased' ? (
                    <TrendingUpIcon className="me-1 h-4 w-4" />
                  ) : (
                    <TrendingDownIcon className="me-1 h-4 w-4" />
                  )}
                  {team.volatility}%
                </Text>
              </Text>
            </Flex>
          </Flex>
        ))}
      </Grid>
    </WidgetCard>
  );
}
