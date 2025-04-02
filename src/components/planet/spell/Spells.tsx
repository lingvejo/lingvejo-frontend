import React, { useState } from 'react';
import { Button, Card, Group, Modal, Text, Stack } from '@mantine/core';
import { motion } from 'framer-motion';

interface Spell {
  name: string;
  description: string;
  effect: string;
  cooldown: number;
  unlocked: boolean;
  upgradeCost: number;
}

const spellsData: Spell[] = [
  {
    name: 'Spell of Focus',
    description: 'Focus your mind and boost your learning speed for a short time.',
    effect: 'Double the XP for the next lesson.',
    cooldown: 1,
    unlocked: true,
    upgradeCost: 50,
  },
  {
    name: 'Spell of Knowledge',
    description: 'Summon the wisdom of the ancients to review past lessons.',
    effect: 'Review a random past lesson with extra rewards.',
    cooldown: 12,
    unlocked: true,
    upgradeCost: 100,
  },
  {
    name: 'Spell of Time',
    description: 'Slows down time to complete more lessons in less time.',
    effect: 'Boost the available time for the next lesson.',
    cooldown: 6,
    unlocked: false,
    upgradeCost: 150,
  },
];

const Spells: React.FC = () => {
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [openModal, setOpenModal] = useState(false);

  // Open the modal with the selected spell details
  const openSpellModal = (spell: Spell) => {
    setSelectedSpell(spell);
    setOpenModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedSpell(null);
    setOpenModal(false);
  };

  // Simulate upgrading a spell
  const upgradeSpell = (spell: Spell) => {
    if (spell.upgradeCost <= 100) { // Example condition for sufficient resources
      alert(`Upgraded ${spell.name}!`);
    } else {
      alert(`Not enough resources to upgrade ${spell.name}.`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Text align="center" size="xl" weight={700} mb="xl">Magic Spells</Text>
      <Group spacing="lg" position="center">
        {spellsData.map((spell, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 1 }}
          >
            <Card
              shadow="sm"
              padding="lg"
              style={{
                width: '250px',
                backgroundColor: spell.unlocked ? '#f7f7f7' : '#ddd',
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={() => spell.unlocked && openSpellModal(spell)}
            >
              <Text align="center" weight={500} size="lg" mb="xs">{spell.name}</Text>
              <Text align="center" size="sm" color="dimmed">{spell.effect}</Text>
              <Text align="center" size="xs" color="gray" mt="md">
                {spell.unlocked ? 'Unlocked' : `Locked (Cost: ${spell.upgradeCost} coins)`}
              </Text>
            </Card>
          </motion.div>
        ))}
      </Group>

      {/* Modal for spell details */}
      {selectedSpell && (
        <Modal opened={openModal} onClose={closeModal} title={selectedSpell.name}>
          <Stack spacing="sm">
            <Text>{selectedSpell.description}</Text>
            <Text>Cooldown: {selectedSpell.cooldown} hours</Text>
            <Text>{selectedSpell.effect}</Text>
            <Group position="center">
              <Button
                onClick={() => upgradeSpell(selectedSpell)}
                disabled={selectedSpell.upgradeCost > 100} // Example condition
              >
                Upgrade Spell
              </Button>
            </Group>
          </Stack>
        </Modal>
      )}
    </div>
  );
};

export default Spells;
