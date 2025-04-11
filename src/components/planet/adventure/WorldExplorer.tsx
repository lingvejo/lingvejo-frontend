'use client';

import { useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Anchor,
  Group,
  Text,
} from '@mantine/core';
import { IconWorld, IconChevronRight } from '@tabler/icons-react';
import GlobeViewer from './viewer/GlobeViewer';
import RegionViewer from './viewer/RegionViewer';
import QuestViewer from './viewer/QuestViewer';

export default function WorldExplorer() {
  const [selectedContinent, setSelectedContinent] = useState<{
    continentId: number;
    name: string;
    description: string;
  } | null>(null);

  const [selectedSettlement, setSelectedSettlement] = useState<{
    settlementId: number;
    name: string;
  } | null>(null);

  const resetToWorld = () => {
    setSelectedSettlement(null);
    setSelectedContinent(null);
  };

  const resetToContinent = () => {
    setSelectedSettlement(null);
  };

  const breadcrumbs = [
    <Anchor key="world" onClick={resetToWorld} c="dimmed" style={{ cursor: 'pointer' }}>
      <Group gap={6}>
        <IconWorld size={16} />
        <Text>World</Text>
      </Group>
    </Anchor>,
    selectedContinent && (
      <Anchor key="continent" onClick={resetToContinent} c="dimmed" style={{ cursor: 'pointer' }}>
        {selectedContinent.name}
      </Anchor>
    ),
    selectedSettlement && (
      <Text key="settlement" fw={500}>
        {selectedSettlement.name}
      </Text>
    ),
  ].filter(Boolean);

  return (
    <Box>
      <Box px="md" pt="md" pb="sm">
        <Breadcrumbs separator={<IconChevronRight size={16} />} fz="sm">
          {breadcrumbs}
        </Breadcrumbs>
      </Box>

      {!selectedContinent ? (
        <GlobeViewer onContinentClick={setSelectedContinent} />
      ) : !selectedSettlement ? (
        <RegionViewer continent={selectedContinent} onSettlementClick={setSelectedSettlement} />
      ) : (
        <QuestViewer settlement={selectedSettlement} />
      )}
    </Box>
  );
}
