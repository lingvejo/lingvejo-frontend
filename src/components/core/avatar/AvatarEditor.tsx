'use client';

import {
  ActionIcon,
  ColorInput,
  Group,
  Paper,
  Select,
  Stack,
  Title,
  Tooltip,
  Flex,
  Box
} from '@mantine/core';
import { IconDeviceFloppy, IconDice5, IconX } from '@tabler/icons-react';
import { useVoyager } from '@/contexts/VoyagerContext';
import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/core/loading/LoadingScreen';
import { defaultOptions, initialAvatar } from './avatarOptions';
import AvatarPreview from './AvatarPreview';
import { useTranslations } from 'next-intl';
import { setAvatar } from '@/utils/data/setters/setAvatar';
import { notifications } from '@mantine/notifications';
import { AvatarFullConfig } from 'react-nice-avatar';

const allHairStyles = Array.from(
  new Set([...defaultOptions.hairStyleMan, ...defaultOptions.hairStyleWoman])
);

const randomFrom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;

type AvatarEditorProps = {
  onClose?: () => void;
};

export default function AvatarEditor({ onClose }: AvatarEditorProps) {
  const { voyager, loading, setVoyager } = useVoyager();
  const t = useTranslations('avatarEditor');

  const [avatarProps, setAvatarProps] = useState<AvatarFullConfig | null>(null);

  useEffect(() => {
    if (voyager) {
      setAvatarProps(voyager.avatar ?? initialAvatar);
    }
  }, [voyager]);

  const update = (key: string, value: any) => {
    setAvatarProps((prev) => prev ? { ...prev, [key]: value } : prev);
  };

  const randomize = () => {
    setAvatarProps((prev) => prev ? {
      ...prev,
      sex: randomFrom(defaultOptions.sex),
      faceColor: randomColor(),
      earSize: randomFrom(defaultOptions.earSize),
      hairColor: randomColor(),
      hairStyle: randomFrom(allHairStyles),
      hatColor: randomColor(),
      hatStyle: randomFrom(defaultOptions.hatStyle),
      eyeStyle: randomFrom(defaultOptions.eyeStyle),
      glassesStyle: randomFrom(defaultOptions.glassesStyle),
      noseStyle: randomFrom(defaultOptions.noseStyle),
      mouthStyle: randomFrom(defaultOptions.mouthStyle),
      shirtStyle: randomFrom(defaultOptions.shirtStyle),
      shirtColor: randomColor(),
      bgColor: randomColor(),
      isGradient: Math.random() > 0.5,
    } : prev);
  };

  const handleSave = async () => {
    if (!voyager || !avatarProps) return;

    try {
      const success = await setAvatar(voyager.id, avatarProps);
      if (success) {
        setVoyager?.({ ...voyager, avatar: avatarProps });
        
        notifications.show({
          title: t('savedTitle'),
          message: t('savedMessage'),
          color: 'green',
        });

        onClose?.();
      } else {
        notifications.show({
          title: t('errorTitle'),
          message: t('errorMessage'),
          color: 'red',
        });
      }
    } catch (err) {
      notifications.show({
        title: t('errorTitle'),
        message: t('errorMessage'),
        color: 'red',
      });
    }
  };

  if (loading || !avatarProps) return <LoadingScreen />;

  return (
    <Paper shadow="md" radius="md" withBorder p="xl">
      <Stack spacing="xl">
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          justify={{ sm: 'space-between' }}
          align={{ base: 'center', sm: 'center' }}
          gap="xs"
        >
          <Title order={4} ta={{ base: 'center', sm: 'left' }}>
            {t('title')}
          </Title>

          <Group spacing="sm" mt={{ base: 'sm', sm: 0 }} justify="center">
            <Tooltip label={t('randomize')}>
              <ActionIcon variant="light" color="gray" onClick={randomize}>
                <IconDice5 size={16} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label={t('save')}>
              <ActionIcon
                variant="filled"
                color="var(--mantine-primary-color-filled)"
                onClick={handleSave}
              >
                <IconDeviceFloppy size={16} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label={t('cancel')}>
              <ActionIcon
                variant="light"
                color="gray"
                onClick={onClose}
              >
                <IconX size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Flex>

        <Box
            mx="auto"
            style={{
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          >
          <AvatarPreview avatar={avatarProps} size={160} />
        </Box>

        <Select label={t('sex')} data={defaultOptions.sex} value={avatarProps.sex} onChange={(v) => update('sex', v)} />
        <Select label={t('earSize')} data={defaultOptions.earSize} value={avatarProps.earSize} onChange={(v) => update('earSize', v)} />
        <Select label={t('hairStyle')} data={allHairStyles} value={avatarProps.hairStyle} onChange={(v) => update('hairStyle', v)} />
        <Select label={t('hatStyle')} data={defaultOptions.hatStyle} value={avatarProps.hatStyle} onChange={(v) => update('hatStyle', v)} />
        <Select label={t('eyeStyle')} data={defaultOptions.eyeStyle} value={avatarProps.eyeStyle} onChange={(v) => update('eyeStyle', v)} />
        <Select label={t('glassesStyle')} data={defaultOptions.glassesStyle} value={avatarProps.glassesStyle} onChange={(v) => update('glassesStyle', v)} />
        <Select label={t('noseStyle')} data={defaultOptions.noseStyle} value={avatarProps.noseStyle} onChange={(v) => update('noseStyle', v)} />
        <Select label={t('mouthStyle')} data={defaultOptions.mouthStyle} value={avatarProps.mouthStyle} onChange={(v) => update('mouthStyle', v)} />
        <Select label={t('shirtStyle')} data={defaultOptions.shirtStyle} value={avatarProps.shirtStyle} onChange={(v) => update('shirtStyle', v)} />

        <ColorInput label={t('faceColor')} value={avatarProps.faceColor} onChange={(v) => update('faceColor', v)} />
        <ColorInput label={t('hairColor')} value={avatarProps.hairColor} onChange={(v) => update('hairColor', v)} />
        <ColorInput label={t('hatColor')} value={avatarProps.hatColor} onChange={(v) => update('hatColor', v)} />
        <ColorInput label={t('shirtColor')} value={avatarProps.shirtColor} onChange={(v) => update('shirtColor', v)} />
        <ColorInput label={t('bgColor')} value={avatarProps.bgColor} onChange={(v) => update('bgColor', v)} />
      </Stack>
    </Paper>
  );
}
