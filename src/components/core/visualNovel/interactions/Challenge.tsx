'use client';

import React, { useState } from 'react';
import { Button, Card, Stack, Text, TextInput } from '@mantine/core';
import { normalizeText } from '@/utils/text/normalizeText';
import { ChallengeProps } from '../types';

const Challenge = ({ challenge, onComplete }: ChallengeProps) => {
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleCheckAnswer = () => {
    const normalizedInput = normalizeText(userInput);
    const answer = normalizeText(challenge.translation);
    const success = normalizedInput === answer;
    setIsCorrect(success);
    if (success && onComplete) onComplete();
  };

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder>
      <Stack spacing="md">
        <Text size="lg" fw={600} ta="center">
          {challenge.text}
        </Text>

        <TextInput
            value={userInput}
            onChange={(e) => setUserInput(e.currentTarget.value)}
            placeholder="Type your answer..."
            size="md"
            radius="md"
            w="100%"
        />

        {isCorrect !== null && (
          <Text size="md" c={isCorrect ? 'green' : 'red'} ta="center">
            {isCorrect ? '✅ Correct!' : '❌ Incorrect. Try again!'}
          </Text>
        )}

        <Button
          onClick={handleCheckAnswer}
          disabled={!userInput}
          fullWidth
          size="md"
          variant="filled"
          radius="md"
        >
          Check Answer
        </Button>
      </Stack>
    </Card>
  );
};

export default Challenge;
