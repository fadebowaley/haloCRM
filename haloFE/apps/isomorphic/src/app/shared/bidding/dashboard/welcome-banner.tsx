import Image from 'next/image';
import { Box } from 'rizzui/box';
import { Flex } from 'rizzui/flex';
import { Text, Title } from 'rizzui/typography';

const counterData = [
  {
    name: 'Participated',
    value: '478',
  },
  {
    name: 'Amount',
    value: '5.2k',
  },
  {
    name: 'Wining Pledges',
    value: '257',
  },
  {
    name: 'Time Spent',
    value: '12h 30m',
  },
];

export default function WelcomeBanner() {
  return (
    <Flex className="relative z-[1] flex-col justify-between overflow-hidden rounded-xl bg-[linear-gradient(268.48deg,#7373C5_0%,#3F3C83_94.14%)] p-5 @3xl:px-[30px] @3xl:py-8">
      <Box className="absolute inset-0 -z-[1] hidden @xl:block">
        <Image
          src="https://isomorphic-furyroad.s3.amazonaws.com/public/welcome-bg.webp"
          alt="welcome background"
          fill
          className="object-cover object-center"
        />
      </Box>
      <Flex direction="col" gap="2">
        <Title as="h3" className="font-inter font-semibold text-white">
          Welcome Back 👋
        </Title>
        <Text className="text-white text-opacity-80">
          Track your tasks and current activities here.
        </Text>
      </Flex>
      <Flex
        justify="between"
        className="mt-5 flex-wrap gap-x-10 @3xl:flex-nowrap"
      >
        <Box className="flex-grow">
          <Box className="relative mb-5 me-3 size-20 shrink-0 overflow-hidden rounded-full bg-gray-100">
            <Image
              src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-02.webp"
              alt="welcome banner"
              fill
              sizes="(max-width: 768px) 100vw"
              className="object-cover"
            />
          </Box>
          <Title
            as="h4"
            className="text-nowrap font-inter font-semibold text-white"
          >
            Michael Anderson
          </Title>
          <Text as="span" className="mt-1 text-sm text-white text-opacity-80">
            @michaelanderson
          </Text>
        </Box>
        <Flex className="w-auto flex-wrap gap-x-5 gap-y-3 self-end">
          {counterData.map((counter) => (
            <Box key={counter.name} className="@5xl:text-center">
              <Title as="h3" className="font-inter font-semibold text-white">
                {counter.value}
              </Title>
              <Text as="span" className="text-sm text-white opacity-80">
                {counter.name}
              </Text>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
