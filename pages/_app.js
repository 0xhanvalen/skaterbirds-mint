import "../styles/globals.css";
import Head from "next/head";
import { EthersContextFC } from "../contexts/EthersProviderContext";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <EthersContextFC>
        <Head>
          <title>SkaterBirds</title>
          <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
          <meta name="author" content="0xhanvalen via Matuki Labs" />
          <meta
            name="description"
            content="
            Welcome The Skate Park, Lets Skate Together!"
          />
        </Head>
        <Toaster position="bottom-right" reverseOrder={true} />
        <Component {...pageProps} />
      </EthersContextFC>
    </ChakraProvider>
  );
}

export default MyApp;
