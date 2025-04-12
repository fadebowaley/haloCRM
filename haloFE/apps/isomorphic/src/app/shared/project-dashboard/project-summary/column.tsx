'use client';

import CircleProgressBar from '@core/components/charts/circle-progressbar';
import { createColumnHelper } from '@tanstack/react-table';
import { ProjectSummaryDataType } from '.';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';

const columnHelper = createColumnHelper<ProjectSummaryDataType>();

export const defaultColumns = [
  columnHelper.display({
    id: 'project',
    size: 220,
    header: 'Project',
    cell: ({ row: { original } }) => original.project,
  }),
  columnHelper.display({
    id: 'manager',
    size: 160,
    header: 'Project Manager',
    cell: ({ row: { original } }) => original.manager,
  }),
  columnHelper.display({
    id: 'dueData',
    size: 120,
    header: 'Due date',
    cell: ({ row: { original } }) => original.dueData,
  }),
  columnHelper.display({
    id: 'assignedTo',
    size: 160,
    header: 'Assigned to',
    cell: ({ row: { original } }) => original.assignedTo,
  }),
  columnHelper.display({
    id: 'status',
    size: 140,
    header: 'Status',
    cell: ({ row: { original } }) => getStatusBadge(original.status),
  }),
  columnHelper.display({
    id: 'progress',
    size: 100,
    header: 'Progress',
    cell: ({ row: { original } }) => (
      <div className="ps-4 text-[10px]">
        <CircleProgressBar
          size={40}
          strokeWidth={4}
          stroke="#f0f0f0"
          percentage={original.progress}
          label={`${original.progress}%`}
          progressColor={getProgressColor(original.status)}
        />
      </div>
    ),
  }),
];

function getProgressColor(status: string) {
  switch (status) {
    case 'on_going':
      return '#EE5D26';
    case 'completed':
      return '#0DA000';
    case 'at_risk':
      return '#EE201C';
    default:
      return '#484848';
  }
}
