import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import PostTableHeader from "../components/PostTableHeader";
import PostItem from "../components/PostItem";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api";

interface IPost {
  id: number;
  title: string;
  writer: { id: number; name: string };
  views: number;
  likes_count: number;
  num_of_reactions: number;
  created_at: string;
}

export default function Home() {
  const { isLoading, data: posts } = useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <Box p={5}>
      <HStack pb={2}>
        <InputGroup size={"md"}>
          <Input type="text" placeholder="검색 키워드" />
          <InputRightElement>
            <IconButton aria-label="검색" icon={<FaSearch />} />
          </InputRightElement>
        </InputGroup>
      </HStack>
      <PostTableHeader />

      {isLoading === false
        ? posts?.map((post) => {
            return (
              <PostItem
                key={post.id}
                id={post.id}
                title={post.title}
                writer={post.writer}
                date={post.created_at}
                likes={post.likes_count}
                reactions={post.num_of_reactions}
              />
            );
          })
        : Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} width={"100%"} minH={"10"} my={1} />
          ))}
    </Box>
  );
}
