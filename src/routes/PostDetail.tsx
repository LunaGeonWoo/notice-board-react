import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../api";

interface IPostDetail {
  id: number;
  writer: {
    id: number;
    name: string;
  };
  likes_count: number;
  dislikes_count: number;
  is_like: boolean;
  is_dislike: boolean;
  created_at: string;
  title: string;
  detail: string;
  views: number;
  is_modified: boolean;
  modified_at: string;
}

export default function PostDetail() {
  const { postId } = useParams();
  const { isLoading, data: post } = useQuery<IPostDetail>({
    queryKey: [`posts`, postId],
    queryFn: getPost,
  });
  return <h1>Hello</h1>;
}
