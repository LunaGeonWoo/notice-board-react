import { HStack, Spacer, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface IPostItemProps {
  id: number;
  title: string;
  writer: { id: number; name: string };
  date: string;
  likes: number;
  reactions: number;
}

export default function PostItem({
  id,
  title,
  writer,
  date,
  likes,
  reactions,
}: IPostItemProps) {
  const formattedDate = format(new Date(date), "yy/MM/dd");
  return (
    <Link to={`posts/${id}/`}>
      <HStack
        _hover={{ bg: "gray.200" }}
        _dark={{ _hover: { bg: "gray.700" } }}
        py={2}
        borderBottomWidth={1}
      >
        <Text textAlign="center" w={"50px"}>
          {id}
        </Text>
        <Spacer>
          <HStack>
            <Text textAlign="left" noOfLines={1}>
              {title}
            </Text>

            {reactions !== 0 && (
              <Text
                color={"blackAlpha.500"}
                _dark={{ color: "whiteAlpha.500" }}
              >
                [{reactions}]
              </Text>
            )}
          </HStack>
        </Spacer>
        <Text textAlign="center" noOfLines={1} w={"100px"}>
          {writer.name}
        </Text>
        <Text textAlign="center" w={"100px"}>
          {formattedDate}
        </Text>
        <Text textAlign="center" w={"50px"}>
          {likes}
        </Text>
      </HStack>
    </Link>
  );
}
