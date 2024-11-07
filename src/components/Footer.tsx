import Link from "next/link";
import { Box, Container, Stack, Flex, Anchor, Image } from "@mantine/core";
import LogoSVG from "../assets/logo.svg";

import {
  IconBrandX,
  IconBrandInstagram,
  IconBrandYoutubeFilled,
  IconBrandLinkedin,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <Box mt="lg" py="md">
      <Container size="lg">
        <Stack>
          <Flex gap="xs">
            <Anchor c="white">
              <Link href="https://twitter.com/">
                <IconBrandX />
              </Link>
            </Anchor>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}
