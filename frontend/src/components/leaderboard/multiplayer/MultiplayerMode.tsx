import React, { useState } from 'react';
import { Card, Button, Group, Text, Title, Stack, Loader, Alert } from '@mantine/core';
import { IconSword, IconUsers, IconTrophy } from '@tabler/icons-react';

const MultiplayerMode: React.FC = () => {
  const [isMatching, setIsMatching] = useState(false);
  const [opponent, setOpponent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const findMatch = () => {
    setIsMatching(true);
    setError(null);

    setTimeout(() => {
      const opponents = ['WizardX', 'SpellMaster99', 'Linguo', 'GrammarKnight'];
      const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];
      setOpponent(randomOpponent);
      setIsMatching(false);
    }, 2000);
  };

  return (
    <Card shadow="lg" padding="lg" radius="xl" withBorder style={{ maxWidth: 400, margin: 'auto' }}>
      <Stack align="center" spacing="md">
        <Title order={2} color="var(--mantine-primary-color-filled)">
          Multiplayer Mode
        </Title>
        <Text color="dimmed" align="center">
          Challenge another player in a mystical language duel!
        </Text>
        {opponent ? (
          <Alert title="Match Found!" color="green">
            You are facing <strong>{opponent}</strong> in a battle of words!
          </Alert>
        ) : (
          isMatching ? <Loader color="var(--mantine-primary-color-filled)" /> : <Text>No opponent found yet.</Text>
        )}
        {error && <Alert title="Error" color="red">{error}</Alert>}
        <Group position="center">
          <Button leftIcon={<IconSword />} onClick={findMatch} disabled={isMatching}>
            {isMatching ? 'Searching...' : 'Find Match'}
          </Button>
        </Group>
        <Group spacing="md">
          <Button leftIcon={<IconUsers />} variant="outline">
            View Leaderboard
          </Button>
          <Button leftIcon={<IconTrophy />} variant="filled" color="yellow">
            Earn Rewards
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default MultiplayerMode;
