import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

export const getPosts = () =>
  instance.get("posts/").then((response) => response.data);

export const getPost = ({ queryKey }: QueryFunctionContext) => {
  const [, postId] = queryKey;
  return instance.get(`posts/${postId}/`).then((response) => response.data);
};

export const getPostComments = ({ queryKey }: QueryFunctionContext) => {
  const [, postId] = queryKey;
  return instance
    .get(`posts/${postId}/comments/`)
    .then((response) => response.data);
};
