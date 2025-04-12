'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Progress,
  Group,
  Title,
  Text,
  Stack,
  Divider,
  Container,
} from '@mantine/core';
import { IconClock, IconCheck, IconGift } from '@tabler/icons-react';

interface Mission {
  id: string;
  description: string;
  progress: number;
  goal: number;
  reward: string;
  completed: boolean;
  timeLimit: number; // in seconds
  timeLeft: number;
}

const DailyMissions: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [timeLeft, setTimeLeft] = useState('24:00:00');

  useEffect(() => {
    setMissions([
      {
        id: '1',
        description: 'Complete 3 lessons',
        progress: 2,
        goal: 3,
        reward: '🎓 50 XP',
        completed: false,
        timeLimit: 3600,
        timeLeft: 3600,
      },
      {
        id: '2',
        description: 'Earn 100 gold',
        progress: 50,
        goal: 100,
        reward: '🧾 Magic Scroll',
        completed: false,
        timeLimit: 7200,
        timeLeft: 7200,
      },
      {
        id: '3',
        description: 'Use a potion',
        progress: 1,
        goal: 1,
        reward: '💰 5 Gold',
        completed: true,
        timeLimit: 0,
        timeLeft: 0,
      },
    ]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMissions((prev) =>
        prev.map((mission) =>
          !mission.completed && mission.timeLeft > 0
            ? { ...mission, timeLeft: mission.timeLeft - 1 }
            : mission
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const claimReward = (id: string) => {
    setMissions((prev) =>
      prev.map((mission) =>
        mission.id === id ? { ...mission, completed: true } : mission
      )
    );
  };

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <Container size="sm" py="xl">
      <Stack spacing="xl">
        <Stack spacing={0}>
          <Title order={2} fw={900} ta="center">
            Daily Missions
          </Title>
          <Text ta="center" size="sm" c="dimmed">
            Assigned by the Galactic Magic Association – fulfill them before time runs out!
          </Text>
        </Stack>

        {missions.map((mission) => {
          const progressPercent = (mission.progress / mission.goal) * 100;
          const isExpired = !mission.completed && mission.timeLeft <= 0;

          return (
            <Card
              key={mission.id}
              shadow="md"
              radius="md"
              withBorder
              padding="lg"
              style={{
                backgroundColor: mission.completed
                  ? 'var(--mantine-primary-color-light)'
                  : isExpired
                  ? '#fff0f0'
                  : 'white',
                borderColor: mission.completed
                  ? 'var(--mantine-primary-color-filled)'
                  : isExpired
                  ? '#ffa8a8'
                  : undefined,
                opacity: mission.completed ? 0.9 : 1,
              }}
            >
              <Group position="apart" mb="xs">
                <Text fw={600}>{mission.description}</Text>
                <Text size="sm" c="dimmed">
                  {mission.reward}
                </Text>
              </Group>

              <Progress
                value={progressPercent}
                radius="xl"
                size="md"
                striped
                animate
                color={mission.completed ? 'teal' : 'blue'}
              />

              <Group position="apart" mt="sm">
                <Text size="sm" c="dimmed">
                  {mission.progress}/{mission.goal}
                </Text>
                <Text size="sm" c={isExpired ? 'red' : 'dimmed'}>
                  {isExpired ? '❌ Expired' : `⏳ ${formatTime(mission.timeLeft)}`}
                </Text>
              </Group>

              <Button
                fullWidth
                mt="md"
                color={mission.completed ? 'gray' : 'yellow'}
                leftIcon={
                  mission.completed ? <IconCheck size={16} /> : <IconGift size={16} />
                }
                disabled={
                  mission.completed ||
                  mission.progress < mission.goal ||
                  isExpired
                }
                onClick={() => claimReward(mission.id)}
              >
                {mission.completed ? 'Completed' : 'Claim Reward'}
              </Button>
            </Card>
          );
        })}

        <Divider />

        <Group position="center">
          <IconClock size={16} />
          <Text size="sm">New missions in: {timeLeft}</Text>
        </Group>
      </Stack>
    </Container>
  );
};

export default DailyMissions;
