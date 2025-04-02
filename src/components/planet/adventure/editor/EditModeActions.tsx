import { Stack, ActionIcon } from '@mantine/core';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';

interface EditModeActionsProps {
  onEdit: () => void;
  onAdd: () => void;
  onDelete: () => void;
}

const EditModeActions: React.FC<EditModeActionsProps> = ({ onEdit, onAdd, onDelete }) => {
  return (
    <Stack spacing="xs" style={{ position: 'fixed', bottom: '70px', right: '10px' }}>
      <ActionIcon size="xl" radius="xl" onClick={onEdit}>
        <IconEdit size={24} />
      </ActionIcon>
      <ActionIcon size="xl" radius="xl" onClick={onAdd}>
        <IconPlus size={24} />
      </ActionIcon>
      <ActionIcon size="xl" radius="xl" onClick={onDelete}>
        <IconTrash size={24} />
      </ActionIcon>
    </Stack>
  );
};

export default EditModeActions;
