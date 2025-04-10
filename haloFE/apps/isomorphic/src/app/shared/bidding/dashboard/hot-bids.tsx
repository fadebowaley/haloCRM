import { biddingData } from '@/data/bidding-data';
import { toCurrency } from '@core/utils/to-currency';
import Image from 'next/image';
import Link from 'next/link';
import { Box } from 'rizzui/box';
import { Button } from 'rizzui/button';
import { Flex } from 'rizzui/flex';
import { Grid } from 'rizzui/grid';
import { Text, Title } from 'rizzui/typography';
// import CountdownTimer from './countdown-timer';
import cn from '@core/utils/class-names';

type BidType = (typeof biddingData)[0];

export default function HotBids() {
  return (
    <Box className="col-span-full @container">
      <Flex justify="between" align="center" className="mb-3 2xl:mb-5">
        <Title as="h3" className="text-lg font-semibold xl:text-xl">
          Hot Bids
        </Title>
        <Link
          href={'/file-manager'}
          className="text-sm font-medium text-gray-900 hover:underline"
        >
          View all
        </Link>
      </Flex>
      <Grid className="grid-cols-1 gap-6 @xl:grid-cols-2 @4xl:grid-cols-3">
        {biddingData.map((bid) => (
          <BidItem
            key={bid.id}
            {...bid}
            className="@xl:[&:nth-child(3)]:hidden @4xl:[&:nth-child(3)]:flex"
          />
        ))}
      </Grid>
    </Box>
  );
}

export function BidItem({
  id,
  authorName,
  title,
  currentBidPrice,
  endingIn,
  imageUrl,
  className,
}: BidType & {
  className?: string;
}) {
  return (
    <Flex
      direction="col"
      gap="2"
      className={cn(
        'rounded-xl border border-muted bg-white p-3 dark:bg-gray-50',
        className
      )}
    >
      <Box className="relative aspect-[309/200] w-full">
        <Image src={imageUrl} alt={title} fill className="rounded-[10px]" />
      </Box>
      <Flex direction="col" gap="2" className="mt-2 grow px-3">
        <Text
          as="span"
          className="block text-xs font-semibold uppercase text-primary"
        >
          ID {id}
        </Text>
        <Link href="/" className="block text-base font-medium text-gray-900">
          {title}
        </Link>
        <Flex align="end" justify="between" className="mt-auto flex-wrap">
          <Flex direction="col" className="w-auto gap-y-2">
            <Text as="span" className="block text-xs">
              {authorName}
            </Text>
            <Text as="span" className="text-xs">
              Current Bid:{' '}
              <span className="font-semibold text-gray-900">
                {toCurrency(currentBidPrice, true)}
              </span>
            </Text>
          </Flex>
          <Button variant="outline" size="sm">
            View Item
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
