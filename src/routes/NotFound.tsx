import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack justifyContent={"center"} minH={"100vh"}>
      <Heading>Page Not Found</Heading>
      <Text>없는 페이지입니다. 홈으로 돌아가세요.</Text>
      <Link to={"/"}>
        <Button colorScheme="twitter">홈으로 가기 &rarr;</Button>
      </Link>
    </VStack>
  );
}
