"use client";

import { Badge, Flex, Text } from "rizzui";

export function getBounceRate(bounceRate: number) {
  if (bounceRate > 30) {
    return (
      <Flex align="center" justify="end" className="gap-0">
        <Badge color="danger" renderAsDot />
        <Text className="ms-2 font-medium text-red-dark">{bounceRate}%</Text>
      </Flex>
    );
  }
  if (bounceRate > 20) {
    return (
      <Flex align="center" justify="end" className="gap-0">
        <Badge color="warning" renderAsDot />
        <Text className="ms-2 font-medium text-orange-dark">{bounceRate}%</Text>
      </Flex>
    );
  }
  return (
    <Flex align="center" justify="end" className="gap-0">
      <Badge color="success" renderAsDot />
      <Text className="ms-2 font-medium text-green-dark">{bounceRate}%</Text>
    </Flex>
  );
}
