'use client';

import { Paper, Group, Text, Divider, Tooltip, ActionIcon, Box } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import dayjs from 'dayjs';

type Props = {
  selectedDate: Date;
  content?: string;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  editable: boolean;
  t: (key: string) => string;
};

export default function JournalEntryCard({
  selectedDate,
  content,
  isEditing,
  setIsEditing,
  editable,
  t,
}: Props) {
  return (
    <Paper
      withBorder
      shadow="md"
      radius="lg"
      p="lg"
      style={{
        border: '1px solid var(--mantine-primary-color-light-hover)',
      }}
    >
      <Group position="apart" mb="xs">
        <Text fw={600} size="lg">
          📓 {dayjs(selectedDate).format('dddd, MMMM D')}
        </Text>

        {!isEditing && editable && (
          <Tooltip label={t('edit')} withArrow>
            <ActionIcon
              variant="subtle"
              color="blue"
              onClick={() => setIsEditing(true)}
            >
              <IconEdit size={18} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>

      <Divider my="sm" />

      <Box style={{ minHeight: '120px' }}>
        {content ? (
          <Text
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              color: '#333',
            }}
          >
            {content}
          </Text>
        ) : (
          <Text c="dimmed" fs="italic">
            {t('noEntry')}
          </Text>
        )}
      </Box>
    </Paper>
  );
}
