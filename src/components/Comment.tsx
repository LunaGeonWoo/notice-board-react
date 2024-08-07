import { Button, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { formatModifiedDate } from "../utils/dateUtils";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { BiSolidDownArrow } from "react-icons/bi";

interface ICommentProps {
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

export default function Comment({
  id,
  writer,
  replies_count,
  created_at,
  modified_at,
  detail,
  is_modified,
}: ICommentProps) {
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
        {is_modified && (
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            {formatModifiedDate(modified_at)}
          </Text>
        )}
        <Text fontSize="sm" color="gray.500">
          {format(new Date(created_at), "yyyy.MM.dd HH:mm:ss", {
            locale: ko,
          })}
        </Text>
      </HStack>
      <Text>{detail}</Text>
      {replies_count !== 0 && (
        <Button
          fontSize="sm"
          colorScheme="telegram"
          variant={"ghost"}
          leftIcon={<BiSolidDownArrow />}
          borderRadius={"20px"}
        >
          답글 {replies_count}개
        </Button>
      )}
    </VStack>
  );
}
