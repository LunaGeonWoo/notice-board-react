import {
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  ToastId,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { IoClipboard } from "react-icons/io5";
import LogInModal from "./LogInModal";
import SignUpModal from "./SignUpModal";
import { FaMoon, FaSun } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";

export default function Header() {
  const {
    isLoading: isUserLoading,
    user,
    isLoggedIn,
    refetch: refetchMe,
  } = useUser();
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
  const toast = useToast();
  const toastId = useRef<ToastId>();
  const mutation = useMutation({
    mutationFn: logOut,
    onMutate: () => {
      toastId.current = toast({
        title: "로그아웃 중...",
        status: "loading",
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        refetchMe();
        toast.update(toastId.current, {
          title: "로그아웃",
          description: "로그아웃 되었습니다.",
          status: "success",
        });
      }
    },
  });
  const onClick = () => {
    mutation.mutate();
  };
  return (
    <>
      <Box>
        <HStack p={"5"} justifyContent={"space-between"} borderBottomWidth={1}>
          <Link to={"/"}>
            <HStack>
              <Text fontSize={"2xl"} mr={5} fontWeight={"bold"}>
                게시판
              </Text>
              <Box color={"twitter.600"}>
                <IoClipboard size={"28"} />
              </Box>
            </HStack>
          </Link>
          <HStack>
            <IconButton
              variant={"outline"}
              aria-label="Toggle dark mode"
              onClick={toggleColorMode}
              icon={colorModeIcon}
              borderRadius={"50%"}
            />
            {!isUserLoading ? (
              !isLoggedIn ? (
                <>
                  <Button onClick={onLogInOpen}>로그인</Button>
                  <Button colorScheme="messenger" onClick={onSignUpOpen}>
                    회원가입
                  </Button>
                </>
              ) : (
                <Menu>
                  <MenuButton>
                    <Text fontWeight={"extrabold"}>{user?.name}</Text>
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={onClick}>로그아웃</MenuItem>
                  </MenuList>
                </Menu>
              )
            ) : null}
          </HStack>
        </HStack>
      </Box>
      <LogInModal isOpen={isLogInOpen} onClose={onLogInClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </>
  );
}
