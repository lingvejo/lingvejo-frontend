import React, { useState } from 'react';
import { Container, Switch, Grid, Text, Card, useMantineTheme } from '@mantine/core';
import { useTranslations } from 'next-intl';
import WarpEffect from './WarpEffect';
import './LoadingScreen.css';

const LoadingScreen: React.FC = () => {
  const theme = useMantineTheme();
  const t = useTranslations('loading');
  const [warpVelocity, setWarpVelocity] = useState(true);
  const [stellarAmplification, setStellarAmplification] = useState(true);

  return (
    <Container
      fluid
      className="loading-container"
      data-theme={theme.colorScheme}
    >
      <WarpEffect warpVelocity={warpVelocity} stellarAmplification={stellarAmplification} />
      <div className="spaceship-window" />
      <Grid gutter="lg" justify="center" align="center" className="control-panels">
        <Card shadow="xl" padding="lg" className="control-panel">
          <Text align="center" size="lg" weight={600}>
            {t('titleWarpVelocity')}
          </Text>
          <Switch
            checked={warpVelocity}
            onChange={(e) => setWarpVelocity(e.currentTarget.checked)}
            label={
              warpVelocity ? t('label.active') : t('label.inactive')
            }
            size="md"
            style={{ marginTop: '10px' }}
          />
        </Card>

        <Card shadow="xl" padding="lg" className="control-panel">
          <Text align="center" size="lg" weight={600}>
            {t('titleStellarAmplification')}
          </Text>
          <Switch
            checked={stellarAmplification}
            onChange={(e) => setStellarAmplification(e.currentTarget.checked)}
            label={
              stellarAmplification ? t('label.active') : t('label.inactive')
            }
            size="md"
            style={{ marginTop: '10px' }}
          />
        </Card>
      </Grid>
    </Container>
  );
};

export default LoadingScreen;
