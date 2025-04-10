'use client';

import { formatDuration } from '@core/utils/format-duration';
import Image from 'next/image';
import React, { SVGProps, useEffect, useState } from 'react';
import {
  PiCaretDoubleLeftFill,
  PiCaretDoubleRightFill,
  PiCaretLineLeftFill,
  PiCaretLineRightFill,
  PiPauseCircleFill,
  PiPlayCircleFill,
} from 'react-icons/pi';
import { Box } from 'rizzui/box';
import { Flex } from 'rizzui/flex';
import { Text, Title } from 'rizzui/typography';
import { useAudioPlayerContext } from './audio-player-context';
import { useColorPresets } from '@/layouts/settings/use-theme-color';
import { useTheme } from 'next-themes';
import { atom, useAtomValue } from 'jotai';
import { recentlyPlayedPodcasts } from '@/data/podcasts-data';
import { AudioVisualizer } from './audio-visualizer';
import cn from '@core/utils/class-names';

export const currentPlayerAtom = atom<(typeof recentlyPlayedPodcasts)[0]>();

export default function MusicPlayer({ className }: { className?: string }) {
  const currentItem = useAtomValue(currentPlayerAtom);
  const {
    audioRef,
    isPlaying,
    currentDuration,
    totalDuration,
    handlePlayPause,
    seekNext,
    seekPrev,
    setAudioUrl,
  } = useAudioPlayerContext();

  const { colorPresets } = useColorPresets();
  const { theme } = useTheme();

  useEffect(() => {
    if (!audioRef.current) {
      setAudioUrl(recentlyPlayedPodcasts[0].track);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef.current]);

  // TODO: Will add playlist later
  const handleNextPrev = () => {
    setAudioUrl(
      Math.round(totalDuration) === 27
        ? recentlyPlayedPodcasts[0].track
        : recentlyPlayedPodcasts[1].track
    );
  };

  return (
    <Box
      className={cn(
        'relative overflow-hidden rounded-xl border px-5 py-5 text-center 2xl:px-8 2xl:py-12',
        className
      )}
    >
      {/* Album Art and Title Section */}
      <Box className="relative">
        <Box className="relative inline-flex size-[152px] items-center justify-center p-4">
          <Box className="relative inline-block aspect-square size-full overflow-hidden rounded-xl border bg-primary">
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
          <ThumbBorder className="absolute inset-0 size-full text-gray-900/20" />
        </Box>
        <Box className="relative mt-4 text-center">
          <Title as="h5" className="font-inter font-bold">
            {currentItem?.name ?? 'Living My Best Life'}
          </Title>
          <Flex gap="0" className="inline-flex justify-center text-gray-400">
            <Text
              as="span"
              className="mt-1 text-xs after:mx-1 after:content-['.'] last:after:hidden"
            >
              {currentItem?.authorName ?? 'Ben Hector'}
            </Text>
            <Text
              as="span"
              className="mt-1 text-xs after:mx-1 after:content-['.'] last:after:hidden"
            >
              Episode 1
            </Text>
          </Flex>
        </Box>
        <BackgroundShapes className="absolute inset-5 -z-[1] max-h-full w-[calc(100%-40px)] object-cover text-gray-900" />
      </Box>

      {/* Audio Controls Section */}
      <Box className="relative mt-8">
        <Flex
          justify="between"
          align="center"
          gap="2"
          className="mx-auto max-w-[320px] text-gray-400"
        >
          <Text className="text-sm">{formatDuration(currentDuration)}</Text>
          <Text className="text-sm">{formatDuration(totalDuration)}</Text>
        </Flex>
        <Box className="mx-auto mt-2 max-w-[320px]">
          <Box className="relative">
            {audioRef.current && (
              <AudioVisualizer
                audioElement={audioRef.current}
                theme={theme}
                color={(colorPresets as any)?.default}
              />
            )}
          </Box>
          <Flex
            justify="between"
            align="center"
            gap="4"
            className="relative mt-5"
          >
            <button
              className="text-primary transition hover:text-primary-dark"
              onClick={handleNextPrev}
            >
              <PiCaretLineLeftFill className="size-6" />
            </button>
            <button
              onClick={seekPrev}
              className="text-primary transition hover:text-primary-dark"
            >
              <PiCaretDoubleLeftFill className="size-6" />
            </button>
            <button
              onClick={handlePlayPause}
              className="text-primary transition hover:text-primary-dark"
            >
              {isPlaying ? (
                <PiPauseCircleFill className="size-10" />
              ) : (
                <PiPlayCircleFill className="size-10" />
              )}
            </button>
            <button
              onClick={seekNext}
              className="text-primary transition hover:text-primary-dark"
            >
              <PiCaretDoubleRightFill className="size-6" />
            </button>
            <button
              className="text-primary transition hover:text-primary-dark"
              onClick={handleNextPrev}
            >
              <PiCaretLineRightFill className="size-6" />
            </button>
            <span className="absolute left-1/2 top-0 -z-[1] -ml-10 h-10 w-20 rounded-full bg-primary opacity-30 blur-xl" />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

const BackgroundShapes = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={437}
    height={244}
    viewBox="0 0 437 244"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillOpacity={0.2}
      d="M55.322 158.927a1.511 1.511 0 0 1-.78-.22 15.93 15.93 0 0 1-2.83-2.07 12.17 12.17 0 0 1-2-2.39h-21.78a7.931 7.931 0 0 1 0-15.86h23.17a7.932 7.932 0 0 1 7.42 10.702 7.931 7.931 0 0 1-3.14 3.898c.09.45.21.9.34 1.33.26.827.591 1.63.99 2.4a1.56 1.56 0 0 1-.35 1.83 1.533 1.533 0 0 1-1.04.38Zm-27.39-19.54a6.932 6.932 0 0 0-6.93 6.93 6.93 6.93 0 0 0 6.93 6.93h22.38l.14.24a11.28 11.28 0 0 0 2 2.42 15.34 15.34 0 0 0 2.62 1.94.5.5 0 0 0 .62-.07.532.532 0 0 0 .13-.65 17.178 17.178 0 0 1-1-2.51 15.426 15.426 0 0 1-.44-1.78l-.07-.35.31-.18a6.926 6.926 0 0 0 3.236-7.795 6.92 6.92 0 0 0-6.706-5.125h-23.22Z"
    />
    <path
      fill="currentColor"
      fillOpacity={0.2}
      d="M26.523 148.306a1.99 1.99 0 1 0 0-3.98 1.99 1.99 0 0 0 0 3.98Zm8.219 0a1.99 1.99 0 1 0 0-3.98 1.99 1.99 0 0 0 0 3.98Zm8.23 0a1.99 1.99 0 1 0 0-3.98 1.99 1.99 0 0 0 0 3.98Zm8.221 0a1.99 1.99 0 1 0 0-3.98 1.99 1.99 0 0 0 0 3.98Zm316.749 3.15a1.516 1.516 0 0 1-1-.41 1.562 1.562 0 0 1-.35-1.83c.403-.759.737-1.552 1-2.37.14-.43.25-.88.35-1.33a7.92 7.92 0 0 1 4.27-14.6h23.18a7.93 7.93 0 0 1 0 15.86h-21.88a12.474 12.474 0 0 1-2 2.39 15.861 15.861 0 0 1-2.79 2.07 1.509 1.509 0 0 1-.78.22Zm4.21-19.54a6.92 6.92 0 0 0-3.44 12.92l.31.18-.07.35a16.754 16.754 0 0 1-.44 1.78 16.408 16.408 0 0 1-1 2.51.532.532 0 0 0 .13.65.484.484 0 0 0 .62.07 15.3 15.3 0 0 0 2.62-1.94 11.226 11.226 0 0 0 2-2.42l.15-.24h22.38a6.931 6.931 0 1 0 0-13.86h-23.26Z"
    />
    <path
      fill="currentColor"
      fillOpacity={0.2}
      d="M396.742 140.837a1.99 1.99 0 1 0 0-3.98 1.99 1.99 0 0 0 0 3.98Zm-8.229 0a1.99 1.99 0 1 0 0-3.98 1.99 1.99 0 0 0 0 3.98Zm-8.22 0a1.99 1.99 0 1 0 0-3.98 1.99 1.99 0 0 0 0 3.98Zm-8.221 0a1.99 1.99 0 1 0 0-3.98 1.99 1.99 0 0 0 0 3.98ZM59.65 243.518a1.65 1.65 0 0 1-.83-.23 1.631 1.631 0 0 1-.82-1.42v-14.22a1.643 1.643 0 0 1 .82-1.43 1.669 1.669 0 0 1 1.65 0l12.32 7.11a1.646 1.646 0 0 1 .818 1.425 1.652 1.652 0 0 1-.818 1.425l-12.32 7.11a1.634 1.634 0 0 1-.82.23Zm0-16.52a.642.642 0 0 0-.564.328.648.648 0 0 0-.086.322v14.22a.67.67 0 0 0 .32.56.65.65 0 0 0 .65 0l12.32-7.11a.647.647 0 0 0 .234-.882.642.642 0 0 0-.234-.238l-12.32-7.11a.575.575 0 0 0-.32-.09ZM54.402 56.227a1.64 1.64 0 0 1-1.64-1.64v-14.22a1.65 1.65 0 0 1 2.47-1.43l12.31 7.11a1.65 1.65 0 0 1 0 2.85l-12.31 7.11a1.64 1.64 0 0 1-.83.22Zm.01-16.51a.65.65 0 0 0-.65.65v14.22a.611.611 0 0 0 .32.55.63.63 0 0 0 .65 0l12.31-7.11a.64.64 0 0 0 0-1.11l-12.33-7.11a.631.631 0 0 0-.3-.09Zm344.67 8.26a1.639 1.639 0 0 1-.82-.23 1.604 1.604 0 0 1-.83-1.42v-14.22a1.627 1.627 0 0 1 .83-1.43 1.647 1.647 0 0 1 1.64 0l12.32 7.11a1.653 1.653 0 0 1 .599 2.247 1.65 1.65 0 0 1-.599.603l-12.32 7.08a1.61 1.61 0 0 1-.82.26Zm0-16.52a.579.579 0 0 0-.32.09.628.628 0 0 0-.33.56v14.22a.65.65 0 0 0 .33.56.63.63 0 0 0 .64 0l12.31-7.11a.652.652 0 0 0 0-1.12l-12.32-7.11a.581.581 0 0 0-.31-.09Zm-1.433 172.109-2.84-7.42a3.344 3.344 0 0 0-1.757-1.853 3.347 3.347 0 0 0-2.553-.077l-6.35 2.44a3.35 3.35 0 0 0-1.93 4.32l2.43 6.35a3.379 3.379 0 0 0-1.23.22 2.437 2.437 0 0 0-1.134 2.343 2.424 2.424 0 0 0 2.99 2.084 2.433 2.433 0 0 0 1.694-3.227 2.23 2.23 0 0 0-.32-.54l-3-7.79a1.79 1.79 0 0 1 1-2.31l6.38-2.44a1.788 1.788 0 0 1 2.31 1l2.41 6.29c-.342.021-.68.095-1 .22a2.433 2.433 0 0 0-1.139 2.345 2.426 2.426 0 0 0 2.996 2.083 2.428 2.428 0 0 0 1.683-3.238 1.992 1.992 0 0 0-.64-.8ZM317.313 9.567l-2.83-7.42a3.357 3.357 0 0 0-4.32-1.93l-6.38 2.44a3.35 3.35 0 0 0-1.93 4.31l2.43 6.36a3.37 3.37 0 0 0-1.23.22 2.434 2.434 0 0 0-1.708 1.188 2.43 2.43 0 0 0 3.408 3.262 2.672 2.672 0 0 0 1.85-3.28 2.068 2.068 0 0 0-.32-.54l-3-7.79a1.789 1.789 0 0 1 1-2.31l6.43-2.36a1.791 1.791 0 0 1 2.31 1l2.4 6.3a3.29 3.29 0 0 0-1 .22 2.66 2.66 0 0 0-1.84 3.25 2.938 2.938 0 0 0 3.543 1.188 2.94 2.94 0 0 0 1.847-3.248 1.995 1.995 0 0 0-.66-.86ZM.873 100.147l2.84-7.43a3.36 3.36 0 0 1 4.32-1.93l6.38 2.44a3.35 3.35 0 0 1 1.93 4.32l-2.43 6.35c.42-.004.837.07 1.23.22a2.431 2.431 0 0 1-.502 4.368 2.429 2.429 0 0 1-3.159-1.817 2.43 2.43 0 0 1 .11-1.351c.082-.194.19-.376.32-.54l3-7.79a1.79 1.79 0 0 0-1-2.31l-6.39-2.44a1.79 1.79 0 0 0-2.31 1l-2.5 6.34c.343.02.68.095 1 .22a2.426 2.426 0 0 1 1.132 2.346 2.428 2.428 0 0 1-4.17 1.397 2.428 2.428 0 0 1-.511-2.553c.153-.341.4-.632.71-.84Zm20.699-79.831a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm174.141-9.599a1.502 1.502 0 0 0 1.061-2.56 1.502 1.502 0 0 0-2.561 1.06 1.501 1.501 0 0 0 1.5 1.5Zm-8.33 146.179a1.499 1.499 0 0 0 1.06-2.56 1.5 1.5 0 1 0-1.06 2.56Zm196.721-63.07a1.5 1.5 0 1 0-.001-2.999 1.5 1.5 0 0 0 .001 3ZM5.283 207.016a1.498 1.498 0 0 0 1.5-1.5 1.5 1.5 0 1 0-1.5 1.5Zm60.539-89.25a.749.749 0 1 0 0-1.498.749.749 0 0 0 0 1.498Zm45.74-99.659a.752.752 0 0 0 .75-.75.752.752 0 0 0-.75-.75.751.751 0 0 0-.53 1.28.75.75 0 0 0 .53.22Zm148.28-7.701a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm58.25 135.311a.749.749 0 0 0 .75-.75.75.75 0 1 0-.75.75Zm117.47-53a.752.752 0 0 0 .75-.75.752.752 0 0 0-.75-.75.751.751 0 0 0-.53 1.28c.141.14.332.22.53.22ZM384.533 6.076a.752.752 0 0 0 .75-.75.752.752 0 0 0-.75-.75.75.75 0 0 0 0 1.5Zm-235.42 214.721a.75.75 0 1 0 0-1.502.75.75 0 0 0 0 1.502Z"
    />
  </svg>
);

const ThumbBorder = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={152}
    height={152}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeMiterlimit={10}
      d="M49 16v-3m-33 3v-4m5 4V8m6 8V4m5 12V0m6 16V5m5 11V9m11 7v-5m6 5V8m5 8v-5m6 5V7m22 9v-3m43 3v-4m-5 4V3m-6 13v-4m-5 4V8m-6 8V4m-5 12V0m-6 16V5m-5 11V9m-11 7v-5m-5 5V8m-6 8v-5M49 136v3m-33-3v4m5-4v8m6-8v12m5-12v16m6-16v11m5-11v7m11-7v5m6-5v8m5-8v5m6-5v9m22-9v3m43-3v4m-5-4v13m-6-13v4m-5-4v8m-6-8v12m-5-12v16m-6-16v11m-5-11v7m-11-7v5m-5-5v8m-6-8v5m60-38h3m-3 33h4m-4-5h8m-8-6h12m-12-5h16m-16-6h11m-11-5h7m-7-11h5m-5-6h8m-8-5h5m-5-6h9m-9-22h3m-3-43h4m-4 5h13m-13 6h4m-4 5h8m-8 6h12m-12 5h16m-16 6h11m-11 5h7m-7 11h5m-5 5h8m-8 6h5M16 49h-3m3-33h-4m4 5H8m8 6H4m12 5H0m16 6H5m11 5H9m7 11h-5m5 6H8m8 5h-5m5 6H7m9 22h-3m3 43h-4m4-5H3m13-6h-4m4-5H8m8-6H4m12-5H0m16-6H5m11-5H9m7-11h-5m5-5H8m8-6h-5"
    />
  </svg>
);
