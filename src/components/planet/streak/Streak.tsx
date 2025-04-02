import React, { useState } from 'react';
import { Container, Title, Text, Button, TextInput, Group, Progress, Badge, Stack, Tooltip } from '@mantine/core';

const Streak: React.FC = () => {
  const [goal, setGoal] = useState<number | ''>(5); // Default goal
  const [streak, setStreak] = useState<number>(0); // User's current streak
  const [dates, setDates] = useState<Date[]>([]); // Dates for the streak
  const [level, setLevel] = useState<number>(1); // Level of the user
  const [showBadge, setShowBadge] = useState<boolean>(false); // Badge for streak achievements

  const handleGoalChange = (value: string) => {
    setGoal(value ? parseInt(value) : '');
  };

  const handleDateChange = (date: Date | null) => {
    if (date && !dates.includes(date)) {
      setDates((prev) => [...prev, date]);
      setStreak((prev) => prev + 1); // Increment streak
      if (streak % 5 === 0) { // Display badge at every 5-day milestone
        setShowBadge(true);
      }
    }
  };

  const handleResetStreak = () => {
    setStreak(0);
    setLevel(1); // Reset level when streak is reset
    setShowBadge(false);
  };

  // Calculate progress as percentage
  const progress = (streak / (goal || 1)) * 100;

  // Increase level as streak increases
  if (streak >= level * 5) {
    setLevel(level + 1);
  }

  return (
    <Container size="sm">
      <Stack align="center" spacing="xl">
        <Title order={2} align="center">Your Streak</Title>
        <Text align="center" size="lg">Your current streak: {streak} day{streak !== 1 ? 's' : ''}</Text>
        
        {/* Progress bar */}
        <Progress value={progress} size="xl" color="teal" />

        {/* Streak level */}
        <Text align="center" size="md">
          Level {level} - Keep going to reach the next milestone!
        </Text>

        {/* Show badge on milestone */}
        {showBadge && (
          <Badge color="orange" size="lg">
            Streak Achieved: {streak} Days!
          </Badge>
        )}

        {/* Goal input */}
        <TextInput
          label="Set Your Goal"
          value={goal === '' ? '' : goal.toString()}
          onChange={(event) => handleGoalChange(event.currentTarget.value)}
          placeholder="Enter your goal"
          type="number"
          style={{ width: '80%' }}
        />

        <Text align="center" size="md">Your goal: {goal} days</Text>

        {/* Button to reset streak */}
        <Group position="center" spacing="lg">
          <Button color="red" onClick={handleResetStreak}>Reset Streak</Button>
        </Group>

        {/* Tooltip for daily challenge */}
        <Tooltip label="Complete today's challenge to keep the streak going!" position="top" withArrow>
          <Button size="lg" color="green" style={{ width: '80%' }} onClick={() => handleDateChange(new Date())}>
            Complete Today's Challenge
          </Button>
        </Tooltip>

        {/* Footer with motivational text */}
        <Text align="center" size="sm" color="dimmed">
          Keep your streak alive to unlock more rewards and badges!
        </Text>
      </Stack>
    </Container>
  );
};

export default Streak;
