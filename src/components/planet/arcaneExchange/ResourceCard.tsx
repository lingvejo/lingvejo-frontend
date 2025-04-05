'use client';

import {
  Card,
  Group,
  Stack,
  Text,
  ThemeIcon,
  NumberInput,
  Button,
  Alert,
  Notification,
  Divider,
  Badge,
  Tooltip,
} from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useState } from 'react';

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  glowColor: string;
  balance: number;
  goldBalance?: number;
  price?: number;
  totalCost?: number;
  onAction: () => void;
  error?: string | null;
  actionLabel: string;
  quantity?: number;
  setQuantity?: (value: number) => void;
  gradient?: string;
}

export default function ResourceCard({
  title,
  description,
  icon,
  glowColor,
  balance,
  goldBalance,
  price,
  totalCost,
  onAction,
  error,
  actionLabel,
  quantity = 1,
  setQuantity,
  gradient = 'linear-gradient(135deg, #f3f3f3, #e6e6e6)',
}: Props) {
  const [success, setSuccess] = useState(false);

  const resolvedCost = totalCost ?? (price ?? 0) * quantity;

  const canAfford = goldBalance !== undefined && goldBalance >= resolvedCost;

  const handleBuy = () => {
    onAction();
    if (!error) {
      setSuccess(true);
    }
  };

  return (
    <Card
      withBorder
      radius="lg"
      shadow="md"
      p="lg"
      style={{
        background: '#fff',
        border: `2px solid transparent`,
        backgroundImage: `linear-gradient(white, white), ${gradient}`,
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        boxShadow: `0 4px 16px ${glowColor}22`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        width: '100%',
        maxWidth: 420,
        position: 'relative',
      }}
    >
      <Stack spacing="md">
        <Group justify="space-between">
          <Group spacing="xs">
            <ThemeIcon
              size="lg"
              radius="xl"
              variant="light"
              style={{
                backgroundColor: 'white',
                color: glowColor,
                boxShadow: `0 0 12px ${glowColor}`,
              }}
            >
              {icon}
            </ThemeIcon>
            <Stack spacing={0}>
              <Text fw={700} size="lg" style={{ lineHeight: 1 }}>
                {title}
              </Text>
              <Text size="xs" c="dimmed">
                {description}
              </Text>
            </Stack>
          </Group>

          <Tooltip label="How many you already own">
            <Badge
              size="sm"
              variant="filled"
              style={{
                backgroundColor: 'var(--mantine-primary-color-filled)',
              }}
            >
              {balance} owned
            </Badge>
          </Tooltip>
        </Group>

        {setQuantity && (
          <NumberInput
            label="Quantity"
            min={1}
            max={goldBalance ? Math.floor(goldBalance / (price ?? 1)) : 1}
            value={quantity}
            onChange={(value) => setQuantity(value ?? 1)}
            size="sm"
          />
        )}

        {error && (
          <Alert color="red" title="Error" radius="md">
            {error}
          </Alert>
        )}

        {success && (
          <Notification
            color="green"
            onClose={() => setSuccess(false)}
            radius="md"
            withCloseButton
          >
            Item purchased successfully! 🧪✨
          </Notification>
        )}

        <Divider my="sm" />

        <Group justify="space-between">
          <Text fw={500} size="sm">
            Total:
          </Text>
          <Badge
            size="sm"
            variant="filled"
            style={{
              backgroundColor: 'var(--mantine-primary-color-filled)',
            }}
          >
            {resolvedCost} gold
          </Badge>
        </Group>

        <Button
          size="md"
          fullWidth
          leftSection={<IconShoppingCart size={18} />}
          onClick={handleBuy}
          disabled={!canAfford}
          style={{
            backgroundColor: 'var(--mantine-primary-color-filled)',
            boxShadow: canAfford
              ? `0 0 12px var(--mantine-primary-color-filled)`
              : 'none',
          }}
        >
          {actionLabel}
        </Button>
      </Stack>
    </Card>
  );
}
