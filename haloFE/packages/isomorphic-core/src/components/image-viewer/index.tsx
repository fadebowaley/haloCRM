import Image from "next/image";
import ToolBar from "./toolbar";
import { useState } from "react";
import cn from "../../utils/class-names";
import { useImageViewer } from "./storage";
import ConversationBar from "./conversation-bar";
import { useIsMounted } from "../../hooks/use-is-mounted";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function ImageViewer() {
  const mounted = useIsMounted();
  const { image } = useImageViewer();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "w-full h-[calc(100vh-128px)] relative grid gap-0",
        isOpen && "@sm:grid-cols-[1fr_380px] grid-cols-[1fr_340px]"
      )}
    >
      <TransformWrapper
        minScale={0.1}
        centerOnInit={true}
        limitToBounds={false}
      >
        <TransformComponent wrapperClass="!w-full !h-full cursor-grab border border-muted">
          {mounted ? (
            <>
              <Image
                width={1200}
                height={900}
                src={image.url}
                alt="view image"
              />
            </>
          ) : null}
        </TransformComponent>
      </TransformWrapper>
      {isOpen && <ConversationBar />}
      <ToolBar onClick={() => setIsOpen(!isOpen)} />
    </div>
  );
}
