import { podcastsCategories } from '@/data/podcasts-data';
import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';
import Link from 'next/link';
import { PiCaretRightBold } from 'react-icons/pi';
import { Box } from 'rizzui/box';
import { Flex } from 'rizzui/flex';
import { Grid } from 'rizzui/grid';
import { Title } from 'rizzui/typography';

type CategoryType = (typeof podcastsCategories)[0];

export default function ExplorePodcastsCategories({
  className,
}: {
  className?: string;
}) {
  return (
    <WidgetCard
      className={cn('@container', className)}
      headerClassName="mb-6 items-baseline"
      title="Explore Category"
      action={
        <Link
          href={'/'}
          className="text-sm font-medium text-gray-900 hover:underline"
        >
          See All
        </Link>
      }
    >
      <Grid className="grid-cols-1 gap-5 @xl:grid-cols-3 @3xl:gap-5 @4xl:gap-7">
        {podcastsCategories.map((category) => (
          <CategoryItem key={category.id} data={category} />
        ))}
      </Grid>
    </WidgetCard>
  );
}

function CategoryItem({ data }: { data: CategoryType }) {
  const { name, icon } = data;
  const Icon = icon;

  return (
    <Flex
      justify="between"
      align="start"
      className="relative min-h-32 w-full flex-col overflow-hidden rounded-xl bg-gray-100 p-6 @2xl:min-h-40 @4xl:min-h-48"
    >
      <Title
        as="h4"
        className="relative z-[1] max-w-min font-inter text-base font-semibold text-gray-900 @xl:text-lg @3xl:text-xl"
      >
        {name} Podcasts
      </Title>
      <Link
        href="/"
        className="group relative z-[1] inline-flex items-center text-xs font-semibold text-primary transition"
      >
        See More
        <PiCaretRightBold className="ml-0 transition-all group-hover:ml-1" />
      </Link>
      <Icon className="absolute -bottom-[20%] -right-[2%] left-auto top-auto size-40 -rotate-[30deg] text-gray-200 dark:opacity-50" />
    </Flex>
  );
}
