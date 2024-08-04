import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FaPencil } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import PostTableHeader from "../components/PostTableHeader";
import PostItem from "../components/PostItem";

export default function Home() {
  return (
    <Box p={5}>
      <HStack pb={2}>
        <InputGroup size={"md"}>
          <Input type="text" placeholder="검색 키워드" />
          <InputRightElement>
            <IconButton aria-label="검색" icon={<FaSearch />} />
          </InputRightElement>
        </InputGroup>
        <Button leftIcon={<FaPencil />}>글쓰기</Button>
      </HStack>

      <PostTableHeader />
      <PostItem
        id={2910}
        title={
          "매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 긴 글"
        }
        writerName={"김작성"}
        Date={"24/07/29"}
        likes={2}
        commentCount={1}
      />
      <PostItem
        id={2910}
        title={"대충 쓴 글"}
        writerName={"문건우"}
        Date={"24/07/29"}
        likes={2}
        commentCount={12}
      />
    </Box>
  );
}
