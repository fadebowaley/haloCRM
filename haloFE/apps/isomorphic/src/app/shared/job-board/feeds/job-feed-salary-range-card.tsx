'use client';

import { Input, Text } from 'rizzui';
import cn from '@core/utils/class-names';
import React, { useState } from 'react';
import RangeSlider from '@core/ui/range-slider';

interface SalaryRangeProps {
  title: string;
  min: number;
  max: number;
  initialMin: number;
  initialMax: number;
}

export default function JobFeedSalaryRangeCard(props: SalaryRangeProps) {
  const { title, min, max, initialMin, initialMax } = props;

  const [state, setState] = useState({
    min: initialMin,
    max: initialMax,
  });

  function handleRangeChange(value: any) {
    setState({
      min: value[0],
      max: value[1],
    });
  }
  function handleMaxChange(max: number) {
    setState({
      ...state,
      max: max || state.min,
    });
  }
  function handleMinChange(min: number) {
    setState({
      ...state,
      min: min || 0,
    });
  }

  return (
    <div className="rounded-[10px] border border-muted p-3 sm:p-5">
      <Text className="font-semibold">{title}</Text>
      <div className="my-6 grid grid-cols-2 items-center justify-between gap-5 text-sm font-bold">
        <div className="space-y-2 rounded-lg border p-2">
          <Text className="font-medium">Min</Text>
          <Input
            variant="flat"
            type="number"
            value={state.min}
            onChange={(e) => handleMinChange(parseInt(e.target.value))}
            className="w-full border-none text-sm font-bold outline-none focus:shadow-none focus:ring-0"
            min={0}
            max={state.max}
            readOnly
            prefix="$"
          />
        </div>
        <div className="space-y-2 rounded-lg border p-2">
          <Text className="font-medium">Min</Text>
          <Input
            variant="flat"
            type="number"
            value={state.max}
            onChange={(e) => handleMaxChange(parseInt(e.target.value))}
            className="w-full border-none text-sm font-bold outline-none focus:shadow-none focus:ring-0"
            min={state.min}
            readOnly
            prefix="$"
          />
        </div>
      </div>
      <RangeSlider
        range
        min={min}
        max={max}
        value={[state.min, state.max]}
        onChange={(value: any) => handleRangeChange(value)}
        className={cn('[&>.rc-slider-step]:hidden')}
      />
    </div>
  );
}
