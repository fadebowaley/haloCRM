import TicketsTable from '@/app/shared/support/dashboard/tickets/table';
import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';

export default function PendingShipments({
  className,
}: {
  className?: string;
}) {
  return (
    <WidgetCard
      title="Tickets"
      descriptionClassName="mt-2"
      className={cn('p-0 lg:p-0', className)}
      headerClassName="mb-6 px-5 pt-5 lg:px-7 lg:pt-7 items-center"
      description="Summary of the tickets that has been assigned to you...."
    >
      <TicketsTable />
    </WidgetCard>
  );
}
