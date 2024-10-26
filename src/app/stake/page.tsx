"use client";

import Link from "next/link";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Image,
  Text,
  Title,
} from "@mantine/core";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";

import Staking1SVG from "../../assets/staking-1.svg";
import Staking2SVG from "../../assets/staking-2.svg";
import Staking3SVG from "../../assets/staking-3.svg";
import {getTokenInfo, TokenInfo} from './util'
import {useRoochClient, useRoochClientQuery} from '@roochnetwork/rooch-sdk-kit'
import {useEffect, useState} from 'react'
import {useNetworkVariable} from '../networks'

const stakingList = [
  {
    img: <Staking1SVG />,
    title: "Babylon Staking",
    description:
      "Stake your BTC in the Babylon's native self-custodial staking protocol.",
    link: {
      href: "/stake/babylon",
      label: "Stake",
      icon: "",
    },
  },
  {
    img: <Staking2SVG style={{ objectFit: "cover" }} />,
    title: "LST/LRT Staking",
    description:
      "Stake your Bitcoin Liquid Staking Token or Bitcoin Liquid Restaking Token in smart contract with customized staking period.",
    link: {
      href: undefined,
      label: "Coming Soon",
      icon: "",
    },
  },
  {
    img: <Staking3SVG />,
    title: "Self Staking",
    description: "Stake your BTC in your own wallet by holding it.",
    link: {
      href: "/stake/self",
      label: "Stake",
      icon: "",
    },
  },
];

export default function GrowPage() {
  const client = useRoochClient()
  const contractAddr = useNetworkVariable('contractAddr')
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>()
  const [timeRemaining, setTimeRemaining] = useState(0)
  useEffect(() => {
    getTokenInfo(client, contractAddr).then((result) => {
      setTokenInfo(result)
      setTimeRemaining(result.data.timeRemaining)
      console.log(result)
    }).finally(() => {
      console.log('hah')
    })
  }, [client, contractAddr])

  useEffect(() => {
    if (!tokenInfo) {
      return
    }
    const interval = setInterval(() => {
      const now = Date.now() / 1000;
      setTimeRemaining(tokenInfo?.data.endTime - now);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [tokenInfo])

  return (
    <>
      <NavigationBar />

      <Container pt="1rem" pb="4rem" size="lg">
        <Card radius="lg" p="lg" bg="gray.0" mb="2rem">
          <Flex justify="space-between">
            <Box>
              <Title order={4} fw="500">
                $GROW Info
              </Title>
              <Text mt="4" c="gray.7">
                Time Remaining : {
                tokenInfo?
                  `${Math.floor(timeRemaining / (24 * 3600))} : ${Math.floor((timeRemaining % (24 * 3600)) / 3600)} : ${Math.floor((timeRemaining % 3600) / 60)} : ${Math.floor(timeRemaining % 60)}`:''
                }
              </Text>
              <Text mt="4" c="gray.7">
                Total stake:
              </Text>
            </Box>

            <Box ta="right">
              <Title order={4} fw="500">
                $GROW
              </Title>
              <Text mt="4" c="gray.7">
              </Text>
              <Text mt="4" c="gray.7">
                Your Balance
              </Text>
            </Box>
          </Flex>
        </Card>
        <Card radius="lg" p="lg" bg="gray.0" mb="2rem">
          <Flex justify="space-between">
            <Box>
              <Title order={4} fw="500">
                Get $GROW with BTC Staking
              </Title>
              <Text mt="4" c="gray.7">
                Choose your choice of BTC staking
              </Text>
            </Box>

            <Box ta="right">
              <Title order={4} fw="500">
                1,234,567 $GROW
              </Title>
              <Text mt="4" c="gray.7">
                Your Balance
              </Text>
            </Box>
          </Flex>
        </Card>

        <Grid gutter="lg">
          {stakingList.map((i) => (
            <Grid.Col key={i.title} span={{ base: 12, md: 6 }}>
              <Card withBorder h="100%" bg="gray.0" radius="lg" p="md">
                <Flex
                  gap={{ base: "0", xs: "lg" }}
                  wrap={{ base: "wrap", xs: "nowrap" }}
                >
                  <Box w={160} flex="none">
                    {i.img}
                  </Box>
                  <Box pt="xs">
                    <Title order={3} fw="500">
                      {i.title}
                    </Title>
                    <Text size="md" mt="4" mb="xs" c="grqqay.7">
                      {i.description}
                    </Text>
                    {!i.link.href ? (
                      <Button disabled radius="md" w="148">
                        Coming Soon
                      </Button>
                    ) : (
                      <Button
                        component={Link}
                        href={i.link.href}
                        radius="md"
                        w="148"
                      >
                        {i.link.label}
                      </Button>
                    )}
                  </Box>
                </Flex>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      <Footer />
    </>
  );
}
