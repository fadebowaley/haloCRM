import { topPodcasters } from '@/data/podcasts-data';
import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';
import Image from 'next/image';
import { Box } from 'rizzui/box';
import { Button } from 'rizzui/button';
import { Flex } from 'rizzui/flex';
import { Text, Title } from 'rizzui/typography';

type PodcasterType = (typeof topPodcasters)[0];

export default function TopPodcaster({ className }: { className?: string }) {
  return (
    <WidgetCard
      className={
        (cn(className),
        'flex max-h-[420px] flex-col @5xl/pod:max-h-[390px] @6xl/pod:max-h-[420px] 3xl:max-h-[500px] 4xl:!max-h-[600px] [@media(min-width:2300px)]:max-h-[550px]')
      }
      title="Top Podcaster"
      headerClassName="mb-6"
    >
      <Box className="custom-scrollbar h-full flex-1 overflow-y-auto">
        {topPodcasters.map((podcaster) => (
          <PodcasterItem data={podcaster} key={podcaster.id} />
        ))}
      </Box>
    </WidgetCard>
  );
}

const formatNumber = (number: number) => {
  return new Intl.NumberFormat('en-US').format(number);
};

export function PodcasterItem({
  data: { avatar, followers, following, name },
}: {
  data: PodcasterType;
}) {
  return (
    <Flex
      gap="3"
      justify="between"
      align="center"
      className="border-b border-dashed py-5 first:pt-0 last:border-b-0 last:pb-0"
    >
      <Box className="relative aspect-square size-12 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          className="object-cover object-center"
          src={avatar}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw"
        />
      </Box>
      <Box className="w-full">
        <Title
          as="h6"
          className="line-clamp-1 font-inter text-base font-medium"
        >
          {name}
        </Title>
        <Text className="text-sm">{formatNumber(followers)} followers</Text>
      </Box>
      <Button
        size="sm"
        variant={following ? 'solid' : 'outline'}
        className="min-w-20"
      >
        {following ? 'Following' : 'Follow'}
      </Button>
    </Flex>
  );
}
