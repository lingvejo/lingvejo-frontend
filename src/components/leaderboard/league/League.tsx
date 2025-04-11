'use client';

import { useState, useEffect } from 'react';
import { Stack, Breadcrumbs, Text, Center, Pagination } from '@mantine/core';
import { getAllLeagues } from '@/utils/data/queries/getAllLeagues';
import { getVoyagersInLeague } from '@/utils/data/queries/getVoyagersInLeague';
import LoadingScreen from '@/components/core/loading/LoadingScreen';
import { useTranslations } from 'next-intl';
import LeagueList from './LeagueList';
import VoyagerList from './VoyagerList';
import { Voyager } from '@/contexts/VoyagerContext';

interface League {
  id: number;
  name: string;
  minXP: number;
  maxXP?: number | null;
}

export default function LeaguePage() {
  const t = useTranslations('league');
  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [voyagers, setVoyagers] = useState<Voyager[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingVoyagers, setLoadingVoyagers] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    async function fetchLeagues() {
      setLoading(true);
      const data = await getAllLeagues();
      setLeagues(data);
      setLoading(false);
    }
    fetchLeagues();
  }, []);

  useEffect(() => {
    async function fetchVoyagers() {
      if (selectedLeague) {
        setLoadingVoyagers(true);
        const data = await getVoyagersInLeague(
          selectedLeague.minXP,
          selectedLeague.maxXP ?? 999999
        );
        setVoyagers(data);
        setPage(1);
        setLoadingVoyagers(false);
      }
    }
    fetchVoyagers();
  }, [selectedLeague]);

  useEffect(() => {
    function updateItemsPerPage() {
      const cardHeight = 60;
      const availableHeight = window.innerHeight - 400;
      const count = Math.max(3, Math.floor(availableHeight / cardHeight));
      setItemsPerPage(count);
    }

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Stack spacing="lg">
      {selectedLeague &&
        <Breadcrumbs>
          <Text
            component="span"
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedLeague(null)}
          >
            {t('title')}
          </Text>
          <Text>{selectedLeague.name}</Text>
        </Breadcrumbs>
      }

      {!selectedLeague ? (
        <LeagueList
          leagues={leagues}
          itemsPerPage={itemsPerPage}
          page={page}
          setPage={setPage}
          onSelect={setSelectedLeague}
        />
      ) : loadingVoyagers ? (
        <LoadingScreen />
      ) : (
        <VoyagerList
          voyagers={voyagers}
          page={page}
          itemsPerPage={itemsPerPage}
          setPage={setPage}
          t={t}
        />
      )}
    </Stack>
  );
}
