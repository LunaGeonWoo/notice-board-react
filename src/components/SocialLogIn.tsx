import { Button, VStack } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa6";
import { RiKakaoTalkFill } from "react-icons/ri";

export default function SocialLogIn() {
  return (
    <VStack py={4}>
      <Button
        as={"a"}
        href="https://github.com/login/oauth/authorize?client_id=Ov23likdd8EpMimYxktA&scope=read:user,user:email"
        leftIcon={<FaGithub />}
        w={"full"}
        colorScheme="gray"
      >
        깃허브 로그인 &rarr;
      </Button>
      <Button leftIcon={<RiKakaoTalkFill />} w={"full"} colorScheme="yellow">
        카카오 로그인 &rarr;
      </Button>
    </VStack>
  );
}
