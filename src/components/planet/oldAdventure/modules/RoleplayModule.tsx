import React, { useState } from "react";
import { Card, Button, Text, Stack, Group } from "@mantine/core";

interface RoleplayModuleProps {
  data: {
    scenario: string;
    dialogue: { npc: string; responses: { text: string; next: number | null }[] }[];
  };
}

const RoleplayModule: React.FC<RoleplayModuleProps> = ({ data }) => {
  const [step, setStep] = useState(0);

  const handleResponse = (nextStep: number | null) => {
    if (nextStep !== null) setStep(nextStep);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack>
        <Text size="lg" weight={600}>Roleplay Scenario</Text>
        <Text size="sm" color="dimmed">{data.scenario}</Text>

        <Card shadow="xs" padding="md" radius="sm" mt="md" withBorder>
          <Text size="md" weight={500}>{data.dialogue[step].npc}</Text>
        </Card>

        <Group mt="sm">
          {data.dialogue[step].responses.map((response, index) => (
            <Button key={index} variant="outline" onClick={() => handleResponse(response.next)}>
              {response.text}
            </Button>
          ))}
        </Group>
      </Stack>
    </Card>
  );
};

export default RoleplayModule;
