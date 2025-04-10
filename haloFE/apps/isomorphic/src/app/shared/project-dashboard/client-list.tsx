'use client';

import { clientList } from '@/data/project-dashboard';
import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';
import Link from 'next/link';
import { Avatar, Box, Button, Flex, Progressbar, Text } from 'rizzui';

export default function ProjectClientList({
  className,
}: {
  className?: string;
}) {
  return (
    <>
      <WidgetCard
        title="Client List"
        headerClassName="items-center"
        className={cn('@container dark:bg-gray-100/50', className)}
        action={
          <Link href={'#'}>
            <Button as="span" variant="text" className="h-auto p-0 underline">
              View All
            </Button>
          </Link>
        }
      >
        <div className="custom-scrollbar overflow-x-auto scroll-smooth -me-2 mt-6 h-[24rem] pe-2">
          <Box className="space-y-3.5">
            {clientList.map((client) => (
              <Box
                key={client.id}
                className="space-y-4 rounded-lg border border-muted/50 px-4 py-3 @lg:flex @lg:items-center @lg:justify-between @lg:space-y-0"
              >
                <Flex align="center">
                  <Avatar src={client.avatar} name={client.name} />
                  <Box className="space-y-0.5">
                    <Text className="flex items-center gap-2 text-gray-700">
                      <strong>{client.name}</strong> {client.address}
                    </Text>
                    <Text>{client.workType}</Text>
                  </Box>
                </Flex>
                <Progressbar
                  className="@lg:max-w-44"
                  value={client.workProgress}
                  label={`${client.workProgress}%`}
                />
              </Box>
            ))}
          </Box>
        </div>
      </WidgetCard>
    </>
  );
}
