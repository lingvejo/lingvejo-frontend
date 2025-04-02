import React, { useState, useEffect } from 'react';
import { Button, Group, Text, Paper, Avatar } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

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
  const [dialog, setDialog] = useState(conversations[dialogIndex]);

  useEffect(() => {
    if (wizardHere && isAutoDismiss) {
      const timer = setTimeout(() => {
        onLeave(); // Automatically close after 5 seconds
      }, 5000); // 5 seconds auto-dismiss
      return () => clearTimeout(timer);
    }
  }, [wizardHere, isAutoDismiss, onLeave]);

  const handleNext = () => {
    if (dialogIndex < conversations.length - 1) {
      setDialogIndex(dialogIndex + 1);
      setDialog(conversations[dialogIndex + 1]);
    } else {
      onLeave(); // If it's the last message, wizard leaves
    }
  };

  const wizardImageSrc = `/images/npc/${type}.png`; // Dynamically get image based on type

  return (
    wizardHere && (
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '20px',
        }}
      >
        <Avatar
          src={wizardImageSrc}
          size={80}
          radius="50%"
          style={{
            border: '4px solid #fff',
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
          }}
        />
        <Paper
          padding="xl"
          style={{
            marginTop: '10px',
            position: 'relative',
            width: '100%',
            maxWidth: '100%',
            background: 'white',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
            borderRadius: '12px',
            paddingTop: '40px', // Added padding to make space for close button
          }}
        >
          {/* Show close button only if it can be forced to leave */}
          {canBeForcedToLeave && (
            <Button
              variant="light"
              style={{
                position: 'absolute',
                top: '5px',
                right: '10px',
                padding: 0,
                minWidth: 'auto',
                borderRadius: '100%',
                zIndex: 2000,
              }}
              onClick={onLeave}
            >
              <IconX size={18} />
            </Button>
          )}

          <Text
            size="lg"
            weight={600}
            align="center"
            style={{
              marginBottom: '15px',
              padding: '0 20px', // Padding for dialog text
            }}
          >
            {dialog}
          </Text>
          <Group position="center" style={{ padding: 10, marginTop: '20px' }}>
            <Button onClick={handleNext} style={{ flex: 1 }}>
              {dialogIndex === conversations.length - 1 ? 'Okay' : 'Next'}
            </Button>
          </Group>
        </Paper>
      </div>
    )
  );
};

export default WizardNPC;
