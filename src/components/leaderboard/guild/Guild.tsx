import React, { useEffect, useState } from 'react';
import { getAllGuilds } from '@/utils/data/getter/getAllGuilds';
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Center,
  Tooltip,
  Stack,
  Pagination,
} from '@mantine/core';
import { IconUsers, IconAffiliate } from '@tabler/icons-react';
import LoadingScreen from '@/components/core/LoadingScreen';

interface Guild {
  id: number;
  name: string;
  emblem: string | null;
  maxMembers: number;
  description: string;
}

const Guild: React.FC = () => {
  const [guilds, setGuilds] = useState<Guild[] | null>(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const fetchGuilds = async () => {
      const guildData = await getAllGuilds();
      setGuilds(guildData);
      setLoading(false);
    };

    fetchGuilds();
  }, []);

  useEffect(() => {
    function updateItemsPerPage() {
      const cardHeight = 160; // Adjust if your cards are taller
      const availableSpace = window.innerHeight - 420;
      const newItemsPerPage = Math.max(3, Math.floor(availableSpace / cardHeight));
      setItemsPerPage(newItemsPerPage);
    }

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const paginatedGuilds = guilds?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  ) ?? [];

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {paginatedGuilds.map((guild) => (
          <Card key={guild.id} shadow="md" radius="lg" withBorder>
            {guild.emblem ? (
              <Image src={guild.emblem} height={100} alt={guild.name} radius="md" />
            ) : (
              <Center
                style={{
                  height: 100,
                  backgroundColor: 'var(--mantine-primary-color-light)',
                  borderRadius: '8px',
                }}
              >
                <IconAffiliate size={40} color="gray" />
              </Center>
            )}
            <Stack spacing="xs" mt="md">
              <Group position="apart">
                <Text weight={600} size="lg">
                  {guild.name}
                </Text>
                <Tooltip label="Max Members" withArrow>
                  <Badge leftSection={<IconUsers size={14} />} variant="light">
                    {guild.maxMembers}
                  </Badge>
                </Tooltip>
              </Group>
              <Text size="sm" color="dimmed">
                {guild.description}
              </Text>
            </Stack>
          </Card>
        ))}
      </div>

      {(guilds?.length ?? 0) > itemsPerPage && (
        <Center mt="md" pb="5rem"> {/* Added bottom padding */}
          <Pagination
            total={Math.ceil((guilds?.length ?? 0) / itemsPerPage)}
            page={page}
            onChange={setPage}
            size="md"
            color="violet"
          />
        </Center>
      )}
    </>
  );
};

export default Guild;
