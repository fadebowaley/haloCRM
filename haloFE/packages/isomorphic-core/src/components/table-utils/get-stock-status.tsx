"use client";

import { Progressbar, Text } from "rizzui";

export function getStockStatus(status: number) {
  if (status === 0) {
    return (
      <>
        <Progressbar value={status} color="danger" className="h-1.5 w-24" />
        <Text className="pt-1.5 text-[13px] text-gray-500">out of stock </Text>
      </>
    );
  } else if (status <= 20) {
    return (
      <>
        <Progressbar value={status} color="warning" className="h-1.5 w-24" />
        <Text className="pt-1.5 text-[13px] text-gray-500">
          {status} low stock
        </Text>
      </>
    );
  } else {
    return (
      <>
        <Progressbar value={status} color="success" className="h-1.5 w-24" />
        <Text className="pt-1.5 text-[13px] text-gray-500">
          {status} in stock
        </Text>
      </>
    );
  }
}
