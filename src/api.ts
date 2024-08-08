import { QueryFunctionContext } from "@tanstack/react-query";
import Cookie from "js-cookie";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
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

export const getCommentReplies = ({ queryKey }: QueryFunctionContext) => {
  const [, commentId] = queryKey;
  return instance
    .get(`comments/${commentId}/replies/`)
    .then((response) => response.data);
};

export const getMe = () =>
  instance.get("users/me/").then((response) => response.data);

export const logOut = () =>
  instance
    .post("users/log-out/", null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
