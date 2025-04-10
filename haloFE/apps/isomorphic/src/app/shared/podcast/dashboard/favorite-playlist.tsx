import { favouritePlaylist } from '@/data/podcasts-data';
import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';
import Image from 'next/image';
import { PiShareFat } from 'react-icons/pi';
import { ActionIcon } from 'rizzui/action-icon';
import { Box } from 'rizzui/box';
import { Flex } from 'rizzui/flex';
import { Grid } from 'rizzui/grid';
import { Text, Title } from 'rizzui/typography';

type PlaylistType = (typeof favouritePlaylist)[0];

export default function FavoritePlaylist({
  className,
}: {
  className?: string;
}) {
  return (
    <WidgetCard
      className={
        (cn(className),
        'flex max-h-[420px] flex-col @5xl/pod:max-h-[390px] @6xl/pod:max-h-[420px] 3xl:max-h-[500px] 4xl:!max-h-[600px] [@media(min-width:2300px)]:max-h-[550px]')
      }
      title="Favorite Playlist"
      headerClassName="mb-6"
    >
      <Grid className="custom-scrollbar h-full grid-cols-1 gap-7 overflow-y-auto">
        {favouritePlaylist.map((podcaster) => (
          <PlaylistItem data={podcaster} key={podcaster.id} />
        ))}
      </Grid>
    </WidgetCard>
  );
}

export function PlaylistItem({
  data: { avatar, duration, name },
}: {
  data: PlaylistType;
}) {
  return (
    <Flex gap="3" justify="between" align="center">
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
        <Text className="text-sm">{duration}</Text>
      </Box>
      <ActionIcon
        variant="outline"
        rounded="full"
        className="size-8 shrink-0 p-1 text-right transition hover:text-primary"
      >
        <PiShareFat className="text-lg" />
      </ActionIcon>
    </Flex>
  );
}
