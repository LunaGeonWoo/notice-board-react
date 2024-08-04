import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
} from "@chakra-ui/react";
import { FaLock, FaUser } from "react-icons/fa6";

interface ILogInModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export default function LogInModal({ isOpen, onClose }: ILogInModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log In</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack pb={"5"}>
            <InputGroup>
              <InputLeftElement>
                <FaUser />
              </InputLeftElement>
              <Input placeholder="아이디" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement>
                <FaLock />
              </InputLeftElement>
              <Input type="password" placeholder="비밀번호" />
            </InputGroup>
            <Button width={"100%"}>로그인</Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
