import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogIn } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function GithubConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: githubLogIn,
    onSuccess() {
      toast({
        status: "success",
        title: "로그인 성공",
        description: "반갑습니다.",
      });
      queryClient.refetchQueries({ queryKey: ["me"] });
      navigate("/");
    },
    onError: () => {
      toast({
        status: "error",
        title: "로그인 실패",
        description: "GitHub 로그인이 실패했습니다. 다시 시도해주세요.",
      });
      navigate("/");
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      mutation.mutate(code);
    }
  }, []);

  return (
    <VStack justifyContent={"center"} mt={50}>
      <Heading>로그인 중...</Heading>
      <Text>페이지를 떠나지 마세요</Text>
      <Spinner size={"lg"} />
    </VStack>
  );
}
