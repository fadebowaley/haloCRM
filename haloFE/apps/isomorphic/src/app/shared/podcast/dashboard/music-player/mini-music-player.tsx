'use client';

import { recentlyPlayedPodcasts } from '@/data/podcasts-data';
import cn from '@core/utils/class-names';
import { atom, useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';
import {
  PiPauseCircleFill,
  PiPlayCircleFill,
  PiX,
  PiXBold,
} from 'react-icons/pi';
import { Box } from 'rizzui/box';
import { Flex } from 'rizzui/flex';
import { Text, Title } from 'rizzui/typography';
import { useAudioPlayerContext } from './audio-player-context';
import MusicPlayer, { currentPlayerAtom } from './music-player';
import { Modal } from '@core/modal-views/modal';
import { useEffect } from 'react';

export const miniMusicPlayerAtom = atom(false);
export const miniMusicPlayerFullAtom = atom(false);

export default function MiniMusicPlayer({ className }: { className?: string }) {
  const currentItem = useAtomValue(currentPlayerAtom);
  const { isPlaying, handlePlayPause } = useAudioPlayerContext();

  const [miniMusicPlayerStatus, setMiniMusicPlayerStatus] =
    useAtom(miniMusicPlayerAtom);
  const [miniMusicPlayerFullStatus, setMiniMusicPlayerFullStatus] = useAtom(
    miniMusicPlayerFullAtom
  );

  useEffect(() => {
    if (isPlaying) setMiniMusicPlayerStatus(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  return (
    <>
      {miniMusicPlayerStatus && (
        <Flex
          className={cn(
            'fixed inset-x-0 bottom-0 top-auto z-50 h-[60px] items-center gap-3 overflow-hidden rounded-none bg-gray-0 px-4 py-2',
            className
          )}
        >
          <Box className="relative inline-block aspect-square size-10 shrink-0 overflow-hidden rounded-md border bg-primary">
            <Image
              src={
                currentItem?.thumb ??
                'https://isomorphic-furyroad.s3.amazonaws.com/public/podcast/recent-played-image-2.webp'
              }
              alt="Living My Best Life"
              fill
              className=""
            />
          </Box>
          <button
            className="relative flex-1 text-left"
            onClick={() => setMiniMusicPlayerFullStatus(true)}
          >
            <Title
              as="h6"
              className="line-clamp-1 font-inter text-xs font-semibold"
            >
              {currentItem?.name ?? 'Living My Best Life'}
            </Title>
            <Flex gap="0" className="line-clamp-1 text-gray-400">
              <Text
                as="span"
                className="text-xs after:mx-1 after:content-['.'] last:after:hidden"
              >
                {currentItem?.authorName ?? 'Ben Hector'}
              </Text>
              <Text
                as="span"
                className="text-xs after:mx-1 after:content-['.'] last:after:hidden"
              >
                Episode 1
              </Text>
            </Flex>
          </button>
          <Flex className="w-auto shrink-0 items-center gap-3">
            <button
              onClick={handlePlayPause}
              className="text-primary transition hover:text-primary-dark"
            >
              {isPlaying ? (
                <PiPauseCircleFill className="size-8" />
              ) : (
                <PiPlayCircleFill className="size-8" />
              )}
            </button>
            <button
              onClick={() => {
                handlePlayPause();
                setMiniMusicPlayerStatus(false);
              }}
            >
              <PiXBold className="size-5" />
            </button>
          </Flex>
        </Flex>
      )}
      <Modal
        isOpen={miniMusicPlayerFullStatus}
        onClose={() => setMiniMusicPlayerFullStatus(false)}
        overlayClassName="opacity-0"
        size="full"
        containerClassName="backdrop-blur-lg bg-opacity-90 data-[closed]:translate-y-1/2"
      >
        <Flex
          align="center"
          justify="center"
          className="relative size-full min-h-screen"
        >
          <button
            className="absolute left-auto right-3 top-3 transition hover:text-gray-950"
            onClick={() => setMiniMusicPlayerFullStatus(false)}
          >
            <PiX className="size-5" />
          </button>
          <MusicPlayer className="w-full max-w-sm rounded-none border-none" />
        </Flex>
      </Modal>
    </>
  );
}
