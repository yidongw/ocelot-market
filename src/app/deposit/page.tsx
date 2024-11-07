"use client";

import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Text,
  TextInput
} from "@mantine/core";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";

import {useEffect, useState} from 'react'
import {
  useCurrentAddress,
  useRoochClientQuery,
  useCurrentSession,
  useCreateSessionKey,
  useTransferCoin
} from '@roochnetwork/rooch-sdk-kit';
import { isSessionExpired, BitcoinAddressToRoochAddress } from './utils';
import BigNumber from 'bignumber.js';
import { useUserBalance, useAddUserBalance } from '../../hooks/backend';

export default function DepositPage() {
  const { mutateAsync: transferCoin } = useTransferCoin();
  const currentAddress = useCurrentAddress();
  const {data: userBalance} = useUserBalance(currentAddress?.toStr());
  const { mutateAsync: addUserBalance } = useAddUserBalance();


  const {
    data: assetsList,
    refetch: refetchAssetsList,
  } = useRoochClientQuery(
    'getBalances',
    {
      owner: BitcoinAddressToRoochAddress(currentAddress?.toStr() || 'tb1qsy9ewjpk6wf8cz7h58u6px3wzfrdjlkxxftmda').toHexAddress(),
    },
    { refetchInterval: 5000 }
  );

  console.log(currentAddress);
  console.log(JSON.stringify(currentAddress?.toStr()));

  console.log(assetsList);
  const balance = assetsList?.data.find(asset => asset.coin_type === '0x3::gas_coin::RGas')?.balance;

  const sessionKey = useCurrentSession();
  const { mutateAsync: createSessionKey } = useCreateSessionKey();
  const [sessionKeyLoading, setSessionKeyLoading] = useState(false);

  const [isCurrentSessionExpired, setIsCurrentSessionExpired] = useState(false);

  const [transferValue, setTransferValue] = useState('');

  const recipient = 'tb1quqet90hlm2pej3ls844lujpx83qqkk7mhvty8p'
  const [transferring, setTransferring] = useState(false);


  useEffect(() => {
    if (sessionKey) {
      const sessionKeyJson = sessionKey.toJSON();
      const { lastActiveTime, maxInactiveInterval } = sessionKeyJson;
      if (isSessionExpired(Number(lastActiveTime), Number(maxInactiveInterval))) {
        setIsCurrentSessionExpired(true);
      }
    }
  }, [sessionKey]);


  const handleCreateSessionKey =  async () => {
    try {
      setSessionKeyLoading(true);
      await createSessionKey({
        appName: 'rooch-portal',
        appUrl: 'portal.rooch.network',
        scopes: [
          '0x1::*::*',
          '0x3::*::*',
          '0x176214bed3764a1c6a43dc1add387be5578ff8dbc263369f5bdc33a885a501ae::*::*',
          '0x701c21bf1c8cd5af8c42983890d8ca55e7a820171b8e744c13f2d9998bf76cc3::*::*',
        ],
        maxInactiveInterval: 60 * 60 * 8,
      });
    } catch (error: any) {
      if (error.message) {
        console.error(error.message);
        return;
      }
      console.error(String(error));
    } finally {
      setSessionKeyLoading(false);
    }
  }

  const handleDeposit = async () => {
    if (!currentAddress) {
      return;
    }

    try {
      setTransferring(true);
      const amountNumber = new BigNumber(transferValue)
        .multipliedBy(new BigNumber(10).pow(8))
        .integerValue(BigNumber.ROUND_FLOOR)
        .toNumber();
      console.log(amountNumber);
      await transferCoin({
        recipient,
        amount: amountNumber,
        coinType: {
          target: '0x3::gas_coin::RGas',
        },
      });

      await addUserBalance({
        address: currentAddress.toStr(),
        amount: amountNumber
      });

      refetchAssetsList();
      console.log('Transfer success');
    } catch (error) {
      console.log(error);
      console.error(String(error));
    } finally {
      setTransferring(false);
    }
  }

  return (
    <>
      <Box
        component="header"
        pt={{ base: "12rem", md: "16rem" }}
        style={{ 
          position: "relative",
          backgroundColor: "#1A1B1E"
        }}
      >
        <NavigationBar
          style={{ position: "absolute", zIndex: 9, top: 0, left: 0, right: 0 }}
        />

        <Container 
          pt="1rem" 
          pb="4rem" 
          size="lg"
          style={{
            height: "calc(100vh - 270px)"
          }}
        >
          <Card radius="lg" p="lg" bg="dark.6" mb="2rem">
            <Flex direction="column" gap="md">
              <Flex justify="space-between" align="center">
                <Text c="white">Your Balance</Text>
                <Text fw={500} c="white">{balance ? (Number(balance) / 1e8).toFixed(2) : 0} $RGAS</Text>
              </Flex>
              
              <Flex justify="space-between" align="center">
                <Text c="white">Deposited Amount</Text>
                <Text fw={500} c="white">{userBalance?.formattedBalance} $RGAS</Text>
              </Flex>

              <TextInput
                placeholder="Enter amount"
                value={transferValue}
                onChange={(e) => setTransferValue(e.target.value)}
                mb="md"
              />

              <Flex justify="center" gap="md">
                {
                  sessionKey && !isCurrentSessionExpired 
                  ? (
                    <>
                      <Button variant="filled" color="blue" loading={transferring} onClick={handleDeposit}>
                        Deposit
                      </Button>
                      <Button variant="outline" color="blue">
                        Withdraw
                      </Button>
                    </>
                  )
                  : (
                    <Button variant="filled" color="blue" loading={sessionKeyLoading} onClick={handleCreateSessionKey}>
                      Create Session Key
                    </Button>
                  )
                }
              </Flex>
            </Flex>
          </Card>

        </Container>

        <Footer />
      </Box>
    </>
  );
}
