'use client';

import "@fontsource/ibm-plex-sans/200.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider, createTheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {RoochProvider, WalletProvider} from '@roochnetwork/rooch-sdk-kit'
import { networkConfig } from './networks';

const theme = createTheme({
  fontFamily: "IBM Plex Sans, sans-serif",
  colors: {
    growBTC: [
      "#fff6e1",
      "#ffebcb",
      "#ffd69a",
      "#ffbf64",
      "#ffab37",
      "#ff9f1b",
      "#ff9909",
      "#e38400",
      "#cb7500",
      "#b06400",
    ],
  },
  primaryColor: "growBTC",
  primaryShade: 6,
});

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: any) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Grow Bitcoin</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <RoochProvider networks={networkConfig} defaultNetwork={'testnet'}>
          <WalletProvider chain="bitcoin" autoConnect>
            <Component {...pageProps} />
          </WalletProvider>
        </RoochProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}
