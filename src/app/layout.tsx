import { Metadata } from "next";
import RoochDappProvider from "./rooch-dapp-provider";
import { createTheme, MantineProvider } from "@mantine/core";
import "@fontsource/ibm-plex-sans/200.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@mantine/core/styles.css";

type Props = {
  children: React.ReactNode;
};

const theme = createTheme({
  fontFamily: "IBM Plex Sans, sans-serif",
  colors: {
    ocelotMarket: [
      "#FFF5E1", // Lightest cream
      "#FFE8D1", // Light beige
      "#E6C39B", // Warm beige
      "#D4A675", // Light tan
      "#BC8B4A", // Golden tan
      "#8B6434", // Medium brown
      "#634729", // Dark brown
      "#462F1D", // Darker brown
      "#2B1810", // Very dark brown
      "#1A0F0A", // Almost black
    ],
  },
  primaryColor: "ocelotMarket",
  primaryShade: 4,
});

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <title>Ocelot market</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
      />
      <link rel="shortcut icon" href="/favicon.svg" />
      <body>
        <MantineProvider theme={theme}>
          <RoochDappProvider>{children}</RoochDappProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
