'use client';

import { Card, Stack, Text, Badge } from '@mantine/core';
import { League } from '@/types/League'; // Ensure League type is exported properly
import PaginatedGridView from '@/components/core/PaginatedGridView';
import { UseTranslations } from 'next-intl'; // Import the type for translation function

type Props = {
  leagues: League[];
  itemsPerPage: number;
  page: number;
  setPage: (p: number) => void;
  onSelect: (league: League) => void;
  t: UseTranslations;
};

export default function LeagueList({
  leagues,
  itemsPerPage,
  page,
  setPage,
  onSelect,
  t
}: Props) {
  return (
    <PaginatedGridView
      title={t('title')}
      items={leagues}
      page={page}
      setPage={setPage}
      itemsPerPage={itemsPerPage}
      emptyTitle={t('empty.title', { defaultValue: 'No Leagues Yet' })}
      emptyDescription={t('empty.description', { defaultValue: 'Check back later for available leagues.' })}
      renderItem={(league) => (
        <Card
          key={league.id}
          withBorder
          shadow="sm"
          p="md"
          radius="md"
          onClick={() => onSelect(league)}
          style={{ cursor: 'pointer' }}
        >
          <Stack spacing={4}>
            <Text fw={600} size="lg">
              {league.name}
            </Text>
            <Badge color="blue" variant="light">
              {league.minXP} – {league.maxXP ?? '∞'} XP
            </Badge>
          </Stack>
        </Card>
      )}
    />
  );
}
