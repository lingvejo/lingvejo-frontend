import React, { useState } from "react";
import { Card, Button, Text, Stack } from "@mantine/core";

interface StoryModuleProps {
  data: {
    story: string[];
  };
}

const StoryModule: React.FC<StoryModuleProps> = ({ data }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < data.story.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack align="center">
        <Text size="lg" weight={600}>Interactive Story</Text>
        <Text size="md" align="center">{data.story[currentStep]}</Text>
        <Button onClick={nextStep} disabled={currentStep >= data.story.length - 1}>
          {currentStep < data.story.length - 1 ? "Next" : "End"}
        </Button>
      </Stack>
    </Card>
  );
};

export default StoryModule;
