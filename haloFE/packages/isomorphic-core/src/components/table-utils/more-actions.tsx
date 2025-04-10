"use client";

import {
  PiShareFat,
  PiCopySimple,
  PiTrashSimple,
  PiDotsThreeOutlineVerticalFill,
} from "react-icons/pi";
import { ActionIcon, Box, Button, Popover } from "rizzui";

export function MoreActions({ onDelete }: { onDelete?: () => void }) {
  return (
    <Popover placement="bottom-end">
      <Popover.Trigger>
        <ActionIcon title="More Options" variant="text">
          <PiDotsThreeOutlineVerticalFill className="h-[18px] w-[18px] text-gray-500" />
        </ActionIcon>
      </Popover.Trigger>
      <Popover.Content className="z-0 min-w-[140px] px-2 py-2 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        {({ setOpen }) => (
          <Box className="text-gray-900">
            <Button
              variant="text"
              className="group flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              <PiCopySimple className="mr-2 h-5 w-5 text-gray-500 duration-300 group-hover:text-primary" />
              Copy
            </Button>
            <Button
              variant="text"
              className="group flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              <PiShareFat className="mr-2 h-5 w-5 text-gray-500 duration-300 group-hover:text-primary" />
              Share
            </Button>
            <Button
              variant="text"
              className="group flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
              onClick={() => {
                onDelete?.();
                setOpen(false);
              }}
            >
              <PiTrashSimple className="mr-2 h-5 w-5 text-gray-500 duration-300 group-hover:text-primary" />
              Delete
            </Button>
          </Box>
        )}
      </Popover.Content>
    </Popover>
  );
}
