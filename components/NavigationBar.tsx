import Link from "next/link";
import { useRouter } from "next/router";
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

function DesktopNavigationBar({ style }: { style?: Object }) {
  const router = useRouter();

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
            fw={router.pathname === "/" ? "500" : "400"}
          >
            Home
          </Anchor>
          <Anchor
            component={Link}
            href="/grow"
            c="dark"
            underline="never"
            fw={router.pathname === "/grow" ? "500" : "400"}
          >
            Get $GROW
          </Anchor>
          <Anchor
            component={Link}
            href=""
            c="dark"
            underline="never"
            fw={router.pathname === "" ? "500" : "400"}
          >
            Ideas
          </Anchor>
          <Button radius="md" ml="auto">
            Connect Wallet
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}

function MobileNavigationBar({ style }: { style?: Object }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

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
            fw={router.pathname === "/" ? "500" : "400"}
            style={{ borderRadius: "0.325rem" }}
          >
            Home
          </Button>
          <Button
            component={Link}
            href="/grow"
            fw={router.pathname === "/grow" ? "500" : "400"}
            style={{ borderRadius: "0.325rem" }}
          >
            Get $GROW
          </Button>
          <Button
            component={Link}
            href=""
            fw={router.pathname === "" ? "500" : "400"}
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
