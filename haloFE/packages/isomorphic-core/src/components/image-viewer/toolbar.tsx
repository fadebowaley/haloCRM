"use client";

import { ChangeEvent } from "react";
import { useImageViewer } from "./storage";
import { ActionIcon, FileInput } from "rizzui";
import { PiChatCircleFill } from "react-icons/pi";

export default function ToolBar({ onClick }: { onClick?: () => void }) {
  const { setImage } = useImageViewer();

  function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result as string;
      setImage({ url: base64Data });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="fixed sm:absolute bottom-2 p-2 rounded-full start-1/2 w-[180px] -translate-x-1/2 bg-gray-300 backdrop-blur-sm flex items-center justify-center gap-2">
      <div className="max-w-[110px] w-full">
        <FileInput
          rounded="pill"
          accept="image/*"
          className="w-full"
          onChange={handleFileSelect}
          inputClassName="p-0 ps-px dark:ring-primary dark:border-primary"
        />
      </div>
      <ActionIcon rounded="full" onClick={onClick}>
        <PiChatCircleFill className="size-5" />
      </ActionIcon>
    </div>
  );
}
