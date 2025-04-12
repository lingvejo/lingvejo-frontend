'use client';

import {
  Textarea,
  Text,
  Group,
  Tooltip,
  ActionIcon,
} from '@mantine/core';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';

type Props = {
  draft: string;
  setDraft: (val: string) => void;
  onSave: () => void;
  onCancel: () => void;
  maxLength: number;
  t: (key: string) => string;
};

export default function JournalEditor({
  draft,
  setDraft,
  onSave,
  onCancel,
  maxLength,
  t,
}: Props) {
  return (
    <>
      <Textarea
        value={draft}
        onChange={(e) => setDraft(e.currentTarget.value)}
        placeholder={t('placeholder')}
        autosize
        minRows={4}
        maxRows={8}
        maxLength={maxLength}
        variant="unstyled"
        styles={{
          input: {
            backgroundColor: 'transparent',
            fontFamily: 'serif',
            fontSize: '16px',
            lineHeight: 1.6,
            padding: 0,
          },
        }}
      />
      <Text size="xs" color="dimmed" align="right" mt="xs">
        {draft.length}/{maxLength}
      </Text>
      <Group position="right" mt="sm" spacing="xs">
        <Tooltip label={t('save')}>
          <ActionIcon
            variant="filled"
            color="var(--mantine-primary-color-filled)"
            onClick={onSave}
          >
            <IconDeviceFloppy size={16} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label={t('cancel')}>
          <ActionIcon variant="light" color="gray" onClick={onCancel}>
            <IconX size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </>
  );
}
