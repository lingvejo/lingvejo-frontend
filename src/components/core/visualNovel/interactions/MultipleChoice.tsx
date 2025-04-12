'use client';

import { useState } from 'react';
import { Card, Stack, Text, Checkbox, Group, Button } from '@mantine/core';
import { MultipleChoiceProps } from '../types';

const MultipleChoice = ({ options, correct, onComplete }: MultipleChoiceProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleCheck = () => {
    const correctChoice = selectedOptions.sort().toString() === correct.sort().toString();
    setIsCorrect(correctChoice);
    if (correctChoice && onComplete) {
      onComplete();
    }
  };

  const reset = () => {
    setSelectedOptions([]);
    setIsCorrect(null);
  };

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder>
      <Stack align="center" spacing="md">
        <Checkbox.Group
          value={selectedOptions}
          onChange={setSelectedOptions}
        >
          <Stack>
            {options.map((option, index) => (
              <Checkbox key={index} value={option} label={option} />
            ))}
          </Stack>
        </Checkbox.Group>

        {isCorrect !== null && (
          <Text color={isCorrect ? 'green' : 'red'}>
            {isCorrect ? '✅ Correct!' : '❌ Incorrect!'}
          </Text>
        )}

        <Group>
          <Button
            onClick={handleCheck}
            disabled={selectedOptions.length === 0}
            color="primary"
          >
            Check Answer
          </Button>
          <Button variant="light" color="gray" onClick={reset}>
            Retry
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default MultipleChoice;
