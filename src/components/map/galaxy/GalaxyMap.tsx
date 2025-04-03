import React, { useState } from 'react';
import { Center, Breadcrumbs, Anchor, Box, Flex, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { getGalaxy } from '@/utils/data';
import StarSystemView from './StarSystemView';
import GalaxyView from './GalaxyView';

const GalaxyMap = () => {
  const systems = getGalaxy();
  const [selectedSystem, setSelectedSystem] = useState(null);

  const breadcrumbItems = [
    <Anchor
      key="galaxy"
      onClick={() => setSelectedSystem(null)}
      style={{
        fontWeight: 600,
        fontSize: '1rem',
        color: 'var(--mantine-primary-color-filled)',
        transition: 'color 0.2s ease',
        cursor: 'pointer',
      }}
    >
      Galaxy
    </Anchor>,
    selectedSystem && (
      <Text key="system" size="sm" color="dimmed" style={{ fontWeight: 500 }}>
        {selectedSystem.systemName}
      </Text>
    ),
  ].filter(Boolean);

  return (
    <Box>
      <Flex
        justify="center"
        align="center"
        style={{
          width: '100%',
          paddingTop: 10,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '8px 16px',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Breadcrumbs separator={<IconChevronRight size={14} color="gray" />}>
          {breadcrumbItems}
        </Breadcrumbs>
      </Flex>
      <Box style={{ position: 'relative', width: '78%', height: '60vh', overflow: 'hidden' }}>
        <Center style={{ position: 'relative', width: '100%', height: '100%' }}>
          {!selectedSystem ? (
            <GalaxyView systems={systems} selectedSystem={selectedSystem} setSelectedSystem={setSelectedSystem} />
          ) : (
            <StarSystemView
              systemName={selectedSystem.systemName}
              planets={selectedSystem.planets}
              onPlanetClick={() => {}}
              planetInfoOpened={false}
            />
          )}
        </Center>
      </Box>
    </Box>
  );
};

export default GalaxyMap;
