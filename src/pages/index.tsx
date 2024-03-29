import AvatarMenu from "@/components/AvatarMenu";
import SignIn from "@/components/SignIn";
import TodoContents from "@/components/TodoContents";
import { Box, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const { status } = useSession();
  return (
    <>
      <Head>
        <title>My Sample ToDo List</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box>
          {status === "authenticated" ? (
            <Box>
              <Box pr={10} pt={4} textAlign={"right"}>
                <AvatarMenu />
              </Box>
              <TodoContents />
            </Box>
          ) : status === "unauthenticated" ? (
            <SignIn />
          ) : (
            <Spinner />
          )}
        </Box>
      </main>
    </>
  );
}
