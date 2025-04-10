"use client";

import { Badge, Text } from "rizzui";

export function getTrafficShare(trafficShare: number) {
  if (trafficShare > 70) {
    return (
      <div className="flex items-center">
        <Badge color="success" renderAsDot />
        <Text className="ms-2 font-medium text-green-dark">
          {trafficShare}%
        </Text>
      </div>
    );
  }
  if (trafficShare > 40) {
    return (
      <div className="flex items-center">
        <Badge color="warning" renderAsDot />
        <Text className="ms-2 font-medium text-orange-dark">
          {trafficShare}%
        </Text>
      </div>
    );
  }
  return (
    <div className="flex items-center">
      <Badge color="danger" renderAsDot />
      <Text className="ms-2 font-medium text-red-dark">{trafficShare}%</Text>
    </div>
  );
}

export function getChartColorByTrafficShare(trafficShare: number) {
  if (trafficShare > 70) {
    return "#16a679";
  }
  if (trafficShare > 40) {
    return "#d89b0d";
  }
  return "#c5280c";
}
