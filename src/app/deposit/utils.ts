import { BitcoinAddress } from '@roochnetwork/rooch-sdk';

export const isSessionExpired = (lastActiveTime: number, maxInactiveInterval: number) => {
  const expirationTime = (lastActiveTime + maxInactiveInterval) * 1000;
  return Date.now() > expirationTime;
};

export function BitcoinAddressToRoochAddress(bitcoinAddress: string) {
  console.log(bitcoinAddress);
  return new BitcoinAddress(bitcoinAddress).genRoochAddress();
}