import React, { useState } from 'react';
import { Card, Text, Button, Group, Stack, Notification, Alert, NumberInput } from '@mantine/core';
import { IconShoppingCart, IconCoin, IconBottle } from '@tabler/icons-react';

interface ResourceCardProps {
  type: 'potion' | 'gold' | 'doubleXpPotion' | 'magicItem'; // Add other resource types here
  balance: number;
  goldBalance?: number;
  price?: number;
  onAction: () => void;
  error?: string | null;
  actionLabel: string;
  quantity?: number;
  setQuantity?: (value: number) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  type,
  balance,
  goldBalance,
  price,
  onAction,
  error,
  actionLabel,
  quantity,
  setQuantity,
}) => {
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const handlePurchase = () => {
    onAction();
    if (!error) {
      setPurchaseSuccess(true);
    }
  };

  const isPotion = type === 'potion';
  const isGold = type === 'gold';
  const isDoubleXpPotion = type === 'doubleXpPotion';
  const isMagicItem = type === 'magicItem';
  const title = isPotion ? 'Potion' : isGold ? 'Gold' : isDoubleXpPotion ? 'Double XP Potion' : 'Magic Item';
  const icon = isPotion
    ? <IconBottle size={32} color="#4caf50" />
    : isGold
    ? <IconCoin size={32} color="gold" />
    : isDoubleXpPotion
    ? <IconBottle size={32} color="#ff9800" />  // Adjust the color for Double XP potion
    : <IconCoin size={32} color="purple" />; // Adjust color for Magic Item

  const canBuyPotion = isPotion && goldBalance !== undefined && goldBalance >= 10;
  const canBuyGold = isGold && price && goldBalance !== undefined && goldBalance >= price;
  
  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder 
      style={{ width: 320, margin: 'auto' }} // Set a fixed width for consistency
    >
      <Group position="apart" mb="md">
        <Text weight={500} size="lg">{title}</Text>
        {icon}
      </Group>

      {error && (
        <Alert title="Error" color="red" mb="md">
          {error}
        </Alert>
      )}

      <Stack spacing="xs">
        <Text size="lg" weight={500}>Balance: {balance}</Text>

        {/* Show success message only after a successful purchase */}
        {purchaseSuccess && (
          <Notification color="green" mt="sm">
            You're all set! Continue with your lessons.
          </Notification>
        )}

        {isPotion && setQuantity && quantity !== undefined && (
          <NumberInput
            label="Quantity"
            min={1}
            max={goldBalance ? Math.floor(goldBalance / 10) : 1}
            value={quantity}
            onChange={(value) => setQuantity(value ?? 1)}
            size="sm"
            style={{ width: '100%' }} // Ensures consistent width
          />
        )}
      </Stack>

      {price !== undefined && (
        <Group position="center" mt="md">
          <Button 
            onClick={handlePurchase} 
            size="md" 
            leftIcon={<IconShoppingCart size={18} />} 
            disabled={isPotion ? !canBuyPotion : !canBuyGold}
            fullWidth // Makes button consistent
          >
            {isPotion ? `${actionLabel} for ${quantity! * 10} gold` : `${actionLabel} for 1 Pi (100 gold)`}
          </Button>
        </Group>
      )}
    </Card>
  );
};

export default ResourceCard;
