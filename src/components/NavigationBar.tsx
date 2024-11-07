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
import LogoPNG from "../assets/logo.png";
import Image from 'next/image'
import { IconMenu2 } from "@tabler/icons-react";
import {useConnectWallet, useCurrentAddress, useWallets} from '@roochnetwork/rooch-sdk-kit'
import {shortAddress} from '../utils/address'
import {WalletConnectModal} from './connect-model'
import {useState} from 'react'

function DesktopNavigationBar({ style }: { style?: Object }) {
  const currentAddress = useCurrentAddress()
  const pathname = usePathname();

  const [showConnectModel, setShowConnectModel] = useState(false)

  return (
     <Box style={style}>
       <WalletConnectModal isOpen={showConnectModel} onClose={()=>setShowConnectModel(false)}/>
       <Container size="lg">
         <Flex py="md" align="center" gap="lg">
           <Link href="/">
            <Image src={LogoPNG} alt="Logo" width={80} />
          </Link>
          
           <Anchor
             component={Link}
             href="/"
             c="white"
             underline="never"
             fw={pathname === "/" ? "500" : "400"}
           >
             Home
           </Anchor>
           <Anchor
             component={Link}
             href="/deposit"
             c="white"
             underline="never"
             fw={pathname === "/deposit" ? "500" : "400"}
           >
             Deposit $RGAS
           </Anchor>
           <Button radius="md" ml="auto" onClick={() => {
             setShowConnectModel(currentAddress === undefined)
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
            <Image src={LogoPNG} alt="Logo" width={80} />
          </Link>

          <UnstyledButton
            ml="auto"
            onClick={open}
            style={{ display: "flex", alignItems: "center" }}
          >
            <IconMenu2 color="white"/>
          </UnstyledButton>

          <Button radius="md">Connect Wallet</Button>
        </Flex>
      </Container>

      <Drawer opened={opened} onClose={close} title="Menu" bg="dark.7">
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
            href="/deposit"
            fw={pathname === "/deposit" ? "500" : "400"}
            style={{ borderRadius: "0.325rem" }}
          >
            Deposit $RGAS
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
