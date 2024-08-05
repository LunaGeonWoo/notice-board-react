import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../api";
import {
  Box,
  Button,
  Heading,
  HStack,
  Skeleton,
  SkeletonText,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";

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

export default function PostDetail() {
  const { postId } = useParams();
  const { isLoading, data: post } = useQuery<IPostDetail>({
    queryKey: [`posts`, postId],
    queryFn: getPost,
  });

  return (
    <Box p={5}>
      <VStack align="start" borderBottomWidth={3} pb={2} mb={5}>
        <HStack w={"100%"} minH={"10"}>
          {isLoading ? (
            <Skeleton isLoaded={!isLoading} h={"29.25px"} w={"400px"} />
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
          {isLoading ? (
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
            <Text>
              {(() => {
                const modifiedDate = new Date(post.modified_at);
                const now = new Date();
                const diffInSeconds = Math.floor(
                  (now.getTime() - modifiedDate.getTime()) / 1000
                );
                const diffInMinutes = Math.floor(diffInSeconds / 60);
                const diffInHours = Math.floor(diffInMinutes / 60);
                const diffInDays = Math.floor(diffInHours / 24);

                if (diffInDays > 0) {
                  return `( ${diffInDays}일 전에 수정됨 )`;
                } else if (diffInHours > 0) {
                  return `( ${diffInHours}시간 전에 수정됨 )`;
                } else if (diffInMinutes > 0) {
                  return `( ${diffInMinutes}분 전에 수정됨 )`;
                } else {
                  return `( 방금 수정됨 )`;
                }
              })()}
            </Text>
          )}
          <Spacer />
          {isLoading ? (
            <Skeleton w={"150px"} h={"24.01px"} />
          ) : (
            <>
              <Text>조회 {post?.views}</Text>
              <Text>|</Text>
              <Text>좋아요 {post?.likes_count}</Text>
              <Text>|</Text>
            </>
          )}
          {isLoading ? (
            <Skeleton w={"79.3px"} h={"40px"} />
          ) : (
            <Button variant={"outline"} borderRadius={"20px"}>
              반응 {post?.num_of_reactions}
            </Button>
          )}
        </HStack>
      </VStack>
      {isLoading ? (
        <SkeletonText skeletonHeight={"4"} spacing={"2"} />
      ) : (
        <Text>{post?.detail}</Text>
      )}

      <HStack p={5} justifyContent={"center"}>
        <Box borderWidth="1px" borderRadius="lg" px={7} py={4}>
          <HStack spacing={5} alignItems="center">
            <HStack>
              <Skeleton isLoaded={!isLoading} minW={"8.63px"} minH={"24px"}>
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
              <Skeleton isLoaded={!isLoading} minW={"8.63px"} minH={"24px"}>
                <Text>{post?.dislikes_count}</Text>
              </Skeleton>
            </HStack>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
}