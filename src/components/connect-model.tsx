import React from 'react';
import {Modal, Button, Text, Group, Stack} from '@mantine/core'
import {useConnectWallet, useWallets, Wallet} from '@roochnetwork/rooch-sdk-kit'
interface WalletConnectModalProps {
	isOpen: boolean;
	onClose: () => void;
}
export const WalletConnectModal: React.FC<WalletConnectModalProps> = ({ isOpen, onClose }) => {
	const wallets = useWallets();
	const {mutateAsync: connectWallet} = useConnectWallet()
	const handleConnectWallet = async (wallet: Wallet)  => {
		await connectWallet({wallet})
		onClose();
	};

	return (
		<Modal
			opened={isOpen}
			onClose={onClose}
			title="Choose your preferred wallet to connect:"
		>
			<Stack mt="md">
				{
					wallets.filter((wallet) => wallet.getName() !== 'OneKey').map((wallet) => <Button key={wallet.getName()} onClick={() => handleConnectWallet(wallet)}>{wallet.getName()}</Button>)
				}
			</Stack>
		</Modal>
	);
};