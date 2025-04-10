"use client";

import { Badge, Flex, Text } from "rizzui";

export function getEngagementRate(engagementRate: number) {
  if (engagementRate > 70) {
    return (
      <Flex align="center" justify="end" className="gap-0">
        <Badge color="success" renderAsDot />
        <Text className="ms-2 font-medium text-green-dark">
          {engagementRate}%
        </Text>
      </Flex>
    );
  }
  if (engagementRate > 40) {
    return (
      <Flex align="center" justify="end" className="gap-0">
        <Badge color="warning" renderAsDot />
        <Text className="ms-2 font-medium text-orange-dark">
          {engagementRate}%
        </Text>
      </Flex>
    );
  }
  return (
    <Flex align="center" justify="end" className="gap-0">
      <Badge color="danger" renderAsDot />
      <Text className="ms-2 font-medium text-red-dark">{engagementRate}%</Text>
    </Flex>
  );
}
