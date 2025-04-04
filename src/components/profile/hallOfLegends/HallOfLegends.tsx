'use client';

import {
  Badge,
  Box,
  Center,
  Container,
  Paper,
  Pagination,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useVoyager } from '@/contexts/VoyagerContext';
import { getHallOfLegendsVoyager } from '@/utils/data/getters/gethallOfLegendsVoyager';
import LoadingScreen from '@/components/core/LoadingScreen';
import { useTranslations } from 'next-intl';
import { useMediaQuery, useWindowEvent } from '@mantine/hooks';

const HallOfLegends = () => {
  const { voyager, loading } = useVoyager();
  const [page, setPage] = useState(1);
  const [achievements, setAchievements] = useState<
    {
      legendId: number;
      name: string;
      description: string;
      category: string;
      rarity: string;
    }[]
  >([]);
  const t = useTranslations('hallOfLegends');

  const isXs = useMediaQuery('(max-width: 36em)');
  const isSm = useMediaQuery('(max-width: 48em)');
  const columns = isXs ? 1 : 2;

  // Dynamically calculate how many rows can fit in view height
  const [rows, setRows] = useState(2);
  const calculateRows = () => {
    const itemHeight = 180; // Approx height of a legend card + spacing
    const availableHeight = window.innerHeight - 300; // Adjust for header/padding
    const newRows = Math.max(1, Math.floor(availableHeight / itemHeight));
    setRows(newRows);
  };

  useEffect(() => {
    calculateRows();
  }, [isXs, isSm]);

  useWindowEvent('resize', calculateRows);

  const pageSize = rows * columns;

  useEffect(() => {
    if (voyager?.id) {
      getHallOfLegendsVoyager(voyager.id).then(setAchievements);
    }
  }, [voyager?.id]);

  if (loading || !voyager) {
    return <LoadingScreen />;
  }

  const start = (page - 1) * pageSize;
  const paginated = achievements.slice(start, start + pageSize);

  return (
    <Container size="xs" pt={40} pb={80}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Center>
          <Title order={2}>{t('title')}</Title>
        </Center>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
        >
          {paginated.length > 0 ? (
            <SimpleGrid cols={columns} spacing="lg" mt="lg">
              {paginated.map((ach) => (
                <Paper
                  key={ach.legendId}
                  withBorder
                  radius="md"
                  p="md"
                  shadow="sm"
                  style={{
                    background: 'var(--mantine-primary-color-light)',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <Tooltip label={ach.rarity} withArrow>
                    <Box style={{ position: 'absolute', top: 6, right: 6 }}>
                      <Sparkles size={18} color="#facc15" />
                    </Box>
                  </Tooltip>

                  <Text fw={600} size="md">
                    {ach.name}
                  </Text>

                  <Text size="xs" mt="xs" c="dimmed">
                    {ach.description}
                  </Text>

                  <Badge mt="sm" color="yellow" variant="light">
                    {ach.category}
                  </Badge>
                </Paper>
              ))}
            </SimpleGrid>
          ) : (
            <Stack align="center" mt="lg" spacing="xs">
              <Text size="lg" fw={600} ta="center" c="dimmed" style={{ opacity: 0.8 }}>
                {t('empty.title')}
              </Text>
              <Text
                size="sm"
                ta="center"
                c="dimmed"
                fs="italic"
                style={{ maxWidth: 280, opacity: 0.65 }}
              >
                {t('empty.description')}
              </Text>
            </Stack>
          )}
        </motion.div>
      </AnimatePresence>

      <Stack align="center" mt="lg">
        <Pagination
          total={Math.ceil(achievements.length / pageSize)}
          value={page}
          onChange={setPage}
          size="sm"
          radius="xl"
        />
      </Stack>
    </Container>
  );
};

export default HallOfLegends;
