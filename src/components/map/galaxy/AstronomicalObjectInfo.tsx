import React from 'react';
import {
  Modal,
  Paper,
  Title,
  Text,
  Divider,
  Group,
  Badge,
  Stack,
} from '@mantine/core';

export interface Planet {
  id: number;
  name: string;
  iso: string;
  description?: string;
  discoveredDate: string;
  discoveredBy: string;
  lastObservedDate: string;
  lastObservedBy: string;
  adventurers: number;
  wizards: number;
  orbitWidth: number;
  orbitHeight: number;
  duration: number;
  startAngle: number;
}

interface AstronomicalObjectInfoProps {
  planet: Planet | null;
  planetInfoOpened: boolean;
  onClose: () => void;
}

const labelStyle = {
  fontSize: 14,
  color: 'var(--mantine-color-dimmed)',
};

const AstronomicalObjectInfo: React.FC<AstronomicalObjectInfoProps> = ({
  planet,
  planetInfoOpened,
  onClose,
}) => {
  if (!planet) return null;

  return (
    <Modal
      opened={planetInfoOpened}
      onClose={onClose}
      size="xs"
      withCloseButton
      centered
      radius="md"
      overlayProps={{ blur: 5 }}
    >
      <Paper p="lg">
        <Stack spacing="xs">
          <Title order={2} style={{ textAlign: 'center' }}>
            {planet.name}
          </Title>
          {planet.description &&
            <Text size="xs" color="dimmed" style={{ textAlign: 'center' }}>
              {planet.description}
            </Text>
          }

          <Divider my="sm" />

          <Group position="apart">
            <Text style={labelStyle}>🧭 Galactic Designation Code:</Text>
            <Text weight={500}>{planet.iso.toUpperCase()}</Text>
          </Group>
          <Group position="apart">
            <Text style={labelStyle}>🪐 Celestial Registry ID:</Text>
            <Text weight={500}>{planet.id}</Text>
          </Group>

          <Divider my="sm" />

          <Group position="apart">
            <Text style={labelStyle}>🌌 Orbit Width:</Text>
            <Text weight={500}>{planet.orbitWidth.toFixed(2)} units</Text>
          </Group>
          <Group position="apart">
            <Text style={labelStyle}>🌀 Orbit Height:</Text>
            <Text weight={500}>{planet.orbitHeight.toFixed(2)} units</Text>
          </Group>
          <Group position="apart">
            <Text style={labelStyle}>⏳ Orbital Period:</Text>
            <Text weight={500}>{planet.duration.toFixed(2)} seconds</Text>
          </Group>


          <Divider my="sm" />

          <Group position="apart">
            <Text style={labelStyle}>🔍 Discovered:</Text>
            <Text weight={500}>
              {planet.discoveredDate} by {planet.discoveredBy}
            </Text>
          </Group>
          <Group position="apart">
            <Text style={labelStyle}>🔭 Last Observed:</Text>
            <Text weight={500}>
              {planet.lastObservedDate} by {planet.lastObservedBy}
            </Text>
          </Group>

          <Divider my="sm" />

          <Group position="center" spacing="xs">
            <Badge color="blue" variant="light">
              🧑‍🚀 Adventurers: {planet.adventurers}
            </Badge>
            <Badge color="grape" variant="light">
              🧙 Wizards: {planet.wizards}
            </Badge>
          </Group>
          <Group position="center" spacing="xs" mt="xs">
            <Badge color="teal" variant="filled">
              🌍 Total Inhabitants: {planet.adventurers + planet.wizards}
            </Badge>
          </Group>
        </Stack>
      </Paper>
    </Modal>
  );
};

export default AstronomicalObjectInfo;
