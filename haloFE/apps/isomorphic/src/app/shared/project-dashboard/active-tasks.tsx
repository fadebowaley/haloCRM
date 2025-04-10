'use client';

import {
  activeTaskMonths,
  activeTasksData,
  activeTaskViewOptions,
} from '@/data/project-dashboard';
import WidgetCard from '@core/components/cards/widget-card';
import DropdownAction from '@core/components/charts/dropdown-action';
import cn from '@core/utils/class-names';
import { Avatar, Box, Flex, Text, Tooltip } from 'rizzui';

export default function ProjectActiveTasks({
  className,
}: {
  className?: string;
}) {
  function handleChange(viewType: string) {}

  return (
    <WidgetCard
      title="Active Task"
      headerClassName="items-center"
      action={
        <DropdownAction
          onChange={handleChange}
          dropdownClassName="!z-0"
          className="rounded-md border"
          options={activeTaskViewOptions}
        />
      }
      className={cn(
        'overflow-hidden @container dark:bg-gray-100/50',
        className
      )}
    >
      <div className="custom-scrollbar overflow-x-auto scroll-smooth -mb-3 mt-6 pb-3">
        <Box className="min-w-[900px] space-y-2">
          {activeTasksData.map((task, index) => (
            <Box
              key={index}
              className="group grid grid-cols-[120px_1fr] gap-2 text-center"
            >
              <Box className="rounded-md bg-gray-100 px-2 py-3 group-hover:bg-gray-200">
                <Text className="text-gray-500">{task.title}</Text>
              </Box>
              <Box className="grid grid-cols-12 gap-1 rounded-md bg-gray-50 group-hover:bg-[#6CA787]/10 dark:bg-gray-100">
                <Tooltip
                  placement="top"
                  className="p-0"
                  arrowClassName="fill-gray-0 dark:fill-gray-200"
                  content={<TooltipContent />}
                >
                  <Flex
                    align="center"
                    justify="center"
                    className="h-full gap-0 rounded-md bg-[#6CA787]"
                    style={{
                      gridColumnStart: task.start,
                      gridColumnEnd: task.end,
                    }}
                  />
                </Tooltip>
              </Box>
            </Box>
          ))}
          <Box className="grid grid-cols-[120px_1fr] gap-1 text-center">
            <Box />
            <Box className="mt-2 grid grid-cols-12 gap-1 text-center">
              {activeTaskMonths.map((month, index) => (
                <Text key={index} className="text-gray-500">
                  {month}
                </Text>
              ))}
            </Box>
          </Box>
        </Box>
      </div>
    </WidgetCard>
  );
}

function TooltipContent() {
  return (
    <Box className="rounded-md bg-gray-0 px-4 py-3 text-start text-gray-700 dark:bg-gray-200">
      <Flex align="center" gap="3" className="mb-3">
        <Avatar
          size="sm"
          name="John Doe"
          className="ring-2 ring-blue ring-offset-2"
          src="https://randomuser.me/api/portraits/women/40.jpg"
        />
        <Box>
          <Text className="text-base font-semibold">Fred Chaparro</Text>
          <Text className="text-sm">@fredchaparro</Text>
        </Box>
      </Flex>
      <Box className="max-w-[240px] text-sm">
        <Text>Data Analyst, love to work with isomorphic 🎉 </Text>
        <Box className="mt-3 inline-flex gap-3">
          <Text>
            <Text as="span" className="font-medium">
              80%
            </Text>{' '}
            Done
          </Text>
          <Text>
            <Text as="span" className="font-medium">
              20%
            </Text>{' '}
            In Progress
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
