'use client';
import React, { useEffect, useState } from 'react';
import { Modal, Paper, Avatar, Text, Button, Group } from '@mantine/core';

interface WizardNPCProps {
  wizardHere: boolean;
  isAutoDismiss: boolean;
  canBeForcedToLeave: boolean;
  conversations: string[];
  type: string;
  onLeave: () => void;
}

const WizardNPC: React.FC<WizardNPCProps> = ({
  wizardHere,
  isAutoDismiss,
  canBeForcedToLeave,
  conversations,
  type,
  onLeave
}) => {
  const [dialogIndex, setDialogIndex] = useState(0);

  useEffect(() => {
    if (wizardHere && isAutoDismiss) {
      const timer = setTimeout(onLeave, 5000);
      return () => clearTimeout(timer);
    }
  }, [wizardHere, isAutoDismiss, onLeave]);

  const handleNext = () => {
    if (dialogIndex < conversations.length - 1) {
      setDialogIndex(dialogIndex + 1);
    } else {
      onLeave();
    }
  };

  const wizardImageSrc = `/images/npc/${type}.png`;

  return (
    <Modal
      opened={wizardHere}
      onClose={canBeForcedToLeave ? onLeave : undefined} // Disable closing when clicking outside
      overlayProps={{ blur: 8, backgroundOpacity: 0.5 }}
      centered
      withCloseButton={canBeForcedToLeave} // Hide ❌ if she can't be forced to leave
      closeOnClickOutside={canBeForcedToLeave} // Prevent closing by clicking outside
      radius="lg"
      transitionProps={{ transition: 'fade', duration: 200 }}
      size="lg"
    >
      <Paper
        p="md"
        radius="md"
        style={{
          textAlign: 'center',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        {/* Wizard Avatar inside the dialog */}
        <Avatar src={wizardImageSrc} size={80} radius="50%" />

        <Text size="lg" weight={600} style={{ lineHeight: 1.4 }}>
          {conversations[dialogIndex]}
        </Text>

        <Group position="center" mt="md">
          <Button fullWidth onClick={handleNext}>
            {dialogIndex === conversations.length - 1 ? 'Okay' : 'Next'}
          </Button>
        </Group>
      </Paper>
    </Modal>
  );
};

export default WizardNPC;
