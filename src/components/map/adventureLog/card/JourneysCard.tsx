'use client';

import PrettyDate from '@/components/core/date/PrettyDate';
import {
  Card,
  Group,
  Stack,
  Text,
  Badge,
  ThemeIcon,
} from '@mantine/core';
import { IconMapPin, IconBook2 } from '@tabler/icons-react';

type Props = {
  planetName: string;
  iso: string;
  latestQuest: string;
  settlementName: string;
  completedAt: string;
};

export default function JourneysCard({
  planetName,
  iso,
  latestQuest,
  settlementName,
  completedAt
}: Props) {
  return (
    <Card
      radius="md"
      shadow="xs"
      withBorder
      p="md"
      style={{
        backgroundColor: 'white',
        borderColor: 'var(--mantine-primary-color-light)',
        transition: 'border 0.3s ease',
      }}
    >
      <Stack spacing="sm">
        <Group justify="space-between">
          <Text fw={600} size="lg" c="var(--mantine-primary-color-filled)">
            {planetName}
          </Text>
          <Badge
            size="sm"
            variant="light"
            style={{
              backgroundColor: 'var(--mantine-primary-color-light)',
              color: 'var(--mantine-primary-color-light-color)',
            }}
          >
            {iso.toUpperCase()}
          </Badge>
        </Group>

        <Stack spacing={4}>
          <Group spacing="xs">
            <ThemeIcon
              size="sm"
              variant="light"
              style={{ backgroundColor: 'var(--mantine-primary-color-light)' }}
            >
              <IconBook2 size={16} color="var(--mantine-primary-color-light-color)" />
            </ThemeIcon>
            <Text size="sm" c="dimmed">
              {latestQuest ?? 'Unknown quest'}
            </Text>
          </Group>

          <Group spacing="xs">
            <ThemeIcon
              size="sm"
              variant="light"
              style={{ backgroundColor: 'var(--mantine-primary-color-light)' }}
            >
              <IconMapPin size={16} color="var(--mantine-primary-color-light-color)" />
            </ThemeIcon>
            <Text size="sm" c="dimmed">
              {settlementName ?? 'Unknown settlement'}
            </Text>
          </Group>

          <Badge
            size="sm"
            variant="filled"
            mt="xs"
            style={{
              alignSelf: 'flex-start',
              backgroundColor: 'var(--mantine-primary-color-filled)',
            }}
          >
            <PrettyDate date={completedAt} />
          </Badge>
        </Stack>
      </Stack>
    </Card>
  );
}
