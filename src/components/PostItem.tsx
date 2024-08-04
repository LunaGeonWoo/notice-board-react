import { HStack, Spacer, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface PostItemProps {
  id: number;
  title: string;
  writerName: string;
  Date: string;
  likes: number;
  commentCount: number;
}

export default function PostItem({
  id,
  title,
  writerName,
  Date,
  likes,
  commentCount,
}: PostItemProps) {
  return (
    <HStack py={2} borderBottomWidth={1}>
      <Text textAlign="center" w={"50px"}>
        {id}
      </Text>
      <Spacer>
        <HStack>
          <Text textAlign="left" noOfLines={1}>
            {title}
          </Text>

          {commentCount !== 0 && (
            <Text color={"blackAlpha.500"}>[{commentCount}]</Text>
          )}
        </HStack>
      </Spacer>
      <Text textAlign="center" noOfLines={1} w={"100px"}>
        {writerName}
      </Text>
      <Text textAlign="center" w={"100px"}>
        {Date}
      </Text>
      <Text textAlign="center" w={"50px"}>
        {likes}
      </Text>
    </HStack>
  );
}
