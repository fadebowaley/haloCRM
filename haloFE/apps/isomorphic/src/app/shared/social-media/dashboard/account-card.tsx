'use client';

import Image from 'next/image';
import { PiNotePencil } from 'react-icons/pi';
import { ActionIcon, Text, Title } from 'rizzui';
import WidgetCard from '@core/components/cards/widget-card';

const userInfo = {
  name: 'Albuz',
  username: '@albuz_1234',
  avatar: '/social-avatar.webp',
  profileInfo: [
    {
      title: 'Shots',
      value: '124',
    },
    {
      title: 'Followers',
      value: '1.2M',
    },
    {
      title: 'Following',
      value: '3654',
    },
  ],
};

export default function AccountCard({ className }: { className?: string }) {
  return (
    <WidgetCard
      title="Account"
      className={className}
      headerClassName="items-center"
      action={
        <>
          <ActionIcon variant="outline" rounded="full">
            <PiNotePencil className="size-4" />
          </ActionIcon>
        </>
      }
    >
      <div className="mb-6 mt-8 flex flex-col items-center justify-center space-y-8">
        <div className="inline-block rounded-full border-4 border-white bg-[#F0F1FF] p-1 outline outline-2 outline-[#464CDA]">
          <Image
            src={userInfo.avatar}
            width={60}
            height={60}
            alt="avatar"
            quality={100}
            className="size-14 rounded-full"
          />
        </div>
        <div className="text-center">
          <Title className="text-xl font-medium capitalize">
            {userInfo.name}
          </Title>
          <Text>{userInfo.username}</Text>
        </div>
        <div className="flex items-center justify-center gap-6">
          {userInfo.profileInfo.map((info) => (
            <div key={info.title}>
              <Text className="text-xl font-bold text-gray-900">
                {info.value}
              </Text>
              <Text>{info.title}</Text>
            </div>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
}
