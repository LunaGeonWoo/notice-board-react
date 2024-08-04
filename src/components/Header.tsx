import { Box, Button, HStack, Text, useDisclosure } from "@chakra-ui/react";

import { IoClipboard } from "react-icons/io5";
import LogInModal from "./LogInModal";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box>
        <HStack p={"5"} justifyContent={"space-between"} borderBottomWidth={1}>
          <HStack>
            <Text fontSize={"2xl"} mr={5} fontWeight={"bold"}>
              게시판
            </Text>
            <IoClipboard size={"28"} />
          </HStack>
          <HStack>
            <Button onClick={onOpen}>로그인</Button>
            <Button colorScheme="messenger">회원가입</Button>
          </HStack>
        </HStack>
      </Box>
      <LogInModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
