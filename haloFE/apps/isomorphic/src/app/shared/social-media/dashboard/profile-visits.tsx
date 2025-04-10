'use client';

import {
  genderViewOptions,
  socialMediaProfileVisitsData,
} from '@/data/social-media-dashboard-data';
import WidgetCard from '@core/components/cards/widget-card';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import DropdownAction from '@core/components/charts/dropdown-action';
import { useTheme } from 'next-themes';
import { useMedia } from 'react-use';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function ProfileVisits({ className }: { className?: string }) {
  const isSM = useMedia('(max-width: 640px)', false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      className={className}
      title="Profile Visits"
      headerClassName="items-center"
      action={
        <DropdownAction
          className="rounded-lg border"
          options={genderViewOptions}
          onChange={handleChange}
        />
      }
    >
      <div className="custom-scrollbar overflow-x-auto scroll-smooth">
        <div className="mt-6 h-[300px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isSM && { minWidth: '500px' })}
          >
            <BarChart
              data={socialMediaProfileVisitsData}
              margin={{
                top: 22,
                left: -15,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <CartesianGrid strokeDasharray="1 0" vertical={false} />
              <XAxis dataKey="day" tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip formattedNumber />} />
              <Bar
                barSize={24}
                fill={'#59A7FF'}
                dataKey={'visits'}
                radius={[0, 0, 6, 6]}
                activeBar={<Rectangle fill="#2CDDC7" stroke="#2CDDC7" />}
                activeIndex={getActiveIndex()}
                background={{ fill: isDark ? '#333333' : '#F1F1F2', radius: 6 }}
              >
                <LabelList dataKey="visits" content={renderCustomizedLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </WidgetCard>
  );
}

function getActiveIndex() {
  let todayName = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
  });
  let activeIndex = socialMediaProfileVisitsData.findIndex(
    (data) => data.day === todayName
  );

  return activeIndex;
}

function renderCustomizedLabel(props: any) {
  const { x, y, index } = props;
  let isActive = index === getActiveIndex();

  return (
    <g>
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2" />
        </filter>
      </defs>
      <rect
        x={x - 8}
        y={y - 4}
        width="40"
        height="4"
        rx="4"
        fill={isActive ? '#2CDDC7' : '#59A7FF'}
        filter="url(#shadow)"
      />
    </g>
  );
}
