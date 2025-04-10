export function getChartColorByEngagementRate(trafficShare: number) {
  if (trafficShare > 70) {
    return '#16a679';
  }
  if (trafficShare > 40) {
    return '#d89b0d';
  }
  return '#c5280c';
}
