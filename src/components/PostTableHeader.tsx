import { HStack, Spacer, Text } from "@chakra-ui/react";

export default function PostTableHeader() {
  return (
    <HStack py={2} borderBottomWidth={1} borderTopWidth={3}>
      <Text fontWeight={"bold"} textAlign="center" w={"50px"}>
        번호
      </Text>
      <Spacer>
        <Text fontWeight={"bold"} textAlign="center">
          제목
        </Text>
      </Spacer>
      <Text fontWeight={"bold"} textAlign="center" w={"100px"}>
        글쓴이
      </Text>
      <Text fontWeight={"bold"} textAlign="center" w={"100px"}>
        작성일
      </Text>
      <Text fontWeight={"bold"} textAlign="center" w={"50px"}>
        좋아요
      </Text>
    </HStack>
  );
}
