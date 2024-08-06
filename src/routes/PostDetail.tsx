import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPost, getPostComments } from "../api";
import {
  Box,
  Button,
  Heading,
  HStack,
  Select,
  Skeleton,
  SkeletonText,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import {
  BiDislike,
  BiLike,
  BiSolidDislike,
  BiSolidLike,
  BiSolidUpArrow,
} from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
import { formatModifiedDate } from "../utils/dateUtils";

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
  num_of_reactions: number;
  is_mine: boolean;
  created_at: string;
  title: string;
  detail: string;
  views: number;
  is_modified: boolean;
  modified_at: string;
}
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

export default function PostDetail() {
  const { postId } = useParams();
  const { isLoading: isPostLoading, data: post } = useQuery<IPostDetail>({
    queryKey: [`posts`, postId],
    queryFn: getPost,
  });
  const { isLoading: isCommentsLoading, data: comments } = useQuery<IComment[]>(
    {
      queryKey: [`posts`, postId, `comments`],
      queryFn: getPostComments,
    }
  );

  return (
    <Box p={5}>
      <VStack align="start" borderBottomWidth={3} pb={2} mb={5}>
        <HStack w={"100%"} minH={"10"}>
          {isPostLoading ? (
            <Skeleton isLoaded={!isPostLoading} h={"29.25px"} w={"400px"} />
          ) : (
            <Heading fontSize={"22"}>{post?.title}</Heading>
          )}
          <Spacer />
          {post?.is_mine === true && (
            <HStack>
              <Button colorScheme="linkedin">수정</Button>
              <Button colorScheme="red">삭제</Button>
            </HStack>
          )}
        </HStack>
        <HStack w={"100%"}>
          {isPostLoading ? (
            <Skeleton w={"210px"} h={"24.01px"} />
          ) : (
            <>
              <Text>{post?.writer.name}</Text>
              <Text>|</Text>
              <Text>
                {post &&
                  format(new Date(post.created_at), "yyyy.MM.dd HH:mm:ss", {
                    locale: ko,
                  })}
              </Text>
            </>
          )}

          {post?.is_modified === true && (
            <Text>{formatModifiedDate(post.modified_at)}</Text>
          )}
          <Spacer />
          {isPostLoading ? (
            <Skeleton w={"150px"} h={"24.01px"} />
          ) : (
            <>
              <Text>조회 {post?.views}</Text>
              <Text>|</Text>
              <Text>좋아요 {post?.likes_count}</Text>
              <Text>|</Text>
            </>
          )}
          {isPostLoading ? (
            <Skeleton w={"79.3px"} h={"40px"} />
          ) : (
            <Button variant={"outline"} borderRadius={"20px"}>
              반응 {post?.num_of_reactions}
            </Button>
          )}
        </HStack>
      </VStack>
      {isPostLoading ? (
        <SkeletonText skeletonHeight={"4"} spacing={"2"} />
      ) : (
        <Text>{post?.detail}</Text>
      )}

      <HStack p={5} justifyContent={"center"}>
        <Box borderWidth="1px" borderRadius="lg" px={7} py={4}>
          <HStack spacing={5} alignItems="center">
            <HStack>
              <Skeleton isLoaded={!isPostLoading} minW={"8.63px"} minH={"24px"}>
                <Text color="red.500" fontWeight="bold">
                  {post?.likes_count}
                </Text>
              </Skeleton>
              <Button
                variant="solid"
                colorScheme="telegram"
                borderRadius="full"
                leftIcon={post?.is_like ? <BiSolidLike /> : <BiLike />}
              >
                좋아요
              </Button>
            </HStack>
            <HStack>
              <Button
                variant="outline"
                colorScheme="gray"
                borderRadius="full"
                leftIcon={post?.is_dislike ? <BiSolidDislike /> : <BiDislike />}
              >
                싫어요
              </Button>
              <Skeleton isLoaded={!isPostLoading} minW={"8.63px"} minH={"24px"}>
                <Text>{post?.dislikes_count}</Text>
              </Skeleton>
            </HStack>
          </HStack>
        </Box>
      </HStack>

      <HStack borderBottomWidth={2} pb={2}>
        <Text>
          전체 반응{" "}
          <Text as="span" color="red.500">
            {post?.num_of_reactions}
          </Text>
          개
        </Text>
        <Select w={100}>
          <option value={"register"}>등록순</option>
          <option value={"recent"}>최신순</option>
          <option value={"reply"}>답글순</option>
        </Select>
        <Spacer />
        <Button variant={"unstyled"} p={2}>
          본문 보기
        </Button>
        <Button variant={""} p={2} rightIcon={<BiSolidUpArrow />}>
          댓글 닫기
        </Button>
        <Button variant={"unstyled"} p={2}>
          새로고침
        </Button>
      </HStack>
      <VStack my={2}>
        {isCommentsLoading ? (
          <>
            <Skeleton w={"full"} height={138} />
            <Skeleton w={"full"} height={90} />
            <Skeleton w={"full"} height={90} />
          </>
        ) : (
          <>
            {comments?.map((comment) => (
              <VStack
                key={comment.id}
                align="start"
                spacing={2}
                p={4}
                borderWidth={1}
                borderRadius="md"
                w="full"
              >
                <HStack w="full">
                  <Text fontWeight="bold">{comment.writer.name}</Text>
                  <Spacer />
                  {comment.is_modified && (
                    <Text fontSize={"sm"} fontWeight={"semibold"}>
                      {formatModifiedDate(comment.modified_at)}
                    </Text>
                  )}
                  <Text fontSize="sm" color="gray.500">
                    {format(
                      new Date(comment.created_at),
                      "yyyy.MM.dd HH:mm:ss",
                      {
                        locale: ko,
                      }
                    )}
                  </Text>
                </HStack>
                <Text>{comment.detail}</Text>
                {comment.replies_count !== 0 && (
                  <Button
                    fontSize="sm"
                    colorScheme="telegram"
                    variant={"ghost"}
                    leftIcon={<BiSolidDownArrow />}
                    borderRadius={"20px"}
                  >
                    답글 {comment.replies_count}개
                  </Button>
                )}
              </VStack>
            ))}
          </>
        )}
      </VStack>
    </Box>
  );
}
