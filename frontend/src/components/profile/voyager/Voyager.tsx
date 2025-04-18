'use client';

import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Divider,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
  Flex,
  Box,
  ActionIcon
} from '@mantine/core';
import { IconEdit, IconCheck, IconX, IconUser } from '@tabler/icons-react';
import { getVoyagerLeague } from '@/utils/data/queries/getVoyagerLeague';
import LoadingScreen from '@/components/core/loading/LoadingScreen';
import { useVoyager } from '@/contexts/VoyagerContext';
import AvatarEditor from '@/components/core/avatar/AvatarEditor';
import AvatarPreview from '@/components/core/avatar/AvatarPreview';
import { useTranslations } from 'next-intl';

const VoyagerProfile: React.FC = () => {
  const { voyager, loading } = useVoyager();
  const [isEditing, setIsEditing] = useState(false);
  const [league, setLeague] = useState<number>(1);  // Use number type for league ID
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);
  const t = useTranslations("leagues");  // Use next-intl hook for translations

  useEffect(() => {
    if (!voyager) return;
  
    const fetchLeague = async () => {
      const leagueLevel = await getVoyagerLeague(voyager.uid);
      setLeague(leagueLevel);  // Ensure the league is parsed as an integer
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
            {voyager.persona}
          </Title>
          <Text align="center" size="sm" color="dimmed" mb="md">
            {voyager.totalXP}XP
          </Text>

          <Divider my="md" />

          <Stack spacing="sm">
            <TextInput
              label="Pi Username"
              icon={<IconUser size={16} />}
              value={voyager.username}
              disabled
            />
          </Stack>

          <Divider my="lg" />

          <Stack spacing="xs" align="center">
            <Text size="sm" color="dimmed">
              League: <strong>{t(`${league}`)}</strong>  {/* Use next-intl to fetch the league name */}
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
