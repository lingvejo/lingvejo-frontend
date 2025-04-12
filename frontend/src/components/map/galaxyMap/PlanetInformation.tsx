import React from 'react';
import { Modal, Paper, Title, Text, Divider, Group, Badge } from '@mantine/core';

interface PlanetInfoProps {
  planet: {
    name: string;
    iso: string;
    orbitWidth: number;
    orbitHeight: number;
    duration: number;
    adventurers: number;
    wizards: number;
    discovered: { date: string; by: string }; // Added discovered info
    lastObserved: { date: string; by: string }; // Added last observed info
  } | null;
  planetInfoOpened: boolean;
  onClose: () => void;
}

const PlanetInformation: React.FC<PlanetInfoProps> = ({ planet, planetInfoOpened, onClose }) => {
  if (!planet) return null;

  return (
    <Modal
      opened={planetInfoOpened}
      onClose={onClose}
      size="xs"
      withCloseButton
      centered
      radius="md"
      aria-labelledby="planet-modal-title"
      aria-describedby="planet-modal-description"
    >
      <Paper padding="lg" style={{ textAlign: 'center' }}>
        {/* Planet Name & ISO */}
        <Title order={2} id="planet-modal-title" style={{ marginBottom: 4 }}>
          {planet.name}
        </Title>
        <Text size="sm" color="dimmed">{planet.iso.toUpperCase()}</Text>

        <Divider my="md" />

        {/* Orbital Data */}
        <Group position="center" spacing="xs">
          <Text size="sm" color="dimmed">🌌 Semi-Major Axis:</Text>
          <Text size="sm" weight={500}>{Math.round(planet.orbitWidth)} units</Text>
        </Group>
        <Group position="center" spacing="xs">
          <Text size="sm" color="dimmed">🌀 Semi-Minor Axis:</Text>
          <Text size="sm" weight={500}>{Math.round(planet.orbitHeight)} units</Text>
        </Group>
        <Group position="center" spacing="xs">
          <Text size="sm" color="dimmed">⏳ Orbital Period:</Text>
          <Text size="sm" weight={500}>{Math.round(planet.duration)} seconds</Text>
        </Group>

        <Divider my="md" />

        {/* Discovery and Observation Data */}
        <Group position="center" spacing="xs">
          <Text size="sm" color="dimmed">🔍 Discovered:</Text>
          <Text size="sm" weight={500}>{planet.discovered.date} by {planet.discovered.by}</Text>
        </Group>
        <Divider my="md" />
        <Group position="center" spacing="xs">
          <Text size="sm" color="dimmed">🔭 Last Observed:</Text>
          <Text size="sm" weight={500}>{planet.lastObserved.date} by {planet.lastObserved.by}</Text>
        </Group>

        <Divider my="md" />

        {/* Population Data */}
        <Group position="center" spacing="xs">
          <Badge color="blue" variant="light">🧑‍🚀 Adventurers: {planet.adventurers}</Badge>
          <Badge color="grape" variant="light">🧙 Wizards: {planet.wizards}</Badge>
        </Group>
        <Group position="center" spacing="xs" mt="xs">
          <Badge color="teal" variant="filled">🌍 Total Inhabitants: {planet.adventurers + planet.wizards}</Badge>
        </Group>
      </Paper>
    </Modal>
  );
};

export default PlanetInformation;
