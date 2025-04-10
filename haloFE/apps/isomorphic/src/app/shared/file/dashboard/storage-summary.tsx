'use client';

import { Flex, Text } from 'rizzui';
import WidgetCard from '@core/components/cards/widget-card';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const data = [
  { name: 'Available storage', value: 22 },
  { name: 'Total used storage', value: 78 },
];
const COLORS = ['#BFDBFE', '#0070F3'];

export default function StorageSummary({ className }: { className?: string }) {
  return (
    <WidgetCard
      title={'Used Storage'}
      headerClassName="hidden"
      className={className}
    >
      <div className="h-[373px] w-full @sm:py-3">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart className="[&_.recharts-layer:focus]:outline-none [&_.recharts-sector:focus]:outline-none dark:[&_.recharts-text.recharts-label]:first-of-type:fill-white">
            <Pie
              data={data}
              cornerRadius={40}
              innerRadius={100}
              outerRadius={120}
              paddingAngle={10}
              fill="#BFDBFE"
              stroke="rgba(0,0,0,0)"
              dataKey="value"
            >
              <Label
                width={30}
                position="center"
                content={
                  <CustomLabel value1={data[1].value} value2={'Used of 100'} />
                }
              ></Label>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        {data.map((item, index) => (
          <Flex
            key={item.name}
            align="center"
            justify="between"
            className="mb-4 gap-0 border-b border-muted pb-4 last:mb-0 last:border-0 last:pb-0"
          >
            <Flex align="center" className="gap-0">
              <span
                className="me-2 size-2 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
              <Text
                as="span"
                className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700"
              >
                {item.name}
              </Text>
            </Flex>
            <Text as="span">{item.value}%</Text>
          </Flex>
        ))}
      </div>
    </WidgetCard>
  );
}

function CustomLabel(props: any) {
  const { cx, cy } = props.viewBox;
  return (
    <>
      <text
        x={cx}
        y={cy - 5}
        fill="#111111"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan alignmentBaseline="middle" fontSize="36px">
          {props.value1} GB
        </tspan>
      </text>
      <text
        x={cx}
        y={cy + 20}
        fill="#666666"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan fontSize="14px">{props.value2}</tspan>
      </text>
    </>
  );
}
