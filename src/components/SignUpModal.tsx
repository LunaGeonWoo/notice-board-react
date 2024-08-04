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
import { FaEnvelope, FaFaceSmile, FaLock, FaUser } from "react-icons/fa6";

interface ISingUpModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export default function SignUpModal({ isOpen, onClose }: ISingUpModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack pb={5}>
            <InputGroup>
              <InputLeftElement>
                <FaUser />
              </InputLeftElement>
              <Input type="text" placeholder="아이디" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement>
                <FaLock />
              </InputLeftElement>
              <Input type="password" placeholder="비밀번호" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement>
                <FaFaceSmile />
              </InputLeftElement>
              <Input type="text" placeholder="이름" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement>
                <FaEnvelope />
              </InputLeftElement>
              <Input type="email" placeholder="이메일" />
            </InputGroup>
            <Button width={"100%"}>회원가입</Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
