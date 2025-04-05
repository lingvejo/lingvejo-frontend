'use client';

import {
  Stack,
  Title,
  Text,
  Grid,
  Container,
  Box,
  rem,
} from '@mantine/core';
import {
  IconBottle,
  IconSparkles,
  IconCoin,
  IconWand,
} from '@tabler/icons-react';
import ResourceCard from './ResourceCard';
import { useState } from 'react';

const inventory = [
  {
    id: 'potion',
    title: 'Healing Potion',
    description: 'Restores energy lost on dangerous language adventures.',
    icon: <IconBottle size={32} color="#4caf50" />,
    glowColor: '#4caf50',
    gradient: 'linear-gradient(135deg, #d2f8d2, #b2e6b2)',
    basePrice: 10,
    owned: 3,
  },
  {
    id: 'doubleXp',
    title: 'Double XP Elixir',
    description: 'Double your learning XP for a limited time.',
    icon: <IconSparkles size={32} color="#ff9800" />,
    glowColor: '#ff9800',
    gradient: 'linear-gradient(135deg, #ffe0b2, #ffcc80)',
    basePrice: 30,
    owned: 1,
  },
  {
    id: 'gold',
    title: 'Gold Pack',
    description: 'Trade 1 Pi to gain 100 gold coins.',
    icon: <IconCoin size={32} color="gold" />,
    glowColor: 'gold',
    gradient: 'linear-gradient(135deg, #fff9c4, #ffe082)',
    basePrice: 1,
    owned: 0,
  },
  {
    id: 'artifact',
    title: 'Mystic Artifact',
    description: 'A rare relic pulsing with arcane power.',
    icon: <IconWand size={32} color="rebeccapurple" />,
    glowColor: 'rebeccapurple',
    gradient: 'linear-gradient(135deg, #e1d5f2, #c6a1f2)',
    basePrice: 100,
    owned: 0,
  },
];

export default function ArcaneExchange() {
  const goldBalance = 130;

  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(inventory.map((item) => [item.id, 1]))
  );

  const handleBuy = (itemId: string) => {
    console.log('Buying', itemId, 'x', quantities[itemId]);
    // hook up real logic here!
  };

  return (
    <Box
      py="xl"
      style={{
        backgroundColor: '#fff',
        borderRadius: rem(24),
      }}
    >
      <Container size="lg">
        <Stack spacing="xl">
          <Stack spacing={0} mb="sm">
            <Title order={2} ta="center">
              Arcane Exchange
            </Title>
            <Text ta="center" size="sm" c="dimmed">
              Authorized by the Galactic Magic Association – gear up for your next quest. 🪐✨
            </Text>
          </Stack>

          <Grid gutter="xl">
            {inventory.map((item) => (
              <Grid.Col
                key={item.id}
                xs={12}
                sm={6}
                md={4}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <ResourceCard
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  glowColor={item.glowColor}
                  gradient={item.gradient}
                  balance={item.owned}
                  goldBalance={goldBalance}
                  price={item.basePrice}
                  quantity={quantities[item.id]}
                  setQuantity={(val) =>
                    setQuantities((prev) => ({
                      ...prev,
                      [item.id]: val ?? 1,
                    }))
                  }
                  totalCost={item.basePrice * quantities[item.id]}
                  actionLabel="Buy"
                  onAction={() => handleBuy(item.id)}
                  style={{ width: '100%', maxWidth: 360 }}
                />
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
