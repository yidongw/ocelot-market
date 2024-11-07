import { Card, Group, Text, Badge, Button, Stack } from '@mantine/core';
import Image from 'next/image'
import TradeModal from './TradeModal';
import { useDisclosure } from '@mantine/hooks';  // Add this import
import { useState } from 'react';
interface PredictionCardProps {
  question: string;
  imageUrl?: any;
  chance: number;
  volume: number;
  resolvedTo: 'YES' | 'NO' | 'N/A';
  yesPrice: number;
  noPrice: number;
  status: 'YES' | 'NO' | 'ON GOING';
  balance: string;
}

function PredictionCard({
  question,
  imageUrl,
  chance,
  volume,
  resolvedTo,
  yesPrice,
  noPrice,
  status,
  balance
}: PredictionCardProps) {
  const isYes = status === 'YES';
  const isOngoing = status === 'ON GOING';
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedType, setSelectedType] = useState<'YES' | 'NO'>('YES');

  const handlePurchase = (type: 'YES' | 'NO') => {
    setSelectedType(type);
    open();
  };

  return (
    <Card
      padding="lg"
      radius="md"
      bg="dark.6"
      style={{ position: 'relative', maxWidth: 400 }}
    >
      <Badge
        variant="filled"
        color={isOngoing ? 'yellow.7' : isYes ? 'green.7' : 'red.7'}        size="lg"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,  // Adjust to move it more to the right
          transform: 'rotate(45deg) translateX(20px)',
          transformOrigin: 'center bottom',
          width: '110px',  // Fixed width
          textAlign: 'center',
          padding: '0.5rem',  // Add some padding
          fontSize: '1rem',   // Increase font size if needed
        }}
      >
        {status}
      </Badge>

      <Group align="center" mb="md">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt="" 
            style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#666' }} />
        )}
        <Text size="xl" c="white" fw={700}>
          {question}
        </Text>
      </Group>

      <Group justify="space-between" mb="xl">
        <Stack gap={0}>
          <Text size="sm" c="dimmed">
            Chance
          </Text>
          <Text size="xl" c="white" fw={700}>
            {chance.toFixed(2)}%
          </Text>
        </Stack>

        <Stack gap={0}>
          <Text size="sm" c="dimmed">
            Volume
          </Text>
          <Text size="xl" c="white" fw={700}>
            ${volume.toLocaleString()}
          </Text>
        </Stack>

        <Stack gap={0}>
          <Text size="sm" c="dimmed">
            Resolved to
          </Text>
          <Text 
            size="xl" 
            c={resolvedTo === 'YES' ? 'green' : resolvedTo === 'N/A' ? 'yellow' : 'red'} 
            fw={700}
          >
            {resolvedTo}
          </Text>
        </Stack>
      </Group>

      <Group grow>
        <Button
          variant="filled"
          color="green.7"
          rightSection="%"
          size="lg"
          disabled={!isOngoing}
          onClick={() => handlePurchase('YES')}
          styles={{
            root: {
              '&:disabled': {
                backgroundColor: '#1a2716', // darker muted green
                color: '#a0a0a0',
                border: 'none',
                opacity: 0.8,
                '&:hover': {
                  backgroundColor: '#1a2716',
                }
              }
            }
          }}
        >
          {yesPrice.toFixed(2)}
        </Button>
        <Button
          variant="filled"
          color="red.7"
          rightSection="%"
          size="lg"
          disabled={!isOngoing}
          onClick={() => handlePurchase('NO')}
          styles={{
            root: {
              '&:disabled': {
                backgroundColor: '#271616', // darker muted red
                color: '#a0a0a0',
                border: 'none',
                opacity: 0.8,
                '&:hover': {
                  backgroundColor: '#271616',
                }
              }
            }
          }}
        >
          {noPrice.toFixed(2)}
        </Button>
      </Group>
      <TradeModal
        opened={opened}
        onClose={close}
        yesPrice={yesPrice}
        noPrice={noPrice}
        balance={balance || '0'}
      />
    </Card>
  );
}

export default PredictionCard;