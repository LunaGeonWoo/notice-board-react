import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FaHouseChimney, FaLock, FaUser } from "react-icons/fa6";

export default function Root() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <HStack p={"5"} justifyContent={"space-between"} borderBottomWidth={1}>
        <HStack>
          <FaHouseChimney size={"32"} />
          <Text fontSize={"2xl"} ml={5} fontWeight={"bold"}>
            게시판
          </Text>
        </HStack>
        <HStack>
          <Button onClick={onOpen}>Log In</Button>
          <Button colorScheme="messenger">Sign Up</Button>
        </HStack>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack py={"5"}>
              <InputGroup>
                <InputLeftElement>
                  <FaUser />
                </InputLeftElement>
                <Input placeholder="Username" />
              </InputGroup>
              <InputGroup>
                <InputLeftElement>
                  <FaLock />
                </InputLeftElement>
                <Input type="password" placeholder="Password" />
              </InputGroup>
              <Button width={"100%"}>로그인</Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
