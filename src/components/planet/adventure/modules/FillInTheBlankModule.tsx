import React, { useState } from "react";
import { Button, Card, Stack, Text, Radio, Group } from "@mantine/core";

interface FillInTheBlankModuleProps {
  data: {
    sentence: string;
    options: string[];
    correctAnswer: string;
  };
}

const FillInTheBlankModule: React.FC<FillInTheBlankModuleProps> = ({
  data,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleCheckAnswer = () => {
    if (selectedOption) {
      setIsCorrect(selectedOption === data.correctAnswer);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack align="center">
        <Text size="lg" weight={600}>
          {data.sentence.replace("___", "______")}
        </Text>

        <Radio.Group
          value={selectedOption}
          onChange={setSelectedOption}
          withAsterisk
        >
          <Stack>
            {data.options.map((option, index) => (
              <Radio key={index} value={option} label={option} />
            ))}
          </Stack>
        </Radio.Group>

        {isCorrect !== null && (
          <Text size="md" color={isCorrect ? "green" : "red"}>
            {isCorrect ? "✅ Correct!" : "❌ Try Again!"}
          </Text>
        )}

        <Group>
          <Button
            color="primary"
            onClick={handleCheckAnswer}
            disabled={!selectedOption}
          >
            Check Answer
          </Button>

          <Button
            variant="light"
            color="gray"
            onClick={() => {
              setSelectedOption(null);
              setIsCorrect(null);
            }}
          >
            Retry
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default FillInTheBlankModule;
