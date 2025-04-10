'use client';

import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
  Tooltip,
  Flex,
  Box,
  ActionIcon
} from '@mantine/core';
import { IconEdit, IconCheck, IconX, IconUser, IconMail } from '@tabler/icons-react';
import { getVoyagerLeague } from '@/utils/data/queries/getVoyagerLeague';
import LoadingScreen from '@/components/core/LoadingScreen';
import { useVoyager } from '@/contexts/VoyagerContext';
import AvatarEditor from '@/components/avatar/AvatarEditor';
import AvatarPreview from '@/components/avatar/AvatarPreview';

const VoyagerProfile: React.FC = () => {
  const { voyager, loading } = useVoyager();
  const [isEditing, setIsEditing] = useState(false);
  const [league, setLeague] = useState('');
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);

  useEffect(() => {
    if (!voyager) return;
  
    const fetchLeague = async () => {
      const leagueName = await getVoyagerLeague(voyager.totalXP);
      setLeague(leagueName);
    };
  
    fetchLeague();
  }, [voyager]);
  

  if (loading || !voyager) return <LoadingScreen />;

  return (
    <Container size="xs" px="sm" mt="md" mb="xl">
      {showAvatarEditor ? (
        <AvatarEditor onClose={() => setShowAvatarEditor(false)} />
      ) : (
        <Paper shadow="md" radius="md" withBorder p="xl">
          <Flex justify="center" mb="md">
            <Box pos="relative">
              <AvatarPreview avatar={voyager.avatar} size={100} />
              <Tooltip label="Edit Avatar" position="bottom">
                <ActionIcon
                  size="sm"
                  variant="filled"
                  color="var(--mantine-primary-color-filled)"
                  style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(25%, 25%)' }}
                  onClick={() => setShowAvatarEditor(true)}
                >
                  <IconEdit size={14} />
                </ActionIcon>
              </Tooltip>
            </Box>
          </Flex>

          <Title order={3} align="center" mb="xs">
            {voyager.username}
          </Title>
          <Text align="center" size="sm" color="dimmed" mb="md">
            {voyager.email}
          </Text>

          <Divider my="md" />

          <Stack spacing="sm">
            <TextInput
              label="First Name"
              icon={<IconUser size={16} />}
              value={voyager.firstName}
              onChange={() => {}}
              disabled={!isEditing}
            />
            <TextInput
              label="Last Name"
              icon={<IconUser size={16} />}
              value={voyager.lastName}
              onChange={() => {}}
              disabled={!isEditing}
            />
            <TextInput
              label="Email"
              icon={<IconMail size={16} />}
              value={voyager.email}
              onChange={() => {}}
              disabled={!isEditing}
            />
            <Textarea
              label="Bio"
              value={voyager.bio || ''}
              onChange={() => {}}
              placeholder="A wandering soul in search of words and wonders..."
              disabled={!isEditing}
              autosize
              minRows={3}
              maxRows={5}
              styles={{
                input: { backgroundColor: 'transparent', fontFamily: 'serif', fontSize: 14 },
              }}
            />
          </Stack>

          <Divider my="lg" />

          <Stack spacing="xs" align="center">
            <Text size="sm" color="dimmed">
              League: <strong>{league}</strong>
            </Text>
            <Progress
              value={(voyager.totalXP / 200) * 100}
              color="var(--mantine-primary-color-filled)"
              size="lg"
              radius="xl"
              label={`XP: ${voyager.totalXP}/200`}
            />
          </Stack>

          <Divider my="lg" />

          <Group position="right" spacing="xs">
            {isEditing ? (
              <>
                <Tooltip label="Save">
                  <Button
                    size="xs"
                    color="var(--mantine-primary-color-filled)"
                    variant="light"
                    onClick={() => {
                      // TODO: Save changes
                      setIsEditing(false);
                    }}
                  >
                    <IconCheck size={16} />
                  </Button>
                </Tooltip>
                <Tooltip label="Cancel">
                  <Button
                    size="xs"
                    variant="subtle"
                    color="gray"
                    onClick={() => setIsEditing(false)}
                  >
                    <IconX size={16} />
                  </Button>
                </Tooltip>
              </>
            ) : (
              <Tooltip label="Edit">
                <Button
                  size="xs"
                  variant="light"
                  onClick={() => setIsEditing(true)}
                  color="var(--mantine-primary-color-filled)"
                >
                  <IconEdit size={16} />
                </Button>
              </Tooltip>
            )}
          </Group>
        </Paper>
      )}
    </Container>
  );
};

export default VoyagerProfile;
