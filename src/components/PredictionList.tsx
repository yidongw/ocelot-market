import PredictionCard from "./PredictionCard";
import { Stack } from "@mantine/core";
import m1 from "../assets/m1-opcat.png";
import m2 from "../assets/m2-trump.png";
import m3 from "../assets/m3-harris.png";
import { useUserBalance, useMarkets } from '../hooks/backend';
import {
  useCurrentAddress,
} from '@roochnetwork/rooch-sdk-kit';

const predictions = [
  {
    question: "Will OP CAT get implemented on Bitcoin by 2030?",
    imageUrl: m1,
    chance: 23.98,
    volume: 5621.47,
    resolvedTo: "N/A",
    yesPrice: 23.98,
    noPrice: 76.02,
    status: "ON GOING"
  },
  {
    question: "Will Donald Trump win the U.S. Presidential Election?",
    imageUrl: m2,
    chance: 100.00,
    volume: 1835.47,
    resolvedTo: "YES",
    yesPrice: 100.00,
    noPrice: 0.00,
    status: "YES"
  },
  {
    question: "Will Kamala Harris win the popular vote in the 2024 U.S. Presidential Election?",
    imageUrl: m3,
    chance: 0.00,
    volume: 443.65,
    resolvedTo: "NO",
    yesPrice: 0.00,
    noPrice: 100.00,
    status: "NO"
  }
] as const;

export default function PredictionList() {
  const currentAddress = useCurrentAddress();
  const {data: userBalance} = useUserBalance(currentAddress?.toStr());
  const { data: markets } = useMarkets();
  console.log(markets);
  
  return (
    <Stack>
      {predictions.map((prediction, index) => (
        <PredictionCard
          key={index}
          {...prediction}
          balance={userBalance?.formattedBalance || '0'}
        />
      ))}
    </Stack>
  );
}