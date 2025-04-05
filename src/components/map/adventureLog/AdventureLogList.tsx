'use client';

import PaginatedGridView from '@/components/core/PaginatedGridView';
import JourneysCard from './card/JourneysCard';
import SpellworkCard from './card/SpellworkCard';
import { useTranslations } from 'next-intl';

type Props = {
  role: 'adventurer' | 'wizard';
  data: {
    planetId: number;
    planetName: string;
    iso: string;
    isCurrent: boolean;
    exploration?: number; // for adventurer
    latestQuest: string;
    settlementName: string;
    level?: number; // for wizard
    completedAt: string;
  }[];
};

const AdventureLogList = ({ role, data }: Props) => {
  const t = useTranslations('adventureLog');

  return (
    <PaginatedGridView
      title={null}
      emptyTitle={t(`empty.${role}.title`)}
      emptyDescription={t(`empty.${role}.description`)}
      items={data}
      renderItem={(planet) =>
        role === 'adventurer' ? (
          <JourneysCard
            key={planet.planetId}
            planetName={planet.planetName}
            iso={planet.iso}
            latestQuest={planet.latestQuest}
            settlementName={planet.settlementName}
            completedAt={planet.completedAt}
          />
        ) : (
          <SpellworkCard
            key={planet.planetId}
            planetName={planet.planetName}
            iso={planet.iso}
            level={planet.level ?? 0}
          />
        )
      }
    />
  );
};

export default AdventureLogList;
