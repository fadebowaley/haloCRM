'use client';

import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';
import { ReportAnalyticsTable } from './table';
import { Button } from 'rizzui';

export default function ReportAnalysis({ className }: { className?: string }) {
  return (
    <WidgetCard
      title="Report Analytics"
      headerClassName="items-center mb-8"
      className={cn('@container dark:bg-gray-100/50', className)}
      action={<Button variant="outline">Full Results</Button>}
    >
      <ReportAnalyticsTable />
    </WidgetCard>
  );
}
