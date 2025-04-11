'use client';

import { useEffect, useState } from 'react';
import { getPlanetRegions } from '@/utils/data/queries/getPlanetRegions';
import LoadingScreen from '@/components/core/loading/LoadingScreen';
import QuestQuill from '../quest/QuestQuill';

interface RegionViewerProps {
  continent: {
    continentId: number;
    name: string;
    description: string;
  };
  onSettlementClick: (settlement: { settlementId: number; name: string }) => void;
}

export default function RegionViewer({ continent, onSettlementClick }: RegionViewerProps) {
  const [regions, setRegions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegions = async () => {
      const result = await getPlanetRegions(continent.continentId);
      setRegions(result);
      setLoading(false);
    };

    fetchRegions();
  }, [continent.continentId]);

  if (loading) return <LoadingScreen />;

  return (
    <QuestQuill
      continent={{
        name: continent.name,
        description: continent.description,
        regions,
      }}
      onSettlementClick={onSettlementClick}
    />
  );
}
