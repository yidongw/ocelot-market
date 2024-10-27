import React from 'react';
import {Modal, Button, Stack} from '@mantine/core'
import {useCreateSessionKey} from '@roochnetwork/rooch-sdk-kit'
import {useNetworkVariable} from '../app/networks'
interface CreateSessionModalProps {
	isOpen: boolean;
	onClose: () => void;
}
export const CreateSessionModal: React.FC<CreateSessionModalProps> = ({ isOpen, onClose }) => {
	const {mutateAsync: createSessionKey} = useCreateSessionKey()
	const contractAddr = useNetworkVariable('contractAddr')

	const handleCreateSession = async () => {
		await createSessionKey({
			appName: 'Rooch GROW',
			appUrl: 'https://test-grow.rooch.network',
			scopes: [`${contractAddr}::*::*`],
			maxInactiveInterval: 12000
		})
		onClose();
	};

	return (
		<Modal
			opened={isOpen}
			onClose={onClose}
			title="Session Required"
		>
			<text>Create a stake session</text>
			<Stack mt="md">
				<Button onClick={handleCreateSession}>Create</Button>
			</Stack>
		</Modal>
	);
};