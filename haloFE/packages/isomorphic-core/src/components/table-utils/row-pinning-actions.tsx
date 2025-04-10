"use client";

import { PiPushPin, PiPushPinSlash } from "react-icons/pi";
import { ActionIcon, Tooltip } from "rizzui";

export function PinningActions({
  isPinned,
  onPinTop,
  onPinBottom,
  onUnpin,
}: {
  isPinned: boolean;
  onPinTop: () => void;
  onPinBottom: () => void;
  onUnpin: () => void;
}) {
  return (
    <>
      {isPinned ? (
        <ActionIcon
          size="sm"
          variant="outline"
          onClick={onUnpin}
          aria-label="Unpin the row"
          className="w-7 shrink-0"
        >
          <PiPushPinSlash className="size-4" />
        </ActionIcon>
      ) : (
        <>
          <Tooltip
            size="sm"
            color="invert"
            placement="left"
            content="Pin to top"
          >
            <ActionIcon
              size="sm"
              variant="outline"
              onClick={onPinTop}
              aria-label="Pin the row on top"
              className="w-7 shrink-0"
            >
              <PiPushPin className="size-4 rotate-[135deg]" />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            size="sm"
            color="invert"
            placement="left"
            content="Pin to bottom"
          >
            <ActionIcon
              size="sm"
              variant="outline"
              onClick={onPinBottom}
              aria-label="Pin the row on bottom"
              className="w-7 shrink-0"
            >
              <PiPushPin className="size-4 -rotate-45" />
            </ActionIcon>
          </Tooltip>
        </>
      )}
    </>
  );
}
