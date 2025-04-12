import { Card, Stack, Text, Group, Center, Pagination } from '@mantine/core';
import AvatarPreview from '@/components/core/avatar/AvatarPreview';
import { Voyager } from '@/contexts/VoyagerContext';

type Props = {
  voyagers: Voyager[];
  page: number;
  itemsPerPage: number;
  setPage: (p: number) => void;
  t: (key: string) => string;
};

export default function VoyagerList({ voyagers, page, itemsPerPage, setPage, t }: Props) {
  const paginated = voyagers.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <Stack spacing="xs">
        {paginated.length === 0 ? (
          <Text align="center" color="dimmed" italic="true">
            {t('noVoyagers')}
          </Text>
        ) : (
          paginated.map((voyager) => (
            <Card
              key={voyager.uid}
              withBorder
              shadow="xs"
              p="xs"
              radius="md"
              style={{ cursor: 'pointer', height: 50 }}
            >
              <Group spacing="sm">
                <AvatarPreview avatar={voyager.avatar} size={27} />
                <Text>{voyager.persona}</Text>
              </Group>
            </Card>
          ))
        )}
      </Stack>

      {voyagers.length > itemsPerPage && (
        <Center mt="md" pb="5rem">
          <Pagination total={Math.ceil(voyagers.length / itemsPerPage)} page={page} onChange={setPage} />
        </Center>
      )}
    </>
  );
}
