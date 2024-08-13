import { Button, VStack } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa6";
import { RiKakaoTalkFill } from "react-icons/ri";

export default function SocialLogIn() {
  const githubParams = {
    client_id: "Ov23likdd8EpMimYxktA",
    scope: "read:user,user:email",
  };
  const kakaoParams = {
    client_id: "d369ce6811ec863138895c0334f05a6c",
    redirect_uri: "http://127.0.0.1:3000/social/kakao",
    response_type: "code",
  };
  return (
    <VStack py={4}>
      <Button
        as={"a"}
        href={`https://github.com/login/oauth/authorize?${new URLSearchParams(
          githubParams
        ).toString()}`}
        leftIcon={<FaGithub />}
        w={"full"}
        colorScheme="gray"
      >
        깃허브 로그인 &rarr;
      </Button>
      <Button
        as={"a"}
        href={`https://kauth.kakao.com/oauth/authorize?${new URLSearchParams(
          kakaoParams
        ).toString()}`}
        leftIcon={<RiKakaoTalkFill />}
        w={"full"}
        colorScheme="yellow"
      >
        카카오 로그인 &rarr;
      </Button>
    </VStack>
  );
}
