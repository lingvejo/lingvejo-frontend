'use client';

import React, { useState } from 'react';
import { Button, Card, Stack, Text, TextInput } from '@mantine/core';
import { normalizeText } from '@/utils/text/normalizeText';

export interface ChallengeInteractionProps {
  challenge: {
    translation: string;
    text: string;
  };
  onComplete?: () => void;
}

const Challenge = ({ challenge, onComplete }: ChallengeInteractionProps) => {
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleCheckAnswer = () => {
    const normalizedInput = normalizeText(userInput);
    const correctAnswer = normalizeText(challenge.translation);
    const success = normalizedInput === correctAnswer;
    setIsCorrect(success);
    if (success && onComplete) onComplete();
  };

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder>
      <Stack spacing="md">
        {isCorrect !== null && (
          <Text size="md" c={isCorrect ? 'green' : 'red'} ta="center">
            {isCorrect ? '✅ Correct!' : '❌ Incorrect. Try again!'}
          </Text>
        )}

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
