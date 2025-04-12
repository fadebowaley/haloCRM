'use client';

import WidgetCard from '@core/components/cards/widget-card';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Input, NumberInput, Text } from 'rizzui';
import CountdownTimer from './countdown-timer';

export default function FeaturedBid({ className }: { className?: string }) {
  return (
    <WidgetCard className={className}>
      <div className="relative aspect-[309/200]">
        <Image
          src="https://isomorphic-furyroad.s3.amazonaws.com/public/auction-image-4.webp"
          alt="Somethinng"
          fill
          className="rounded-[10px]"
        />
        <div className="absolute left-auto right-3 top-3 rounded-lg bg-white bg-opacity-80 px-3 py-2 text-center">
          <Text as="span" className="block text-xs font-medium text-[#666666]">
            Ending In
          </Text>
          <CountdownTimer />
        </div>
      </div>
      <div className="mt-5">
        <Text
          as="span"
          className="mb-2 block text-xs font-semibold uppercase text-primary"
        >
          ID 598745
        </Text>
        <Link
          href="/"
          className="block text-lg font-semibold text-gray-900 lg:text-xl"
        >
          Retro Beige Car (1920)
        </Link>
        <p className="mt-3 text-sm">
          Retro Beige car on auction. Potential buyers should inspect the car’s
          condition and history before placing bids.
        </p>
        <div className="mt-8 flex gap-3">
          <div className="flex flex-1 flex-col items-center gap-1 rounded-xl border p-4">
            <span className="text-base font-bold text-gray-900">$2,000</span>
            <span className="text-sm">Instant Price</span>
          </div>
          <div className="flex flex-1 flex-col items-center gap-1 rounded-xl border p-4">
            <span className="text-base font-bold text-gray-900">$2,500</span>
            <span className="text-sm">Last Bid</span>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="col-span-full">
            <NumberInput
              // label="Place Your Bids"
              formatType="numeric"
              value="2600"
              prefix="$"
              displayType="input"
              className="[&_.rizzui-input-container]:h-12 [&_.rizzui-input-container]:text-base [&_.rizzui-input-field]:text-center [&_.rizzui-input-field]:font-bold [&_.rizzui-input-field]:text-gray-900"
              customInput={Input as React.ComponentType<unknown>}
              thousandSeparator=","
              {...{ label: 'Place Your Bids' }}
            />
          </div>
          <Button
            variant="solid"
            className="col-span-1 w-full bg-gray-900 text-white hover:!text-white dark:text-gray-950"
            size="lg"
          >
            Place a Bid
          </Button>
          <Button variant="outline" className="col-span-1 w-full" size="lg">
            View Item
          </Button>
        </div>
      </div>
    </WidgetCard>
  );
}
