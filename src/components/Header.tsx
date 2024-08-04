import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { IoClipboard } from "react-icons/io5";
import LogInModal from "./LogInModal";
import SignUpModal from "./SignUpModal";
import { FaMoon, FaSun } from "react-icons/fa6";

export default function Header() {
  const {
    isOpen: isLogInOpen,
    onOpen: onLogInOpen,
    onClose: onLogInClose,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const colorModeIcon = useColorModeValue(<FaMoon />, <FaSun />);

  return (
    <>
      <Box>
        <HStack p={"5"} justifyContent={"space-between"} borderBottomWidth={1}>
          <HStack>
            <Text fontSize={"2xl"} mr={5} fontWeight={"bold"}>
              게시판
            </Text>
            <Box color={"twitter.600"}>
              <IoClipboard size={"28"} />
            </Box>
          </HStack>
          <HStack>
            <IconButton
              variant={"outline"}
              aria-label="Toggle dark mode"
              onClick={toggleColorMode}
              icon={colorModeIcon}
              borderRadius={"50%"}
            />
            <Button onClick={onLogInOpen}>로그인</Button>
            <Button colorScheme="messenger" onClick={onSignUpOpen}>
              회원가입
            </Button>
          </HStack>
        </HStack>
      </Box>
      <LogInModal isOpen={isLogInOpen} onClose={onLogInClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </>
  );
}
