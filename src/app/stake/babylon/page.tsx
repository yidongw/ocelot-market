"use client";

import Link from "next/link";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Flex,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import NavigationBar from "../../../components/NavigationBar";
import Footer from "../../../components/Footer";

import { IconHome } from "@tabler/icons-react";

export default function BabylonStakingPage() {
  return (
    <>
      <NavigationBar />

      <Container size="lg" pt="1rem" pb="16rem">
        <Breadcrumbs
          mb="3rem"
          p="md"
          bg="gray.0"
          style={{ borderRadius: "0.75rem" }}
        >
          <Anchor component={Link} href="/grow" c="dark" underline="never">
            <Group gap="4">
              <IconHome size="1rem" />
              <Text>Grow</Text>
            </Group>
          </Anchor>
          <Text>Babylon Staking</Text>
        </Breadcrumbs>

        <Flex align="center" gap="xl" wrap={{ base: "wrap", sm: "nowrap" }}>
          <Stack flex={{ base: "auto", sm: 3 }} gap="sm">
            <Title order={2} fw="500">
              Get $GROW with Babylon Staking
            </Title>
            <Text c="gray.7">
              To get $GROW with Babylon staking, you will need to stake your BTC
              on the official Babylon Staking Dashboard.
            </Text>
            <Text c="gray.7">
              For each BTC you stake, you will receive 450 $GROW. (Time weight
              15months)
            </Text>
          </Stack>

          <Card
            flex={{ base: "auto", sm: 2 }}
            withBorder
            bg="gray.0"
            radius="lg"
            p="lg"
          >
            <Stack gap="md">
              <Flex justify="space-between">
                <Text fw="500">Total Staked BTC in Babylon</Text>
                <Text c="gray.7">10 BTC</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fw="500">Eligible $GROW</Text>
                <Text c="gray.7">4,500 $GROW</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fw="500">Claimed $GROW</Text>
                <Text c="gray.7">2,000 $GROW</Text>
              </Flex>
              <Button
                component={Link}
                href=""
                target="_blank"
                size="md"
                radius="md"
              >
                Stake BTC on Babylon Staking Dashboard
              </Button>
              <Button size="md" radius="md">
                Claim
              </Button>
            </Stack>
          </Card>
        </Flex>
      </Container>

      <Footer />
    </>
  );
}
