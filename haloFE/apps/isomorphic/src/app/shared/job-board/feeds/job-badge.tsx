'use client';

import { useState } from 'react';
import cn from '@core/utils/class-names';
import { Badge, Button } from 'rizzui';

export default function JobBadge({ skills }: { skills: string[] }) {
  const [initialCount, setInitialCount] = useState(5);
  const [isMore, setIsMore] = useState(false);

  return (
    <div className="flex flex-wrap gap-2">
      {skills.slice(0, initialCount).map((skill, index) => {
        return <JobFeedCardBadge key={`skill-${index}`} text={skill} />;
      })}
      {!isMore && (
        <Button
          as="span"
          size="md"
          variant="text"
          className="h-auto cursor-pointer p-0"
          onClick={(e) => {
            e.stopPropagation();
            setInitialCount(initialCount + 3);
            setIsMore(true);
          }}
        >
          <JobFeedCardBadge text="+3 more" />
        </Button>
      )}
    </div>
  );
}

export function JobFeedCardBadge({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <Badge
      size="md"
      variant="flat"
      className={cn('bg-gray-100 text-gray-500', className)}
    >
      {text}
    </Badge>
  );
}
