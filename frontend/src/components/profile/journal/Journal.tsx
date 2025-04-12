'use client';

import {
  Paper,
  Text,
  Center,
  Container,
  Divider,
  Title,
  Flex,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useVoyager } from '@/contexts/VoyagerContext';
import LoadingScreen from '@/components/core/loading/LoadingScreen';
import { getJournalEntriesForMonth } from '@/utils/data/queries/getJournalEntriesForMonth';
import { getMonthRange } from '@/utils/date/getMonthRange';
import { setJournalEntry } from '@/utils/data/mutations/setJournalEntry';

import JournalCalendar from './JournalCalendar';
import JournalEditor from './JournalEditor';
import JournalEntryCard from './JournalEntryCard';

const textMaxLength = 140;

export default function VoyagerJournal() {
  const t = useTranslations('journal');
  const { voyager, loading } = useVoyager();
  const uid = voyager?.uid;

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
    if (!uid || !monthDate) return;

    const monthKey = dayjs(monthDate).format('YYYY-MM');
    if (lastLoadedMonth === monthKey) return;

    const { start, end } = getMonthRange(monthDate);
    getJournalEntriesForMonth(uid, start, end).then((entries) => {
      const map: Record<string, string> = {};
      entries.forEach((e) => {
        map[e.entryDate] = e.content;
      });
      setEntriesMap((prev) => ({ ...prev, ...map }));
      setLastLoadedMonth(monthKey);
    });
  }, [uid, monthDate, lastLoadedMonth]);

  useEffect(() => {
    if (selectedDateStr in entriesMap) {
      setDraft(entriesMap[selectedDateStr]);
      setIsEditing(false);
    } else {
      setDraft('');
    }
  }, [selectedDateStr, entriesMap]);

  const handleSave = async () => {
    if (!uid) return;
    const success = await setJournalEntry(uid, selectedDateStr, draft);
    if (success) {
      setEntriesMap((prev) => ({ ...prev, [selectedDateStr]: draft }));
      setIsEditing(false);
    }
  };

  if (loading || !voyager) return <LoadingScreen />;

  return (
    <Container size="xs" px="sm" mt="md" mb={80}>
      <Paper shadow="md" radius="md" withBorder p="xl" radius="md">
        <Center mb="sm">
          <Title order={3}>{t('title')}</Title>
        </Center>

        <Text align="center" color="dimmed" mb="md">
          {t('description')}
        </Text>

        <Flex justify="center">
          <JournalCalendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onMonthChange={handleMonthChange}
            entriesMap={entriesMap}
          />
        </Flex>

        <Divider my="xl" />

        {isEditing ? (
          <JournalEditor
            draft={draft}
            setDraft={setDraft}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
            maxLength={textMaxLength}
            t={t}
          />
        ) : (
          <JournalEntryCard
            selectedDate={selectedDate}
            content={entriesMap[selectedDateStr]}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editable={isToday}
            t={t}
          />
        )}
      </Paper>
    </Container>
  );
}
