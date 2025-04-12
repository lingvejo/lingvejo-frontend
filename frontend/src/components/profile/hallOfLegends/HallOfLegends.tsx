'use client';

import { useEffect, useState } from 'react';
import { useVoyager } from '@/contexts/VoyagerContext';
import { useTranslations } from 'next-intl';
import LoadingScreen from '@/components/core/loading/LoadingScreen';
import { getHallOfLegendsVoyager } from '@/utils/data/queries/getHallOfLegendsVoyager';
import PaginatedGridView from '@/components/core/PaginatedGridView';
import HallOfLegendCard from './HallOfLegendCard';

const HallOfLegends = () => {
  const { voyager, loading } = useVoyager();
  const [achievements, setAchievements] = useState<
    {
      legendId: number;
      name: string;
      description: string;
      category: string;
      rarity: string;
    }[]
  >([]);
  const t = useTranslations('hallOfLegends');

  useEffect(() => {
    if (voyager?.uid) {
      getHallOfLegendsVoyager(voyager.uid).then(setAchievements);
    }
  }, [voyager?.uid]);

  if (loading || !voyager) {
    return <LoadingScreen />;
  }

  return (
    <PaginatedGridView
      title={t('title')}
      emptyTitle={t('empty.title')}
      emptyDescription={t('empty.description')}
      items={achievements}
      renderItem={(ach) => <HallOfLegendCard key={ach.legendId} {...ach} />}
    />
  );
};

export default HallOfLegends;
