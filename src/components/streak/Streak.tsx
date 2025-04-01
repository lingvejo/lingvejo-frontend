// src/streak.page.tsx

import React, { useState } from 'react';
import { Container, Title, Text, Button, TextInput, Group } from '@mantine/core';

const Streak: React.FC = () => {
  const [goal, setGoal] = useState<number | ''>(5); // Default goal
  const [streak, setStreak] = useState<number>(0); // User's current streak
  const [dates, setDates] = useState<Date[]>([]); // Dates for the streak

  const handleGoalChange = (value: string) => {
    setGoal(value ? parseInt(value) : '');
  };

  const handleDateChange = (date: Date | null) => {
    if (date && !dates.includes(date)) {
      setDates((prev) => [...prev, date]);
      setStreak((prev) => prev + 1); // Increment streak
    }
  };

  return (
    <Container>
      <Title order={2}>Your Streak</Title>
      <Text>Your current streak: {streak}</Text>
      <TextInput
        label="Set your goal"
        value={goal === '' ? '' : goal.toString()}
        onChange={(event) => handleGoalChange(event.currentTarget.value)}
        placeholder="Enter your goal"
        type="number"
      />
      <Text>Your goal: {goal}</Text>
      <Title order={3}>Track Your Streak</Title>
      {/* <DatePicker
        value={dates[dates.length - 1] || null}
        onChange={handleDateChange}
        placeholder="Pick a date"
      /> */}
      <Group position="right" mt="md">
        <Button onClick={() => setStreak(0)}>Reset Streak</Button>
      </Group>
    </Container>
  );
};

export default Streak;
