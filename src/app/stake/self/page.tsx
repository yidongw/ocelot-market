"use client";

import Link from "next/link";
import {
  Anchor,
  Breadcrumbs,
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
import {AssetsType, StakeCard} from '../../../components/stake-card'
import {useCurrentAddress, useRoochClientQuery} from '@roochnetwork/rooch-sdk-kit'

export default function SelfStakingPage() {
  const addr = useCurrentAddress()

  const {data: utxos} = useRoochClientQuery('queryUTXO', {
    filter: {
      owner: addr?.toStr() || ''
    }
  })

  console.log("addr: ", addr)

  console.log("utxos: ", utxos)

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
          <Anchor component={Link} href="/stake" c="white" underline="never">
            <Group gap="4">
              <IconHome size="1rem" />
              <Text>Grow</Text>
            </Group>
          </Anchor>
          <Text>Self Staking</Text>
        </Breadcrumbs>

        <Flex align="center" gap="xl" wrap={{ base: "wrap", sm: "nowrap" }}>
          <Stack flex={{ base: "auto", sm: 5 }} gap="sm">
            <Title order={2} fw="500">
              Get $RGAS with Self Staking
            </Title>
            <Text c="gray.7">
              To get $RGAS with Self-Staking, select your Bitcoin UTXO and click
              on Stake button to start staking. (Time weight = 1)
            </Text>
            <Text c="gray.7">
              To get $RGAS with Babylon staking, you will need to stake your BTC
              on the official Babylon Staking Dashboard.
            </Text>
          </Stack>
          <StakeCard target={'self'} assets={utxos?.data.map((item) => {
            return {
              id: item.id,
              value: item.value.value
            }
          }) || []}/>
        </Flex>
      </Container>

      <Footer />
    </>
  );
}
