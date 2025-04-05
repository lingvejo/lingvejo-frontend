'use client';

import {
  Card,
  Group,
  Stack,
  Text,
  Badge,
  ThemeIcon,
} from '@mantine/core';
import { IconWand } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

type Props = {
  planetName: string;
  iso: string;
  level: number;
};

export default function SpellworkCard({
  planetName,
  iso,
  level,
}: Props) {
  const t = useTranslations('wizardRank');
  const rankName = t(`${level}.name`);
  const rankDescription = t(`${level}.description`);

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
      <Stack spacing="xs">
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

        <Group spacing="xs">
          <ThemeIcon
            size="sm"
            variant="light"
            style={{ backgroundColor: 'var(--mantine-primary-color-light)' }}
          >
            <IconWand size={16} color="var(--mantine-primary-color-light-color)" />
          </ThemeIcon>
          <Text size="sm" c="dimmed">
            {rankName} (L{level})
          </Text>
        </Group>

        <Text size="xs" c="dimmed" lh={1.4}>
          {rankDescription}
        </Text>
      </Stack>
    </Card>
  );
}
