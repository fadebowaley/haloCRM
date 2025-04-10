'use client';

import { useState } from 'react';
import { Avatar, Button, Text } from 'rizzui';

type FollowerRowProps = {
  row: {
    id: number;
    name: string;
    avatar: string;
    buttonText: string[];
  };
};

type FollowModalProps = {
  data: {
    id: number;
    name: string;
    avatar: string;
    buttonText: string[];
  }[];
};

export default function FollowerModal({ data }: FollowModalProps) {
  return (
    <div className="custom-scrollbar -mr-3 h-[400px] overflow-y-auto scroll-smooth pr-3 md:h-[450px]">
      {data?.map((item) => <FollowerRow row={item} key={item.id} />)}
    </div>
  );
}

function FollowerRow({ row }: FollowerRowProps) {
  const [state, setState] = useState(false);
  return (
    <div className="flex items-center justify-between pb-3 pt-2 lg:pb-5 lg:first:pt-4">
      <div className="flex items-center gap-2">
        <Avatar size="lg" name={row.name} src={row.avatar} />
        <Text className="font-lexend font-medium capitalize text-gray-900">
          {row.name}
        </Text>
      </div>
      <Button
        size="sm"
        rounded="pill"
        variant={state ? 'solid' : 'flat'}
        onClick={() => setState(() => !state)}
        className="font-medium capitalize md:h-9 md:px-4"
      >
        {state ? row.buttonText[0] : row.buttonText[1]}
      </Button>
    </div>
  );
}
