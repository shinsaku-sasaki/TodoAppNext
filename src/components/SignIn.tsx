import React from "react";
import { Button, Center, Box, Heading } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

const SignIn: React.FC = () => {
  return (
    <Center h="100vh" flexDirection="column">
      <Heading as="h1" mb={4}>
        Welcome to My Sample ToDo App
      </Heading>
      <Box p={10}>
        {/* TODO:googleも作る */}
        <Button onClick={() => signIn()} colorScheme="blue" size={"lg"}>
          Sign in
        </Button>
      </Box>
    </Center>
  );
};

export default SignIn;
