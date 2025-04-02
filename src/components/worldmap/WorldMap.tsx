import React, { useState } from 'react';
import { Button, Group, Modal, Text, Stack, Grid, Col } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconWorld, IconLanguage, IconBook } from '@tabler/icons-react';

const locations = [
  { name: 'English', iso: 'EN', description: 'The global language of communication.', icon: <IconWorld size={60} color="blue" /> },
  { name: 'Spanish', iso: 'ES', description: 'A widely spoken language with rich culture.', icon: <IconLanguage size={60} color="red" /> },
  { name: 'Japanese', iso: 'JA', description: 'A language of technology and tradition.', icon: <IconBook size={60} color="purple" /> },
  { name: 'French', iso: 'FR', description: 'The language of love and diplomacy.', icon: <IconWorld size={60} color="blue" /> },
  { name: 'German', iso: 'DE', description: 'A language of precision and engineering.', icon: <IconLanguage size={60} color="red" /> },
  { name: 'Chinese', iso: 'ZH', description: 'One of the oldest and most spoken languages.', icon: <IconBook size={60} color="purple" /> },
];

const WorldMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const openLocationModal = (location: any) => {
    setSelectedLocation(location);
    setOpenModal(true);
  };

  const closeModal = () => {
    setSelectedLocation(null);
    setOpenModal(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Grid container for languages */}
      <Grid gutter="xl" justify="center" align="start">
        {locations.map((location, index) => (
          <Grid.Col key={location.iso} span={4} xs={6} sm={4} md={2}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 1 }}
              style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => openLocationModal(location)}
            >
              <Stack align="center" spacing="xs">
                {location.icon}
                <Button size="sm" variant="outline" style={{ borderRadius: '8px' }}>
                  {location.name} ({location.iso})
                </Button>
              </Stack>
            </motion.div>
          </Grid.Col>
        ))}
      </Grid>

      {selectedLocation && (
        <Modal opened={openModal} onClose={closeModal} title={selectedLocation.name} size="xs">
          <Text size="lg">{selectedLocation.description}</Text>
          <Group position="center" mt="xl">
            <Button onClick={() => alert(`Exploring ${selectedLocation.name}...`)} size="lg">
              Explore
            </Button>
          </Group>
        </Modal>
      )}
    </div>
  );
};

export default WorldMap;
