import { Modal, Text, Button, Group, Tabs, NumberInput, Stack, Box } from '@mantine/core';
import { useState } from 'react';
import { useCreateTrade } from '../hooks/backend';
import {
  useCurrentAddress,
} from '@roochnetwork/rooch-sdk-kit';

interface TradeModalProps {
  opened: boolean;
  onClose: () => void;
  yesPrice: number;
  noPrice: number;
  balance: string;
}

function TradeModal({ 
  opened, 
  onClose, 
  yesPrice,
  noPrice,
  balance
}: TradeModalProps) {
  const action = 'BUY';
  const [selectedType, setSelectedType] = useState<'YES' | 'NO'>('YES');
  const [amount, setAmount] = useState<number>(0);
  const { mutateAsync: createTrade } = useCreateTrade();

  const currentAddress = useCurrentAddress();

  const price = selectedType === 'YES' ? yesPrice : noPrice;
  const shares = (amount * 100 / price);
  const potentialReturn = action === 'BUY' 
    ? `$${shares.toFixed(2)} (${amount === 0 ? '0' : (shares/amount * 100 - 100).toFixed(2)}%)`
    : '$NaN';

  const onConfirm = async () => {
    if (!currentAddress) return;

    await createTrade({
      address: currentAddress.toStr(),
      market_id: 1,
      side: action === 'BUY' ? 'buy' : 'sell',
      tick: selectedType === 'YES' ? 'yes' : 'no',
      amount: amount * 100 ** 8
    });
  };

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      size="md" 
    >
      <Stack mt="md">
        <Text size="lg">Outcome</Text>
        <Group grow>
          <Button
            variant={selectedType === 'YES' ? 'filled' : 'outline'}
            color="green.7"
            onClick={() => setSelectedType('YES')}
          >
            Yes {yesPrice.toFixed(1)}%
          </Button>
          <Button
            variant={selectedType === 'NO' ? 'filled' : 'outline'}
            color="red.7"
            onClick={() => setSelectedType('NO')}
          >
            No {noPrice.toFixed(1)}%
          </Button>
        </Group>

        <Group justify="space-between">
          <Text size="lg">{action === 'BUY' ? 'Amount' : 'Shares'}</Text>
          <Text size="md" c="dimmed">
            Balance {action === 'BUY' ? '$' : ''}{balance}
          </Text>
        </Group>
        
        <Group style={{ position: 'relative' }}>
          <NumberInput
            value={amount}
            onChange={(val) => setAmount(Number(val))}
            min={0}
            max={Number(balance)}
            style={{ width: '100%' }}
            leftSection={action === 'BUY' ? '$' : undefined}
          />
        </Group>

        <Box>
          {/* <Group justify="space-between">
            <Text c="dimmed">Avg price</Text>
            <Text c="blue" ta="right">{price.toFixed(1)}¢</Text>
          </Group> */}

          {action === 'BUY' ? (
            <>
              {/* <Group justify="space-between">
                <Text c="dimmed">Shares</Text>
                <Text c="blue">{shares.toFixed(2)}</Text>
              </Group> */}
              <Group justify="space-between">
                <Text c="dimmed">Potential return</Text>
                <Text c="green">{potentialReturn}</Text>
              </Group>
            </>
          ) : (
            <Group justify="space-between">
              <Text c="dimmed">Est. amount received</Text>
              <Text>${(amount * price / 100).toFixed(2)}</Text>
            </Group>
          )}
        </Box>

        <Button
          fullWidth
          color={selectedType === 'YES' ? 'green.7' : 'red.7'}
          onClick={() => {
            onConfirm();
            onClose();
          }}
          disabled={amount <= 0}
        >
          Place a bet
        </Button>

        <Text size="xs" c="dimmed" ta="center">
          By trading, you agree to the Terms of Use.
        </Text>
        </Stack>
    </Modal>
  );
}

export default TradeModal;