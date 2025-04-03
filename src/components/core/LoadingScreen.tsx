import React from 'react';
import { Container, Loader, Text, Center, useMantineTheme } from '@mantine/core';
import { useTranslations } from 'next-intl';

const LoadingScreen: React.FC = () => {
  const theme = useMantineTheme(); // Access Mantine theme
  const t = useTranslations(); // Access translations

  // Array of loading keys to randomly choose from
  const loadingMessages = [
    'loading.summoningSpells',
    'loading.brewingEnergies',
    'loading.unlockingMysteries',
    'loading.castingIncantations',
    'loading.drawingFromForces',
    'loading.channelingMagic',
    'loading.weavingWisdom',
  ];

  // Randomly select a message
  const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  return (
    <Container
      fluid
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Center style={{ flexDirection: 'column' }}>
        <Loader size="xl" variant="bars" color={theme.primaryColor} />
        <Text size="xl" style={{ marginTop: 20 }}>
          {t(randomMessage)} {/* Display the selected loading message */}
        </Text>
      </Center>
    </Container>
  );
};

export default LoadingScreen;
