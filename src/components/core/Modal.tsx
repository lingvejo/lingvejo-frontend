import React from 'react';
import { Modal } from '@mantine/core';

interface FullscreenModalProps {
  opened: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
}

const FullscreenModal: React.FC<FullscreenModalProps> = ({ opened, onClose, title, children }) => {
  return (
    <Modal
      zIndex={500}
      opened={opened}
      onClose={onClose}
      title={title}
      fullScreen
      radius={0}
      transitionProps={{ transition: 'fade' }}
    >
      {children}
    </Modal>
  );
};

export default FullscreenModal;