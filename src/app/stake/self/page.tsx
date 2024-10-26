"use client";

import {useEffect, useState} from 'react'
import Link from "next/link";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Flex,
  Group,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import NavigationBar from "../../../components/NavigationBar";
import Footer from "../../../components/Footer";

import { IconHome } from "@tabler/icons-react";
import {
  useCurrentAddress,
  useRoochClientQuery,
  UseSignAndExecuteTransaction
} from '@roochnetwork/rooch-sdk-kit'
import {shortAddress} from '../../../utils/address'
import {useNetworkVariable} from '../../networks'
import {Args, Transaction} from '@roochnetwork/rooch-sdk'

export default function SelfStakingPage() {
  const addr = useCurrentAddress()
  const contractAddr = useNetworkVariable('contractAddr')
  const [selectValue, setSelectValue] = useState<string>();
  const [selectUTXO, setSelectUTXO] = useState<string>();
  const { mutateAsync: signAndExecuteTransaction } = UseSignAndExecuteTransaction()
  const {data: utxos} = useRoochClientQuery('queryUTXO', {
    filter: {
      owner: addr?.toStr() || ''
    }
  })

  useEffect(() => {
    if (utxos && utxos.data.length > 0) {
      const item = utxos.data[0]
      setSelectValue(`${shortAddress(item.id)} | ${item.value.value} sats`)
      setSelectUTXO(item.id)
    }
  }, [utxos])

  const handleStake = () => {
    if (!selectUTXO) {
      return
    }
    const tx = new Transaction()
    tx.callFunction({
      target: `${contractAddr}::grow_bitcoin::stake`,
      args: [Args.objectId(selectUTXO)]
    })
    const s = signAndExecuteTransaction({
      transaction: tx
    })
  }

  const handleUnStake = () => {

  }

  const claim = () => {

  }

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
          <Text>Self Staking</Text>
        </Breadcrumbs>

        <Flex align="center" gap="xl" wrap={{ base: "wrap", sm: "nowrap" }}>
          <Stack flex={{ base: "auto", sm: 5 }} gap="sm">
            <Title order={2} fw="500">
              Get $GROW with Self Staking
            </Title>
            <Text c="gray.7">
              To get $GROW with Self-Staking, select your Bitcoin UTXO and click
              on Stake button to start staking. For each BTC you stake, you will
              receive 1 $GROW. (Time weight = 1 day)
            </Text>
            <Text c="gray.7">
              To get $GROW with Babylon staking, you will need to stake your BTC
              on the official Babylon Staking Dashboard.
            </Text>
          </Stack>

          <Card
            flex={{ base: "auto", sm: 3 }}
            withBorder
            bg="gray.0"
            radius="lg"
            p="lg"
          >
            <Text fw="500">Select UTXO to start staking</Text>
            <Select
              size="md"
              value={selectValue}
              data={utxos?.data.map((item) => `${shortAddress(item.id)} | ${item.value.value} sats`)}
              onChange={(value) => {
                const data = value!.trim().split('|')
                setSelectValue(value!)
                const idPart = data[0].split('...')
                const id = utxos!.data.find((item) => item.id.startsWith(idPart[0]) && item.id.endsWith(idPart[1]))
                setSelectUTXO(id!.id)
              }}
              radius="md"
              comboboxProps={{ radius: "md" }}
              mt="6"
            />
            {/*<Flex justify="space-between" mt="md">*/}
            {/*  <Text fw="500">Eligible $GROW</Text>*/}
            {/*  <Text c="gray.7">4,500 $GROW</Text>*/}
            {/*</Flex>*/}
            <Flex justify="space-between" mt="md">
              <Text fw="500">Claimed $GROW</Text>
              <Text c="gray.7">2,000 $GROW</Text>
            </Flex>
            <Button size="md" radius="md" mt="md" onClick={handleStake}>
              {/*Claim*/}
              Stake
            </Button>
          </Card>
        </Flex>
      </Container>

      <Footer />
    </>
  );
}
