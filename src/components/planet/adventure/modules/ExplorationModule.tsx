import React, { useState } from "react";
import { Card, Button, Text, Stack, Group } from "@mantine/core";

interface ExplorationModuleProps {
  data: {
    locations: { name: string; description: string }[];
  };
}

const ExplorationModule: React.FC<ExplorationModuleProps> = ({ data }) => {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack align="center">
        <Text size="lg" weight={600}>Explore the World</Text>
        <Group>
          {data.locations.map((location, index) => (
            <Button
              key={index}
              variant={selectedLocation === index ? "filled" : "outline"}
              onClick={() => setSelectedLocation(index)}
            >
              {location.name}
            </Button>
          ))}
        </Group>
        {selectedLocation !== null && (
          <Card shadow="xs" padding="md" radius="sm" mt="md" withBorder>
            <Text size="md" weight={500}>{data.locations[selectedLocation].name}</Text>
            <Text size="sm">{data.locations[selectedLocation].description}</Text>
          </Card>
        )}
      </Stack>
    </Card>
  );
};

export default ExplorationModule;
