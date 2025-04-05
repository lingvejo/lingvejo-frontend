'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Progress,
  Badge,
  Stack,
  Paper,
  Group,
  Tooltip,
  Notification,
  useMantineTheme,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Calendar } from '@mantine/dates';
import { IconCheck, IconFlame, IconSparkles, IconRefresh } from '@tabler/icons-react';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function Streak() {
  const theme = useMantineTheme();
  const [goal, setGoal] = useState(7);
  const [dates, setDates] = useState<Date[]>([]);
  const [level, setLevel] = useState(1);
  const [showCongrats, { open, close }] = useDisclosure(false);

  const isTodayLogged = dates.some((d) => dayjs(d).isSame(new Date(), 'day'));
  const streak = dates.length;
  const progress = Math.min((streak / goal) * 100, 100);

  const handleMarkToday = () => {
    if (!isTodayLogged) {
      const newDates = [...dates, new Date()];
      setDates(newDates);

      const newStreak = newDates.length;
      if (newStreak % 5 === 0) open();
      if (newStreak >= level * 5) setLevel((lvl) => lvl + 1);
    }
  };

  const handleReset = () => {
    setDates([]);
    setLevel(1);
    close();
  };

  return (
    <Container size="xs" py="xl">
      <Stack spacing="lg" align="center">
        <Stack spacing={4} align="center">
          <Text size="xs" c="dimmed" tt="uppercase" fw={700} letterSpacing={0.5}>
            Daily Mission
          </Text>
          <Title order={2} ta="center" fw={700}>
            🌠 Ritual Streak
          </Title>
          <Text ta="center" c="dimmed" size="sm">
            Mark your daily rituals to keep your streak alive.
          </Text>
        </Stack>

        <Paper
          withBorder
          radius="md"
          p="lg"
          shadow="md"
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(6px)',
            width: '100%',
          }}
        >
          <Stack spacing="md">
            <Group position="apart">
              <Text fw={600} size="sm">
                🧙 Level {level}
              </Text>
              <Badge
                color="var(--mantine-primary-color-filled)"
                radius="sm"
                size="md"
                leftSection={<IconFlame size={14} />}
              >
                {streak} Day{streak !== 1 ? 's' : ''}
              </Badge>
            </Group>

            <Progress
              value={progress}
              radius="xl"
              size="lg"
              color="var(--mantine-primary-color-filled)"
            />

            <Button
              fullWidth
              size="md"
              leftIcon={<IconFlame size={18} />}
              onClick={handleMarkToday}
              disabled={isTodayLogged}
              variant={isTodayLogged ? 'light' : 'filled'}
              color={isTodayLogged ? 'gray' : 'green'}
              radius="md"
            >
              {isTodayLogged ? 'Already Completed Today' : 'Log Today’s Ritual'}
            </Button>

            <Tooltip label="Reset your streak and start fresh" withArrow>
              <Button
                variant="subtle"
                color="red"
                leftIcon={<IconRefresh size={18} />}
                onClick={handleReset}
                size="xs"
              >
                Reset Streak
              </Button>
            </Tooltip>
          </Stack>
        </Paper>

        <Paper withBorder radius="md" p="md" mt="lg" w="100%" shadow="xs">
          <Text fw={500} mb="sm" ta="center" size="sm">
            ✨ Ritual Calendar
          </Text>
          <Calendar
            size="md"
            value={dates}
            multiple
            readOnly
            fullWidth
            styles={{
              day: (date) => {
                const matched = dates.some((d) => dayjs(d).isSame(date, 'day'));
                return matched
                  ? {
                      backgroundColor: theme.colors.teal[6],
                      color: theme.white,
                      fontWeight: 700,
                      borderRadius: rem(8),
                    }
                  : {};
              },
            }}
          />
        </Paper>

        {showCongrats && (
          <Notification
            onClose={close}
            color="orange"
            icon={<IconSparkles />}
            title="🎉 Milestone Achieved!"
            withBorder
            radius="md"
          >
            You've reached a {streak}-day streak! 🔮 Keep the magic flowing.
          </Notification>
        )}
      </Stack>
    </Container>
  );
}
