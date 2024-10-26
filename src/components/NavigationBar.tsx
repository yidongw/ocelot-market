import Link from "next/link";
import { usePathname } from 'next/navigation'
import {
  Box,
  Container,
  Anchor,
  Flex,
  Button,
  UnstyledButton,
  Stack,
  Drawer,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import LogoSVG from "../assets/logo.svg";

import { IconMenu2 } from "@tabler/icons-react";
import {useConnectWallet, useCurrentAddress, useWallets} from '@roochnetwork/rooch-sdk-kit'
import {shortAddress} from '../utils/address'

function DesktopNavigationBar({ style }: { style?: Object }) {
  const currentAddress = useCurrentAddress()
  const pathname = usePathname();
  const wallets = useWallets();
  const {mutateAsync: connectWallet} = useConnectWallet()

  return (
    <Box style={style}>
      <Container size="lg">
        <Flex py="md" align="center" gap="lg">
          <Link href="/">
            <LogoSVG width={80} />
          </Link>
          <Anchor
            component={Link}
            href="/"
            c="dark"
            underline="never"
            fw={pathname === "/" ? "500" : "400"}
          >
            Home
          </Anchor>
          <Anchor
            component={Link}
            href="/stake"
            c="dark"
            underline="never"
            fw={pathname === "/grow" ? "500" : "400"}
          >
            Get $GROW
          </Anchor>
          <Anchor
            component={Link}
            href=""
            c="dark"
            underline="never"
            fw={pathname === "" ? "500" : "400"}
          >
            Ideas
          </Anchor>
          <Button radius="md" ml="auto" onClick={() => {
            connectWallet({
              wallet: wallets[0]
            })
          }}>
            {currentAddress ? shortAddress(currentAddress.toStr()) : 'Connect Wallet'}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}

function MobileNavigationBar({ style }: { style?: Object }) {
  const [opened, { open, close }] = useDisclosure(false);
  const pathname = usePathname();

  return (
    <Box style={style}>
      <Container size="lg">
        <Flex py="md" align="center" gap="lg">
          <Link href="/">
            <LogoSVG width={80} />
          </Link>

          <UnstyledButton
            ml="auto"
            onClick={open}
            style={{ display: "flex", alignItems: "center" }}
          >
            <IconMenu2 />
          </UnstyledButton>

          <Button radius="md">Connect Wallet</Button>
        </Flex>
      </Container>

      <Drawer opened={opened} onClose={close} title="Menu">
        <Stack gap="sm">
          <Button
            component={Link}
            href="/"
            fw={pathname === "/" ? "500" : "400"}
            style={{ borderRadius: "0.325rem" }}
          >
            Home
          </Button>
          <Button
            component={Link}
            href="/grow"
            fw={pathname === "/grow" ? "500" : "400"}
            style={{ borderRadius: "0.325rem" }}
          >
            Get $GROW
          </Button>
          <Button
            component={Link}
            href=""
            fw={pathname === "" ? "500" : "400"}
            style={{ borderRadius: "0.325rem" }}
          >
            Ideas
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
}

export default function NavigationBar({ style }: { style?: Object }) {
  const desktopMatches = useMediaQuery("(min-width: 48em)");

  if (desktopMatches) {
    return <DesktopNavigationBar style={style} />;
  }

  return <MobileNavigationBar style={style} />;
}
