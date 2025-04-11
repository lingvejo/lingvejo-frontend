import React, { useState } from "react";
import { Button, Card, Stack, Text, TextInput, Group } from "@mantine/core";

interface ChallengeModuleProps {
  data?: {
    challenges?: {
      translation: string;
      text: string;
    }[];
  };
}

const ChallengeModule: React.FC<ChallengeModuleProps> = ({ data }) => {
  const [step, setStep] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (!data?.challenges || data.challenges.length === 0) {
    return <Text color="red">No challenges available.</Text>;
  }

  const currentChallenge = data.challenges[step];

  const handleCheckAnswer = () => {
    const cleanedInput = userInput.trim().toLowerCase();
    const correctAnswer = currentChallenge.text.trim().toLowerCase();
    setIsCorrect(cleanedInput === correctAnswer);
  };

  const handleNext = () => {
    if (step < data.challenges.length - 1) {
      setStep(step + 1);
      setUserInput("");
      setIsCorrect(null);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack align="center">
        <Text size="lg" weight={600}>
          {currentChallenge.translation}
        </Text>
        <Text size="sm" color="dimmed">
          (Translate this sentence)
        </Text>

        <TextInput
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your answer in English..."
          size="md"
        />

        {isCorrect !== null && (
          <Text size="md" color={isCorrect ? "green" : "red"}>
            {isCorrect ? "✅ Correct!" : "❌ Incorrect. Try again!"}
          </Text>
        )}

        <Group>
          <Button
            color="primary"
            onClick={handleCheckAnswer}
            disabled={!userInput}
          >
            Check Answer
          </Button>

          {isCorrect && step < data.challenges.length - 1 && (
            <Button variant="light" color="gray" onClick={handleNext}>
              Next Challenge
            </Button>
          )}
        </Group>
      </Stack>
    </Card>
  );
};

export default ChallengeModule;
