'use client';

import { Text } from 'rizzui/typography';
import cn from '@core/utils/class-names';
import { formatNumber } from '@core/utils/format-number';
import { PiCaretDoubleUpBold, PiTrendUpBold } from 'react-icons/pi';
import {
  socialMediaStatData,
  SocialMediaStatType,
} from '@/data/social-media-dashboard-data';

export type StatCardProps = {
  className?: string;
  statItem: SocialMediaStatType;
};

export default function SocialMediaStats({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-3 @3xl:gap-6 3xl:gap-8">
        {socialMediaStatData.map((stat: SocialMediaStatType, index: number) => {
          return <StatCard key={'stat-card-' + index} statItem={stat} />;
        })}
      </div>
    </div>
  );
}

function StatCard({ className, statItem }: StatCardProps) {
  const { icon, title, amount, likes } = statItem;
  const Icon = icon;
  return (
    <div
      className={cn(
        'group relative inline-block w-full overflow-hidden rounded-lg border border-muted p-4 first:border-0 first:bg-[#E7F3E7] @3xl:p-6 dark:first:border dark:first:border-muted dark:first:bg-transparent',
        className
      )}
    >
      <span className="absolute end-0 top-0 hidden size-20 -translate-y-10 translate-x-4 rotate-45 rounded-3xl bg-[#34C759]/15 group-first:block dark:group-first:hidden" />

      <div className="flex items-center gap-2">
        <Icon className="size-6" />
        <Text className="font-semibold text-gray-900">{title}</Text>
      </div>

      <div className="mb-2 flex items-center justify-between border-b border-muted py-3">
        <Text className="text-gray-900">
          <strong className="text-xl">{formatNumber(amount)}</strong> Followers
        </Text>
        <PiTrendUpBold className="size-4 text-green" />
      </div>

      <div className="flex items-center gap-2">
        <PiCaretDoubleUpBold className="size-4 text-green" />
        <Text className="font-bold text-gray-900">+{formatNumber(likes)}</Text>
        likes/week
      </div>
    </div>
  );
}
