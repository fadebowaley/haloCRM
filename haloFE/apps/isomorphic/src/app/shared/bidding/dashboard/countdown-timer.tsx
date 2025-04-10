'use client';

import Countdown from 'react-countdown';
import { Flex, Text } from 'rizzui';

export function CountdownRenderer({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: any) {
  if (completed) {
    return (
      <Flex>
        <span className="font-semibold text-[#111111]">
          Countdown completed
        </span>
      </Flex>
    );
  } else {
    return (
      <Flex gap="2">
        <Text as="span" className="font-semibold text-[#111111]">
          {days < 10 ? `0${days}` : days}d
        </Text>
        <Text as="span" className="font-semibold text-[#111111]">
          {hours < 10 ? `0${hours}` : hours}h
        </Text>
        <Text as="span" className="font-semibold text-[#111111]">
          {minutes < 10 ? `0${minutes}` : minutes}m
        </Text>
        <Text as="span" className="font-semibold text-[#111111]">
          {seconds < 10 ? `0${seconds}` : seconds}s
        </Text>
      </Flex>
    );
  }
}

export default function CountdownTimer({ dateTime }: { dateTime?: Date }) {
  const date = dateTime ?? Date.now() + 2000000000;
  return <Countdown date={date} renderer={CountdownRenderer} />;
}
