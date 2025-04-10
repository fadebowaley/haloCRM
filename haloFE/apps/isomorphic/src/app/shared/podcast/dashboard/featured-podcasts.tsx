import { featuredCreatorsPodcasts } from '@/data/podcasts-data';
import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';
import Image from 'next/image';
import Link from 'next/link';
import { PiPlayCircleFill, PiPlayFill } from 'react-icons/pi';
import { Box } from 'rizzui/box';
import { Flex } from 'rizzui/flex';
import { Grid } from 'rizzui/grid';
import { Title } from 'rizzui/typography';

type FeaturedPodcastType = (typeof featuredCreatorsPodcasts)[0];

export default function FeaturedPodcasts({
  className,
}: {
  className?: string;
}) {
  return (
    <WidgetCard
      title="Featured by Creator"
      headerClassName="mb-6 items-baseline"
      className={cn('@container', className)}
      action={
        <Link
          href={'/'}
          className="text-sm font-medium text-gray-900 hover:underline"
        >
          See All
        </Link>
      }
    >
      <Grid className="grid-cols-2 gap-5 @xl:grid-cols-4 @4xl:gap-7">
        {featuredCreatorsPodcasts.map((podcast) => (
          <FeaturedPodcast key={podcast.id} data={podcast} />
        ))}
      </Grid>
    </WidgetCard>
  );
}

function FeaturedPodcast({ data }: { data: FeaturedPodcastType }) {
  const { name, thumb } = data;
  return (
    <button className="group relative aspect-square overflow-hidden rounded-lg text-left">
      <Image
        src={thumb}
        alt={name}
        fill
        className="object-cover object-center"
      />
      <Flex
        direction="col"
        justify="between"
        align="start"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)] p-3"
      >
        <Box className="relative z-[1] inline-flex size-6 rounded-full before:absolute before:inset-1 before:-z-[1] before:size-4 before:rounded-full before:bg-white before:content-['']">
          <span className="absolute inset-1 -z-[1] size-4 rounded-full bg-white content-[''] group-hover:animate-ping" />
          <PiPlayCircleFill className="size-6 text-primary" />
        </Box>
        <Title
          as="h6"
          className="line-clamp-2 font-inter text-xs font-medium text-white"
        >
          {name}
        </Title>
      </Flex>
    </button>
  );
}
