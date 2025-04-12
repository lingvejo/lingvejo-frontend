'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Quest } from './types';
import { QuestLoader } from './QuestLoader';
import LoadingScreen from '@/components/core/loading/LoadingScreen';

interface QuestJourneyProps {
  quest: Quest;
  onComplete: () => void;
}

export default function QuestJourney({ quest, onComplete }: QuestJourneyProps) {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const loaded = await QuestLoader(quest, onComplete);
        setContent(loaded);
      } catch (error) {
        console.error('Failed to load quest:', error);
        onComplete();
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [quest, onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 5000,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }}
    >
      {loading ? <LoadingScreen /> : content}
    </div>
  );
}
