'use client';

import {
  Center,
  Container,
  Pagination,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, ReactNode } from 'react';
import { useMediaQuery, useWindowEvent } from '@mantine/hooks';

type PaginatedGridViewProps<T> = {
  title: string | null;
  emptyTitle: string;
  emptyDescription: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
};

const PaginatedGridView = <T,>({
  title = null,
  emptyTitle,
  emptyDescription,
  items,
  renderItem,
}: PaginatedGridViewProps<T>) => {
  const isXs = useMediaQuery('(max-width: 36em)');
  const isSm = useMediaQuery('(max-width: 48em)');
  const columns = isXs ? 1 : isSm ? 2 : 3;

  const [rows, setRows] = useState(2);
  const [page, setPage] = useState(1);

  const calculateRows = () => {
    const itemHeight = 180;
    const availableHeight = window.innerHeight - 50;
    const newRows = Math.max(1, Math.floor(availableHeight / itemHeight));
    setRows(newRows);
  };

  useEffect(() => {
    calculateRows();
  }, [isXs, isSm]);

  useWindowEvent('resize', calculateRows);

  const pageSize = rows * columns;
  const start = (page - 1) * pageSize;
  const paginated = items.slice(start, start + pageSize);

  return (
    <Container size="xs" pt={title ? 30 : 4} pb={40}>
      {title && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Center>
            <Title order={2}>{title}</Title>
          </Center>
        </motion.div>
      )}

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
              {paginated.map(renderItem)}
            </SimpleGrid>
          ) : (
            <Stack align="center" mt="lg" spacing="xs">
              <Text size="lg" fw={600} ta="center" c="dimmed" style={{ opacity: 0.8 }}>
                {emptyTitle}
              </Text>
              <Text
                size="sm"
                ta="center"
                c="dimmed"
                fs="italic"
                style={{ maxWidth: 280, opacity: 0.65 }}
              >
                {emptyDescription}
              </Text>
            </Stack>
          )}
        </motion.div>
      </AnimatePresence>

      <Stack align="center" mt="lg">
        <Pagination
          total={Math.ceil(items.length / pageSize)}
          value={page}
          onChange={setPage}
          size="sm"
          radius="xl"
        />
      </Stack>
    </Container>
  );
};

export default PaginatedGridView;
