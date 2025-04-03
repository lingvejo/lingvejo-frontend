import React from 'react';
import { Modal, Paper, Title, Text, Divider, Group, Badge } from '@mantine/core';

export interface Planet {
  name: string;
  iso: string;
  orbitWidth: number;
  orbitHeight: number;
  duration: number;
  adventurers: number;
  wizards: number;
  discoveredDate: string;
  discoveredBy: string;
  lastObservedDate: string;
  lastObservedBy: string;
}

interface AstronomicalObjectInfoProps {
  planet: Planet | null;
  planetInfoOpened: boolean;
  onClose: () => void;
}

const AstronomicalObjectInfo: React.FC<AstronomicalObjectInfoProps> = ({ planet, planetInfoOpened, onClose }) => {
  if (!planet) return null;

  return (
    <Modal opened={planetInfoOpened} onClose={onClose} size="xs" withCloseButton centered radius="md">
      <Paper padding="lg" style={{ textAlign: 'center' }}>
        <Title order={2} style={{ marginBottom: 4 }}>{planet.name}</Title>
        <Text size="sm" color="dimmed">{planet.iso.toUpperCase()}</Text>

        <Divider my="md" />

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

        <Group position="center" spacing="xs">
          <Text size="sm" color="dimmed">🔍 Discovered:</Text>
          <Text size="sm" weight={500}>{planet.discoveredDate} by {planet.discoveredBy}</Text>
        </Group>
        <Divider my="md" />
        <Group position="center" spacing="xs">
          <Text size="sm" color="dimmed">🔭 Last Observed:</Text>
          <Text size="sm" weight={500}>{planet.lastObservedDate} by {planet.lastObservedBy}</Text>
        </Group>

        <Divider my="md" />

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

export default AstronomicalObjectInfo;
