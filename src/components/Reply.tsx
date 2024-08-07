import { HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import formatCreatedDate, { formatModifiedDate } from "../utils/dateUtils";

interface IReplyProps {
  id: number;
  writer: {
    id: number;
    name: string;
  };
  createdAt: string;
  modifiedAt: string;
  detail: string;
  isModified: boolean;
}

export default function Reply({
  id,
  writer,
  createdAt,
  modifiedAt,
  detail,
  isModified,
}: IReplyProps) {
  return (
    <VStack ml={"10px"} w={"full"} align={"start"} p={3} borderWidth={1}>
      <HStack w="full">
        <Text fontWeight="bold">{writer.name}</Text>
        <Spacer />
        {isModified && (
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            {formatModifiedDate(modifiedAt)}
          </Text>
        )}
        <Text fontSize="sm" color="gray.500">
          {formatCreatedDate(createdAt)}
        </Text>
      </HStack>
      <Text>{detail}</Text>
    </VStack>
  );
}
