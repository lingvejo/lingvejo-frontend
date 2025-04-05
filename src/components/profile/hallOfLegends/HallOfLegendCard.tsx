'use client';

import { Badge, Box, Paper, Text, Tooltip } from '@mantine/core';
import { Sparkles } from 'lucide-react';

interface HallOfLegendCardProps {
  legendId: number;
  name: string;
  description: string;
  category: string;
  rarity: string;
}

const HallOfLegendCard: React.FC<HallOfLegendCardProps> = ({
  legendId,
  name,
  description,
  category,
  rarity,
}) => {
  return (
    <Paper
      key={legendId}
      withBorder
      radius="md"
      p="md"
      shadow="sm"
      style={{
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <Tooltip label={rarity} withArrow>
        <Box style={{ position: 'absolute', top: 6, right: 6 }}>
          <Sparkles size={18} color="#facc15" />
        </Box>
      </Tooltip>

      <Text fw={600} size="md">
        {name}
      </Text>

      <Text size="xs" mt="xs" c="dimmed">
        {description}
      </Text>

      <Badge mt="sm" color="yellow" variant="light">
        {category}
      </Badge>
    </Paper>
  );
};

export default HallOfLegendCard;
