import { atom, useAtom } from "jotai";

export type CommentsDataType = {
  id: string | number;
  name: string;
  avatar: string;
  commentTime: string;
  comment: string;
};

type ImageType = {
  url: string;
};

const imageAtom = atom<ImageType>({
  url: "https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/image-viewer.png",
});

const commentAtom = atom<CommentsDataType[]>([
  {
    id: 1,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    commentTime: "1 minute ago",
    comment: "I think we need to add a border radius of 10px to the image. It will look better.",
  },
  {
    id: 2,
    name: "Jane Doe",
    avatar: "https://randomuser.me/api/portraits/men/82.jpg",
    commentTime: "10 minute ago",
    comment: "Can we add a button to download the image? I think it will be useful for the users.",
  },
  {
    id: 3,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/women/24.jpg",
    commentTime: "30 minute ago",
    comment: "The color scheme is good. But I think we need to change the font size to 16px.",
  },
  {
    id: 4,
    name: "Jane Doe",
    avatar: "https://randomuser.me/api/portraits/women/76.jpg",
    commentTime: "Yesterday",
    comment:
      "Guys the design is done and ready for review. Please check and let me know if there is any changes.",
  },
]);

export function useImageViewer() {
  const [image, setImage] = useAtom(imageAtom);

  return { image, setImage };
}

export function useComment() {
  const [comment, setComment] = useAtom(commentAtom);

  return { comment, setComment };
}
