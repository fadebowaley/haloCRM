"use client";

import AvatarCard from "../../ui/avatar-card";
import { ActionIcon, Button, Input, Text, Tooltip } from "rizzui";
import {
  PiGitCommit,
  PiHeartFill,
  PiCheckCircle,
  PiShareNetwork,
  PiPaperPlaneTiltFill,
} from "react-icons/pi";
import { useComment } from "./storage";
import { createId } from "@paralleldrive/cuid2";

export default function ConversationBar() {
  const { comment } = useComment();
  return (
    <div className="flex flex-col border border-muted border-s-0 h-full overflow-y-auto custom-scrollbar relative">
      <div className="px-4 py-3 border-b border-muted space-y-6">
        <AvatarCard
          src="https://randomuser.me/api/portraits/women/76.jpg"
          name="Fay Doe"
          description="Tuesday"
        />
        <Text className="font-medium text-xl">
          Productivity app wait list page concept
        </Text>

        <div className="flex items-center justify-between">
          <ActionIcon
            variant="text"
            color="danger"
            rounded="full"
            className="hover:bg-red-100 dark:hover:bg-red-50/10 dark:hover:text-red-600"
          >
            <PiHeartFill className="size-[18px]" />
          </ActionIcon>

          <ActionIcon
            variant="text"
            rounded="full"
            className="hover:bg-gray-200"
          >
            <PiShareNetwork className="size-[18px]" />
          </ActionIcon>
        </div>
      </div>
      <div className="grow divide-y space-y-4 px-6 pb-6">
        {comment.length < 1 && (
          <div className="text-center pt-6">
            <Text className="text-2xl text-gray-300">
              <PiGitCommit className="size-20 mx-auto" />
            </Text>
            <Text className="text-2xl text-gray-300">No comments yet</Text>
          </div>
        )}
        {comment?.map((c) => (
          <div key={c.id} className="pt-4 group">
            <div className="flex items-start justify-between mb-3">
              <AvatarCard
                avatarProps={{
                  size: "sm",
                  name: c.name,
                }}
                name={c.name}
                src={c.avatar}
                description={c.commentTime}
              />
              <Tooltip placement="left" content="Mark as Resolved">
                <ActionIcon
                  size="sm"
                  variant="text"
                  className="hover:bg-gray-200 hidden group-hover:flex"
                >
                  <PiCheckCircle className="size-[18px]" />
                </ActionIcon>
              </Tooltip>
            </div>
            <Text className="text-xs">{c.comment}</Text>
          </div>
        ))}
      </div>
      <CommentForm />
    </div>
  );
}

function CommentForm() {
  const { setComment } = useComment();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newComment = {
      id: createId(),
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/76.jpg",
      commentTime: "Now",
      comment: e.currentTarget.comment.value,
    };
    setComment((prev) => [newComment, ...prev]);
    e.currentTarget.reset();
  }
  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex items-end gap-2 p-6 bg-white dark:bg-gray-100 border-t border-muted sticky bottom-0 inset-x-0"
    >
      <Input
        className="grow"
        name="comment"
        label="Add a comment"
        placeholder="Write your comment..."
      />
      <Button type="submit">
        <PiPaperPlaneTiltFill className="size-5" />
      </Button>
    </form>
  );
}
