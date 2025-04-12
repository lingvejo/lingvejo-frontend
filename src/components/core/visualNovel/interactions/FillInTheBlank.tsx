'use client';

import React, { useState } from 'react';
import { Button, Card, Stack, Text, Radio, Group } from '@mantine/core';
import { FillInTheBlankProps } from '../types';

const FillInTheBlank = ({ sentence, options, onComplete }: FillInTheBlankProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleCheckAnswer = () => {
    const answer = options[0];
    const success = selectedOption === answer;
    setIsCorrect(success);
    if (success && onComplete) onComplete();
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setIsCorrect(null);
  };

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder>
      <Stack spacing="md">
        <Text size="lg" fw={600} ta="center">
          {sentence.replace('___', '______')}
        </Text>

        <Radio.Group value={selectedOption} onChange={setSelectedOption}>
          <Stack>
            {options.map((option, index) => (
              <Radio key={index} value={option} label={option} />
            ))}
          </Stack>
        </Radio.Group>

        {isCorrect !== null && (
          <Text size="md" c={isCorrect ? 'green' : 'red'} ta="center">
            {isCorrect ? '✅ Correct!' : '❌ Try Again!'}
          </Text>
        )}

        <Group grow>
          <Button
            onClick={handleCheckAnswer}
            disabled={!selectedOption}
            variant="filled"
            radius="md"
          >
            Check Answer
          </Button>

          <Button
            variant="light"
            color="gray"
            radius="md"
            onClick={handleRetry}
          >
            Retry
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default FillInTheBlank;
