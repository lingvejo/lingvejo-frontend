import React from 'react';
import { Card, Progress, Text, Group, Stack } from '@mantine/core';
import { IconBooks, IconMessageCircle, IconStar } from '@tabler/icons-react';

interface ProgressTrackerProps {
  wordsLearned: number;
  phrasesMastered: number;
  proficiency: number; // 0 - 100 (%)
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ wordsLearned, phrasesMastered, proficiency }) => {
  return (
    <Card shadow="md" radius="lg" padding="lg" style={{ width: '100%', maxWidth: 400 }}>
      <Stack spacing="sm">
        <Text size="xl" weight={600} align="center">Language Progress</Text>
        
        <Group position="apart">
          <Group>
            <IconBooks size={20} />
            <Text size="sm">Words Learned</Text>
          </Group>
          <Text weight={500}>{wordsLearned}</Text>
        </Group>

        <Group position="apart">
          <Group>
            <IconMessageCircle size={20} />
            <Text size="sm">Phrases Mastered</Text>
          </Group>
          <Text weight={500}>{phrasesMastered}</Text>
        </Group>
        
        <Text size="sm">Proficiency Level</Text>
        <Progress value={proficiency} size="lg" radius="lg" color="var(--mantine-primary-color-filled)" />
        <Text align="center" weight={500}>{proficiency}%</Text>
      </Stack>
    </Card>
  );
};

export default ProgressTracker;
