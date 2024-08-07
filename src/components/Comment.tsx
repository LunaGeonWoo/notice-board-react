import {
  Button,
  HStack,
  Skeleton,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { formatModifiedDate } from "../utils/dateUtils";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCommentReplies } from "../api";
import Reply from "./Reply";

interface ICommentProps {
  id: number;
  writer: {
    id: number;
    name: string;
  };
  repliesCount: number;
  createdAt: string;
  modifiedAt: string;
  detail: string;
  isModified: boolean;
}

interface IReply {
  id: number;
  writer: {
    id: number;
    name: string;
  };
  created_at: string;
  modified_at: string;
  detail: string;
  is_modified: boolean;
}

export default function Comment({
  id,
  writer,
  repliesCount,
  createdAt,
  modifiedAt,
  detail,
  isModified,
}: ICommentProps) {
  const [replyVisible, setReplyVisible] = useState(false);
  const { data: replies, isLoading } = useQuery<IReply[]>({
    queryKey: ["comments", id, "replies"],
    queryFn: getCommentReplies,
  });
  return (
    <VStack
      key={id}
      align="start"
      spacing={2}
      p={4}
      borderWidth={1}
      borderRadius="md"
      w="full"
    >
      <HStack w="full">
        <Text fontWeight="bold">{writer.name}</Text>
        <Spacer />
        {isModified && (
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            {formatModifiedDate(modifiedAt)}
          </Text>
        )}
        <Text fontSize="sm" color="gray.500">
          {format(new Date(createdAt), "yyyy.MM.dd HH:mm:ss", {
            locale: ko,
          })}
        </Text>
      </HStack>
      <Text>{detail}</Text>
      {repliesCount !== 0 && (
        <Button
          fontSize="sm"
          colorScheme="telegram"
          variant={"ghost"}
          leftIcon={replyVisible ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
          borderRadius={"20px"}
          onClick={() => {
            setReplyVisible((current) => !current);
          }}
        >
          답글 {repliesCount}개
        </Button>
      )}
      {replyVisible &&
        (isLoading
          ? Array.from({ length: repliesCount }).map((_, index) => (
              <Skeleton key={index} ml={"10px"} w={"full"} h={"82px"} />
            ))
          : replies?.map((reply) => (
              <Reply
                key={reply.id}
                id={reply.id}
                writer={reply.writer}
                createdAt={reply.created_at}
                modifiedAt={reply.modified_at}
                detail={reply.detail}
                isModified={reply.is_modified}
              />
            )))}
    </VStack>
  );
}
