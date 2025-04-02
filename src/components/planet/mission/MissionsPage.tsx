import React, { useState, useEffect } from 'react';
import { Card, Button, Progress, Group, Title, Text, Stack, Divider, Container } from '@mantine/core';
import { IconClock, IconCheck, IconGift } from '@tabler/icons-react';

interface Mission {
  id: string;
  description: string;
  progress: number;
  goal: number;
  reward: string;
  completed: boolean;
  timeLimit: number; // time in seconds for the mission to expire
  timeLeft: number; // remaining time for the challenge
}

const MissionsPage: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [timeLeft, setTimeLeft] = useState('24:00:00'); // General timer for refresh

  // Initialize missions with time-based challenges
  useEffect(() => {
    setMissions([
      { 
        id: '1', 
        description: 'Complete 3 lessons', 
        progress: 2, 
        goal: 3, 
        reward: '50 XP', 
        completed: false,
        timeLimit: 3600, // 1 hour challenge
        timeLeft: 3600, // Start with 1 hour
      },
      { 
        id: '2', 
        description: 'Earn 100 gold', 
        progress: 50, 
        goal: 100, 
        reward: 'Magic Scroll', 
        completed: false,
        timeLimit: 7200, // 2 hours challenge
        timeLeft: 7200, // Start with 2 hours
      },
      { 
        id: '3', 
        description: 'Use a potion', 
        progress: 1, 
        goal: 1, 
        reward: '5 Gold', 
        completed: true,
        timeLimit: 0, // No time limit for this one
        timeLeft: 0, // Already completed
      },
    ]);
  }, []);

  // Handle time countdown for missions
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setMissions(prevMissions => 
        prevMissions.map(mission => {
          if (!mission.completed && mission.timeLeft > 0) {
            return {
              ...mission,
              timeLeft: mission.timeLeft - 1,
            };
          }
          return mission;
        })
      );
    }, 1000); // Update every second

    return () => clearInterval(timerInterval);
  }, []);

  const claimReward = (id: string) => {
    setMissions(prevMissions =>
      prevMissions.map(mission =>
        mission.id === id ? { ...mission, completed: true } : mission
      )
    );
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <Container>
      <Stack spacing="lg" p="md">
        <Title align="center" order={1}>Missions</Title>
        <Text align="center" size="sm" color="dimmed">Complete missions to earn rewards!</Text>

        {missions.map(mission => (
          <Card key={mission.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Group position="apart">
              <Text weight={500}>{mission.description}</Text>
              <Text color="dimmed">{mission.reward}</Text>
            </Group>
            <Progress value={(mission.progress / mission.goal) * 100} mt="sm" />
            <Group position="apart" mt="md">
              <Text size="sm" color="dimmed">{mission.progress}/{mission.goal} completed</Text>
              <Text size="sm" color={mission.timeLeft <= 0 ? 'red' : 'dimmed'}>
                {mission.timeLeft > 0 ? `Time Left: ${formatTime(mission.timeLeft)}` : 'Expired'}
              </Text>
              {mission.completed ? (
                <Button leftIcon={<IconCheck />} disabled>Completed</Button>
              ) : (
                <Button 
                  leftIcon={<IconGift />} 
                  onClick={() => claimReward(mission.id)} 
                  disabled={mission.progress < mission.goal || mission.timeLeft <= 0}
                >
                  Claim
                </Button>
              )}
            </Group>
          </Card>
        ))}

        <Divider my="sm" />
        <Group position="center">
          <IconClock />
          <Text size="sm">New missions in: {timeLeft}</Text>
        </Group>
      </Stack>
    </Container>
  );
};

export default MissionsPage;
