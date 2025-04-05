'use client';

import {
  Container,
  Stack,
  Paper,
  Text,
  Title,
  Button,
  Group,
  Divider,
  Badge,
  Avatar,
} from '@mantine/core';
import { IconSwords, IconBook, IconSparkles } from '@tabler/icons-react';

const testData = [
  {
    missionTitle: '🌄 Morning Ritual',
    quests: [
      { id: 1, title: 'Learn 3 new words', status: 'locked' },
      { id: 2, title: 'Pronounce a sentence', status: 'unlocked' },
    ],
  },
  {
    missionTitle: '🧠 Mind Expansion',
    quests: [
      { id: 3, title: 'Match word with image', status: 'unlocked' },
      { id: 4, title: 'Complete a mini-story', status: 'locked' },
    ],
  },
];

export default function Adventure() {
  return (
    <Container size="xs" py="xl">
      <Stack spacing="xl">

        {/* Wizard Message */}
        <Paper p="md" withBorder radius="md" style={{ position: 'relative' }}>
          <Text size="sm" color="dimmed" style={{ marginBottom: 8 }}>
            🧙‍♀️ Wizard Mira says:
          </Text>
          <Text>"A new dawn, a new chance to learn! Choose your path wisely."</Text>

          <Avatar
            src="/wizard.png"
            radius="xl"
            size={64}
            style={{ position: 'absolute', right: -20, bottom: -20 }}
          />
        </Paper>

        {/* Daily Missions */}
        {testData.map((mission, idx) => (
          <Paper key={idx} withBorder radius="md" p="md">
            <Stack spacing="sm">
              <Group position="apart">
                <Title order={4}>{mission.missionTitle}</Title>
                <Badge color="var(--mantine-primary-color-filled)">
                  {mission.quests.filter(q => q.status === 'unlocked').length}/{mission.quests.length}
                </Badge>
              </Group>

              <Divider />

              {mission.quests.map((quest) => (
                <Group key={quest.id} position="apart">
                  <Text>{quest.title}</Text>
                  <Button
                    size="xs"
                    variant={quest.status === 'unlocked' ? 'filled' : 'outline'}
                    color={quest.status === 'unlocked' ? 'green' : 'gray'}
                    leftIcon={<IconBook size={14} />}
                    disabled={quest.status === 'locked'}
                  >
                    {quest.status === 'unlocked' ? 'Begin' : 'Locked'}
                  </Button>
                </Group>
              ))}
            </Stack>
          </Paper>
        ))}

        {/* Footer */}
        <Text ta="center" color="dimmed" size="sm">
          Complete your daily missions to master the language of Thaloria! 🌌
        </Text>
      </Stack>
    </Container>
  );
}
