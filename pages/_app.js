import "../styles/globals.css";
import Head from 'next/head';
import { EthersContextFC } from "../contexts/EthersProviderContext";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <EthersContextFC>
        <Head>
          <title>SkaterBirds</title>
          <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
          <meta name="author" content="0xhanvalen" />
          <meta name="description" content="Skaterbirds are cool and you can mint them here"/>
        </Head>
        <Component {...pageProps} />
      </EthersContextFC>
    </ChakraProvider>
  );
}

export default MyApp;
