'use client';

import {
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconBook, IconSparkles } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { getPlanetQuests } from '@/utils/data/queries/getPlanetQuests';
import LoadingScreen from '@/components/core/loading/LoadingScreen';
import { Quest } from '../quest/types';
import QuestJourney from '../quest/QuestJourney';

type Settlement = {
  settlementId: number;
  name: string;
};

interface QuestViewerProps {
  settlement: Settlement;
}

export default function QuestViewer({ settlement }: QuestViewerProps) {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);
  const [questViewKey, setQuestViewKey] = useState(0); // 👈 for rerender

  useEffect(() => {
    const fetchQuests = async () => {
      const result = await getPlanetQuests(settlement.settlementId);
      setQuests(result);
      setLoading(false);
    };

    fetchQuests();
  }, [settlement.settlementId]);

  if (loading) return <LoadingScreen />;

  if (activeQuest) {
    return (
      <QuestJourney
        key={questViewKey} // 👈 reset QuestJourney on rerender
        quest={activeQuest}
        onComplete={() => {
          setActiveQuest(null);
          setQuestViewKey((prev) => prev + 1);
        }}
      />
    );
  }

  const unlockedCount = quests.length;

  return (
    <Container size="xs" py="xl">
      <Stack spacing="xl">
        {/* Wizard Message */}
        <Card
          shadow="sm"
          padding="md"
          radius="md"
          withBorder
          sx={{
            backgroundColor: 'var(--mantine-primary-color-light)',
            borderColor: 'var(--mantine-primary-color-light-hover)',
            boxShadow: '0 0 12px var(--mantine-primary-color-light-hover)',
            fontStyle: 'italic',
          }}
        >
          <Text size="sm" color="dimmed" mb={4}>
            🧙‍♀️ Wizard Mira whispers:
          </Text>
          <Text size="sm">
            “Welcome, traveler. The secrets of <b>{settlement.name}</b> await. Let your magic guide you.”
          </Text>
        </Card>

        {/* Quest Section */}
        <Card
          shadow="lg"
          padding="md"
          radius="md"
          withBorder
          sx={{
            backgroundColor: 'var(--mantine-primary-color-light)',
            borderColor: 'var(--mantine-primary-color-light-hover)',
          }}
        >
          <Stack spacing="md">
            <Group position="apart">
              <Title
                order={4}
                sx={{
                  fontFamily: '"Cinzel", serif',
                  color: 'var(--mantine-primary-color-filled)',
                }}
              >
                🗺️ Quests in {settlement.name}
              </Title>
              <Badge
                size="sm"
                radius="sm"
                variant="filled"
                color="var(--mantine-primary-color-filled)"
              >
                {unlockedCount}/{quests.length}
              </Badge>
            </Group>

            <Divider color="var(--mantine-primary-color-light-hover)" />

            {/* Quest Cards */}
            <Stack spacing="sm">
              {quests.map((quest) => (
                <Card
                  key={quest.questId}
                  withBorder
                  radius="md"
                  padding="sm"
                  shadow="md"
                  sx={{
                    backgroundColor: 'var(--mantine-primary-color-light-hover)',
                    borderColor: 'var(--mantine-primary-color-light-hover)',
                    transition: 'all 150ms ease',
                    '&:hover': {
                      transform: 'scale(1.01)',
                      boxShadow: '0 0 10px var(--mantine-primary-color-light-hover)',
                    },
                  }}
                >
                  <Stack spacing={6}>
                    <Text size="sm" fw={500}>
                      {quest.title}
                    </Text>
                    <Button
                      mt="xs"
                      size="xs"
                      fullwidth="true"
                      variant="filled"
                      lefticon={<IconBook size={14} />}
                      onClick={() => setActiveQuest(quest)}
                    >
                      Begin Quest
                    </Button>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Card>

        {/* Footer */}
        <Group position="center" spacing={6}>
          <ThemeIcon
            radius="xl"
            size="sm"
            variant="gradient"
            gradient={{ from: 'yellow', to: 'pink', deg: 45 }}
          >
            <IconSparkles size={14} />
          </ThemeIcon>
          <Text ta="center" color="dimmed" size="sm">
            Complete quests to unlock the ancient lore of {settlement.name}.
          </Text>
        </Group>
      </Stack>
    </Container>
  );
}
