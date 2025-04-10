'use client';

import { recentlyPlayedPodcasts } from '@/data/podcasts-data';
import Image from 'next/image';
import Link from 'next/link';
import { PiPauseFill, PiPlayFill } from 'react-icons/pi';
import { Box } from 'rizzui/box';
import { Flex } from 'rizzui/flex';
import { Grid } from 'rizzui/grid';
import { Text, Title } from 'rizzui/typography';
import { useAudioPlayerContext } from './music-player/audio-player-context';
import { atom, useAtom } from 'jotai';
import { currentPlayerAtom } from './music-player/music-player';
import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';

type PodcastType = (typeof recentlyPlayedPodcasts)[0];

export default function RecentlyPlayed({ className }: { className?: string }) {
  return (
    <WidgetCard
      headerClassName="mb-6 items-baseline"
      title="Recently Played"
      action={
        <Link
          href={'/file-manager'}
          className="text-sm font-medium text-gray-900 hover:underline"
        >
          See All
        </Link>
      }
      className={cn('@container', className)}
    >
      <Grid className="grid-cols-2 gap-5 @xl:grid-cols-4 @4xl:gap-7">
        {recentlyPlayedPodcasts.map((podcast) => (
          <RecentPlayedItem data={podcast} key={podcast.id} />
        ))}
      </Grid>
    </WidgetCard>
  );
}

export function RecentPlayedItem({ data }: { data: PodcastType }) {
  const { id, name, authorName, thumb, track } = data;
  const { setAudioUrl, isPlaying, handlePlayPause } = useAudioPlayerContext();
  const [currentPlayingItem, setPlayingItem] = useAtom(currentPlayerAtom);

  return (
    <Box className="group">
      <Box className="relative mb-3 aspect-square overflow-hidden rounded-xl">
        <Image
          src={thumb}
          alt={name}
          fill
          className="size-full object-cover object-center"
          sizes="(max-width: 768px) 100vw"
        />
        <Flex
          justify="center"
          align="center"
          className="invisible absolute inset-0 bg-black bg-opacity-40 opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100"
        >
          {currentPlayingItem?.id !== id ? (
            <button
              className="absolute inline-block"
              onClick={() => {
                setPlayingItem(data);
                setAudioUrl(track);
              }}
            >
              <PiPlayFill className="size-8 text-white" />
            </button>
          ) : (
            <button className="absolute inline-block" onClick={handlePlayPause}>
              {isPlaying ? (
                <PiPauseFill className="size-8 text-white" />
              ) : (
                <PiPlayFill className="size-8 text-white" />
              )}
            </button>
          )}
        </Flex>
      </Box>
      <Title as="h6" className="font-inter text-sm font-semibold">
        {name}
      </Title>
      <Text className="mt-1 text-sm">{authorName}</Text>
    </Box>
  );
}
