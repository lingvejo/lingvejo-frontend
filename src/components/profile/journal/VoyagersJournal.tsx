'use client';

import React, { useEffect, useState } from 'react';
import { Calendar } from '@mantine/dates';
import {
  Indicator,
  Paper,
  Text,
  Textarea,
  Group,
  Divider,
  Title,
  Center,
  Container,
  Box,
  ActionIcon,
  Tooltip,
  Flex
} from '@mantine/core';
import {
  IconEdit,
  IconDeviceFloppy,
  IconX,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { getJournalEntriesForMonth } from '@/utils/data/getters/getJournalEntriesForMonth';
import { getMonthRange } from '@/utils/date/getMonthRange';
import { setJournalEntry } from '@/utils/data/setters/setJournalEntry';
import { useVoyager } from '@/contexts/VoyagerContext';
import LoadingScreen from '@/components/core/LoadingScreen';

const textMaxLength = 140;

const VoyagerJournal = () => {
  const t = useTranslations('journal');
  const { voyager, loading } = useVoyager();
  const voyagerId = voyager?.id;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthDate, setMonthDate] = useState(dayjs().startOf('month').toDate());
  const [lastLoadedMonth, setLastLoadedMonth] = useState('');
  const [entriesMap, setEntriesMap] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const selectedDateStr = dayjs(selectedDate).format('YYYY-MM-DD');
  const isToday = dayjs(selectedDate).isSame(dayjs(), 'day');

  const handleMonthChange = (date: Date) => {
    setMonthDate(dayjs(date).startOf('month').toDate());
  };

  useEffect(() => {
    if (!voyagerId || !monthDate) return;

    const monthKey = dayjs(monthDate).format('YYYY-MM');
    if (lastLoadedMonth === monthKey) return;

    const { start, end } = getMonthRange(monthDate);
    getJournalEntriesForMonth(voyagerId, start, end).then((entries) => {
      const map: Record<string, string> = {};
      entries.forEach((e) => {
        map[e.entryDate] = e.content;
      });
      setEntriesMap((prev) => ({ ...prev, ...map }));
      setLastLoadedMonth(monthKey);
    });
  }, [voyagerId, monthDate, lastLoadedMonth]);

  useEffect(() => {
    if (selectedDateStr in entriesMap) {
      setDraft(entriesMap[selectedDateStr]);
      setIsEditing(false);
    } else {
      setDraft('');
    }
  }, [selectedDateStr, entriesMap]);

  const handleSave = async () => {
    if (!voyagerId) return;
    const success = await setJournalEntry(voyagerId, selectedDateStr, draft);
    if (success) {
      setEntriesMap((prev) => ({ ...prev, [selectedDateStr]: draft }));
      setIsEditing(false);
    }
  };

  if (loading || !voyager) return <LoadingScreen />;

  return (
    <Container size="xs" px="sm" mt="md" mb={80}>
      <Paper withBorder p="xl" radius="md">
        <Center mb="sm">
          <Title order={3}>{t('title')}</Title>
        </Center>

        <Text align="center" color="dimmed" mb="md">
          {t('description')}
        </Text>

        <Flex justify="center">
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            getDayProps={(date) => ({
              selected: dayjs(date).isSame(selectedDate, 'date'),
              onClick: () => setSelectedDate(date),
            })}
            renderDay={(date) => {
              const dateStr = dayjs(date).format('YYYY-MM-DD');
              const hasEntry = !!entriesMap[dateStr];
              const day = date.getDate();

              return (
                <Indicator
                  size={6}
                  color="var(--mantine-primary-color-filled)"
                  offset={-2}
                  disabled={!hasEntry}
                >
                  <div>{day}</div>
                </Indicator>
              );
            }}
            onNextMonth={handleMonthChange}
            onPreviousMonth={handleMonthChange}
            onNextYear={handleMonthChange}
            onPreviousYear={handleMonthChange}
            onYearSelect={handleMonthChange}
            onMonthSelect={handleMonthChange}
            minDate={new Date('2020-01-01')}
            maxDate={new Date()}
          />
        </Flex>

        <Divider my="xl" />

        <Paper
          withBorder
          p="lg"
          radius="md"
          shadow="sm"
          style={{ border: '1px solid var(--mantine-color-gray-3)' }}
        >
          <Group position="apart" mb="xs">
            <Text fw={600}>
              {dayjs(selectedDate).format('dddd, MMMM D')}
            </Text>

            {!isEditing && isToday && (
              <Tooltip label={t('edit')}>
                <ActionIcon
                  variant="subtle"
                  color="var(--mantine-primary-color-filled)"
                  onClick={() => setIsEditing(true)}
                >
                  <IconEdit size={18} />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>

          <Divider mb="sm" />

          {isEditing ? (
            <>
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.currentTarget.value)}
                placeholder={t('placeholder')}
                autosize
                minRows={4}
                maxRows={8}
                maxLength={textMaxLength}
                variant="unstyled"
                styles={{
                  input: {
                    backgroundColor: 'transparent',
                    fontFamily: 'serif',
                    fontSize: '16px',
                    lineHeight: 1.6,
                    padding: 0,
                  },
                }}
              />
              <Text size="xs" color="dimmed" align="right" mt="xs">
                {draft.length}/{textMaxLength}
              </Text>
              <Group position="right" mt="sm" spacing="xs">
                <Tooltip label={t('save')}>
                  <ActionIcon
                    variant="filled"
                    color="var(--mantine-primary-color-filled)"
                    onClick={handleSave}
                  >
                    <IconDeviceFloppy size={16} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label={t('cancel')}>
                  <ActionIcon
                    variant="light"
                    color="gray"
                    onClick={() => setIsEditing(false)}
                  >
                    <IconX size={16} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </>
          ) : entriesMap[selectedDateStr] ? (
            <Text
              style={{
                fontFamily: 'serif',
                fontSize: '16px',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {entriesMap[selectedDateStr]}
            </Text>
          ) : (
            <Text color="dimmed" fs="italic">
              {t('noEntry')}
            </Text>
          )}
        </Paper>
      </Paper>
    </Container>
  );
};

export default VoyagerJournal;
