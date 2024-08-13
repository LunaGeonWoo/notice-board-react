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
  FormControl,
  FormErrorMessage,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEnvelope, FaRegFaceSmile, FaRegUser } from "react-icons/fa6";
import { TbLock, TbLockCheck } from "react-icons/tb";
import { signUp } from "../api";
import { AxiosError } from "axios";

interface ISingUpModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

interface IForm {
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
}

export default function SignUpModal({ isOpen, onClose }: ISingUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();
  const [passwordError, setPasswordError] = useState("");
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast({
        title: "회원가입 성공!",
        status: "success",
      });
      queryClient.refetchQueries({ queryKey: ["me"] });
      onClose();
      reset();
    },
    onError: (error: AxiosError) => {
      toast.closeAll();
      const errorMessages = Object.entries(error.response?.data || {});
      errorMessages.forEach(([key, messages]) => {
        messages.forEach((message: string) => {
          toast({
            title: key,
            description: message,
            status: "error",
          });
        });
      });
    },
  });
  const onSubmit = ({
    username,
    password,
    confirmPassword,
    name,
    email,
  }: IForm) => {
    if (password !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
      mutation.mutate({ username, password, name, email });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box pb={5} as="form" onSubmit={handleSubmit(onSubmit)}>
            <VStack>
              <InputGroup>
                <InputLeftElement>
                  <FaRegUser />
                </InputLeftElement>
                <Input
                  {...register("username", { required: true })}
                  type="text"
                  placeholder="아이디"
                  isInvalid={Boolean(errors.username?.message)}
                />
              </InputGroup>
              <FormControl isInvalid={!!passwordError}>
                <InputGroup>
                  <InputLeftElement>
                    <TbLock />
                  </InputLeftElement>
                  <Input
                    {...register("password", { required: true })}
                    type="password"
                    placeholder="비밀번호"
                    isInvalid={Boolean(errors.password?.message)}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement>
                    <TbLockCheck />
                  </InputLeftElement>
                  <Input
                    {...register("confirmPassword", { required: true })}
                    type="password"
                    placeholder="비밀번호 확인"
                    isInvalid={Boolean(errors.confirmPassword?.message)}
                  />
                </InputGroup>
                {passwordError && (
                  <FormErrorMessage>{passwordError}</FormErrorMessage>
                )}
              </FormControl>
              <InputGroup>
                <InputLeftElement>
                  <FaRegFaceSmile />
                </InputLeftElement>
                <Input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="이름"
                  isInvalid={Boolean(errors.name?.message)}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement>
                  <FaRegEnvelope />
                </InputLeftElement>
                <Input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="이메일"
                  isInvalid={Boolean(errors.email?.message)}
                />
              </InputGroup>
              <Button
                type="submit"
                width={"100%"}
                isLoading={mutation.isPending}
              >
                회원가입
              </Button>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
