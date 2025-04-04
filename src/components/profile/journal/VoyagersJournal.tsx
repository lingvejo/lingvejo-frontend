'use client';

import {
  Button,
  Container,
  Indicator,
  Paper,
  Stack,
  Text,
  Textarea,
  Title,
  Divider,
  Group,
  Transition,
} from '@mantine/core';
import { Calendar } from '@mantine/dates';
import {
  IconEdit,
  IconX,
  IconDeviceFloppy,
} from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

const MAX_LENGTH = 280;
const today = new Date();

export default function VoyagerJournal() {
  const [entries, setEntries] = useState<Record<string, string>>({});
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [editContent, setEditContent] = useState('');
  const [editMode, setEditMode] = useState(false);

  const selectedKey = useMemo(
    () => selectedDate.toDateString(),
    [selectedDate]
  );

  const hasEntry = useMemo(
    () => !!entries[selectedKey],
    [entries, selectedKey]
  );

  const isToday = selectedKey === today.toDateString();

  const formattedDate = dayjs(selectedDate).format('dddd, MMMM D');

  // Load existing entry on date change
  useEffect(() => {
    if (!editMode) {
      setEditContent(entries[selectedKey] || '');
    }
  }, [selectedKey, entries, editMode]);

  const handleSave = () => {
    const trimmed = editContent.trim();
    if (trimmed.length > 0 && trimmed.length <= MAX_LENGTH) {
      setEntries((prev) => ({ ...prev, [selectedKey]: trimmed }));
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    setEditContent(entries[selectedKey] || '');
    setEditMode(false);
  };

  return (
    <Container size="sm" py="lg">
      <Stack gap="xl">
        <Stack gap="xs" align="center">
          <Title order={2}>The Voyager’s Journal</Title>
          <Text c="dimmed" size="sm">
            Select a date to view your log of that day’s journey.
          </Text>
        </Stack>

        {/* 📆 Calendar */}
        <Paper radius="md" shadow="sm" p="md">
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Calendar
              fullWidth
              value={selectedDate}
              onChange={(date) => {
                if (date) {
                  setSelectedDate(date);
                  setEditMode(false);
                }
              }}
              maxDate={today}
              renderDay={(date) => {
                const key = date.toDateString();
                const exists = !!entries[key];
                return (
                  <Indicator
                    size={6}
                    color="var(--mantine-primary-color-filled)"
                    offset={-2}
                    disabled={!exists}
                  >
                    <div>{date.getDate()}</div>
                  </Indicator>
                );
              }}
              styles={{
                calendarBase: { width: '100%', maxWidth: '100%' },
                root: { width: '100%' },
              }}
            />
          </div>
        </Paper>

        {/* 📜 Journal */}
        <Paper
          radius="md"
          shadow="sm"
          p="md"
          style={{
            minHeight: 200,
          }}
        >
          <Group justify="space-between" mb="xs">
            <Text fw={500}>{formattedDate}</Text>
            {isToday && !editMode && (
              <Button
                onClick={() => setEditMode(true)}
                size="xs"
                leftSection={<IconEdit size={14} />}
                variant="light"
              >
                Write Entry
              </Button>
            )}
            {editMode && (
              <Text size="xs" c="dimmed">
                {editContent.length}/{MAX_LENGTH}
              </Text>
            )}
          </Group>

          <Divider my="sm" />

          {/* 📝 Entry Area */}
          <Transition mounted={!editMode} transition="fade" duration={200}>
            {(styles) =>
              hasEntry ? (
                <Text style={styles}>{entries[selectedKey]}</Text>
              ) : (
                <Text c="dimmed" style={styles}>
                  No journal entry found for this day.
                </Text>
              )
            }
          </Transition>

          {editMode && (
            <Stack gap="xs" mt="xs">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.currentTarget.value)}
                autosize
                minRows={3}
                maxLength={MAX_LENGTH}
                placeholder="Describe today’s discovery, adventurer..."
              />

              <Group justify="flex-start">
                <Button
                  size="xs"
                  onClick={handleSave}
                  leftSection={<IconDeviceFloppy size={14} />}
                >
                  Save
                </Button>
                <Button
                  variant="subtle"
                  size="xs"
                  color="gray"
                  onClick={handleCancel}
                  leftSection={<IconX size={14} />}
                >
                  Cancel
                </Button>
              </Group>
            </Stack>
          )}
        </Paper>
      </Stack>
    </Container>
  );
}
