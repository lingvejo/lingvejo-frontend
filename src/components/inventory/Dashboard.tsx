import React, { useState, useEffect } from 'react';
import { Container, Stack, Title, Text } from '@mantine/core';
import InventoryManager from './InventoryManager';
import { getSetting, setSetting } from '@/utils/data';

const Dashboard: React.FC = () => {
  const [potion, setPotion] = useState(0);
  const [gold, setGold] = useState(0);

  useEffect(() => {
    setPotion(Number(getSetting('potion')));
    setGold(Number(getSetting('gold')));
  }, []);

  const updatePotion = (newPotion: number) => {
    setPotion(newPotion);
    setSetting('potion', newPotion);
  };

  const updateGold = (newGold: number) => {
    setGold(newGold);
    setSetting('gold', newGold);
  };

  return (
    <Container size="sm" fluid p="md">
      <Stack spacing="lg" justify="center">
        <Title order={1} align="center" mt="xs" style={{ color: 'var(--mantine-color-primary-7)' }}>
          Inventory
        </Title>
        <Text align="center" color="dimmed" size="sm" mb="md" style={{ color: 'var(--mantine-color-primary-5)' }}>
          Manage your resources to continue your adventure!
        </Text>

        <InventoryManager type="potion" potion={potion} gold={gold} setPotion={updatePotion} setGold={updateGold} />
        <InventoryManager type="gold" potion={potion} gold={gold} setPotion={updatePotion} setGold={updateGold} />

        <Container mt="xl" />
      </Stack>
    </Container>
  );
};

export default Dashboard;
