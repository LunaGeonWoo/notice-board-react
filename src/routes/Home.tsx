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
    </Box>
  );
}
