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

interface LogInModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export default function LogInModal({ isOpen, onClose }: LogInModalProps) {
  return (
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
  );
}
