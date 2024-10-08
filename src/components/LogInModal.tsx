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
  Divider,
  Box,
  AbsoluteCenter,
  useToast,
  Text,
} from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa6";
import SocialLogIn from "./SocialLogIn";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usernameLogIn } from "../api";
import { TbLock } from "react-icons/tb";
interface ILogInModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
}
interface IForm {
  username: string;
  password: string;
}

export default function LogInModal({ isOpen, onClose }: ILogInModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: usernameLogIn,
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "환영합니다",
        description: data.data.detail,
        status: "success",
        duration: 1000,
      });
      onClose();
      reset();
      queryClient.refetchQueries({ queryKey: ["me"] });
    },
  });
  const onSubmit = ({ username, password }: IForm) => {
    mutation.mutate({ username, password });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log In</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack pb={"5"} as="form" onSubmit={handleSubmit(onSubmit)}>
            <InputGroup>
              <InputLeftElement>
                <FaRegUser />
              </InputLeftElement>
              <Input
                {...register("username", {
                  required: true,
                })}
                placeholder="아이디"
                isInvalid={Boolean(errors.username?.message)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement>
                <TbLock />
              </InputLeftElement>
              <Input
                {...register("password", {
                  required: true,
                })}
                type="password"
                placeholder="비밀번호"
                isInvalid={Boolean(errors.password?.message)}
              />
            </InputGroup>
            {mutation.isError && (
              <Text color={"red.500"} fontSize={"sm"}>
                아이디나 비밀번호가 틀렸습니다.
              </Text>
            )}
            <Button type="submit" width={"100%"} isLoading={mutation.isPending}>
              로그인
            </Button>
          </VStack>
          <Box position={"relative"} py={4}>
            <Divider />
            <AbsoluteCenter px={4}>또는</AbsoluteCenter>
          </Box>
          <SocialLogIn />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
