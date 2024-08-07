import {
  Button,
  HStack,
  Select,
  Skeleton,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { getPostComments } from "../api";
import Comment from "./Comment";

interface IComment {
  id: number;
  writer: {
    id: number;
    name: string;
  };
  replies_count: number;
  created_at: string;
  modified_at: string;
  detail: string;
  is_modified: boolean;
}

interface IReactions {
  postId: number;
  scrollToPost: VoidFunction;
}

export default function Reactions({ postId, scrollToPost }: IReactions) {
  const [commentVisible, setCommentVisible] = useState(true);
  const {
    isLoading,
    data: comments,
    refetch: refetchComments,
  } = useQuery<IComment[]>({
    queryKey: [`posts`, postId, `comments`],
    queryFn: getPostComments,
  });

  return (
    <>
      <HStack borderBottomWidth={2} pb={2}>
        <Skeleton isLoaded={!isLoading}>
          <Text>
            전체 반응{" "}
            <Text as="span" color="red.500">
              {comments?.reduce(
                (acc, comment) => acc + comment.replies_count,
                comments.length
              )}
            </Text>
            개
          </Text>
        </Skeleton>
        <Select w={100}>
          <option value={"register"}>등록순</option>
          <option value={"recent"}>최신순</option>
          <option value={"reply"}>답글순</option>
        </Select>
        <Spacer />
        <Button variant={"unstyled"} p={2} onClick={scrollToPost}>
          본문 보기
        </Button>
        <Text>|</Text>
        <Button
          variant={""}
          p={2}
          rightIcon={commentVisible ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
          onClick={() => setCommentVisible((current) => !current)}
        >
          {commentVisible ? "댓글 닫기" : "댓글 열기"}
        </Button>
        <Text>|</Text>
        <Button variant={"unstyled"} p={2} onClick={() => refetchComments()}>
          새로고침
        </Button>
      </HStack>
      {commentVisible && (
        <VStack my={2}>
          {isLoading ? (
            <>
              <Skeleton w={"full"} height={138} />
              <Skeleton w={"full"} height={90} />
              <Skeleton w={"full"} height={90} />
            </>
          ) : (
            <>
              {comments?.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  writer={comment.writer}
                  replies_count={comment.replies_count}
                  created_at={comment.created_at}
                  modified_at={comment.modified_at}
                  detail={comment.detail}
                  is_modified={comment.is_modified}
                />
              ))}
            </>
          )}
        </VStack>
      )}
    </>
  );
}
