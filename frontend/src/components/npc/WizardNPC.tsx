'use client';
import React, { useEffect, useState } from 'react';
import { Modal, Paper, Text, Button, Group } from '@mantine/core';
import AvatarPreview from '@/components/core/avatar/AvatarPreview';
import { wizardBaseAvatar } from '@/components/core/avatar/wizardBaseAvatar';

interface WizardNPCProps {
  wizardHere: boolean;
  isAutoDismiss?: boolean;
  canBeForcedToLeave?: boolean;
  conversations: string[];
  hasChoice?: boolean;
  yesLabel?: string;
  noLabel?: string;
  onLeave: () => void;
  onChoice?: (choice: boolean) => void;
}

const WizardNPC: React.FC<WizardNPCProps> = ({
  wizardHere,
  isAutoDismiss = false,
  canBeForcedToLeave = true,
  conversations = [],
  hasChoice = false,
  yesLabel = 'Yes',
  noLabel = 'No',
  onLeave,
  onChoice,
}) => {
  const [dialogIndex, setDialogIndex] = useState(0);

  useEffect(() => {
    if (wizardHere) {
      setDialogIndex(0); // Reset conversation when NPC appears
      if (isAutoDismiss) {
        const timer = setTimeout(onLeave, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [wizardHere, isAutoDismiss, onLeave]);

  const handleNext = () => {
    if (dialogIndex < conversations.length - 1) {
      setDialogIndex(dialogIndex + 1);
    } else {
      onLeave();
    }
  };

  const handleChoice = (choice: boolean) => {
    if (onChoice) onChoice(choice);
    onLeave();
  };

  return (
    <Modal
      opened={wizardHere}
      onClose={canBeForcedToLeave ? onLeave : undefined}
      overlayProps={{ blur: 8, backgroundOpacity: 0.5 }}
      centered
      withCloseButton={canBeForcedToLeave}
      closeOnClickOutside={canBeForcedToLeave}
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
        <AvatarPreview avatar={wizardBaseAvatar} size={100} />

        <Text size="lg" weight={600} style={{ lineHeight: 1.4 }}>
          {conversations[dialogIndex] || '@/components.'}
        </Text>

        <Group position="center" mt="md">
          {hasChoice ? (
            <>
              <Button color="green" onClick={() => handleChoice(true)}>{yesLabel}</Button>
              <Button color="red" onClick={() => handleChoice(false)}>{noLabel}</Button>
            </>
          ) : (
            <Button fullWidth onClick={handleNext}>
              {dialogIndex === conversations.length - 1 ? 'Okay' : 'Next'}
            </Button>
          )}
        </Group>
      </Paper>
    </Modal>
  );
};

export default WizardNPC;
