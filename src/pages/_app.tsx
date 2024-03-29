import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

function MyApp({
  session,
  Component,
  pageProps,
}: AppProps & SessionProviderProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <SWRConfig
          value={{
            onError: (err) => {
              // 共通のエラーハンドリング
              console.error("swr error: ", err);
            },
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
