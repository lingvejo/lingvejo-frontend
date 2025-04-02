import React, { useState } from "react";
import { Button, Card, Stack, Text, Radio, Group } from "@mantine/core";

interface DialoguePracticeModuleProps {
  data: {
    conversation: {
      esperanto: string;
      english: string;
      responses: { text: string; next: number | null }[];
    }[];
  };
}

const DialoguePracticeModule: React.FC<DialoguePracticeModuleProps> = ({ data }) => {
  const [step, setStep] = useState(0);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentDialogue = data.conversation[step];

  const handleCheckAnswer = () => {
    if (selectedResponse) {
      const selected = currentDialogue.responses.find(r => r.text === selectedResponse);
      if (selected) {
        setIsCorrect(true);
        if (selected.next !== null) {
          setTimeout(() => {
            setStep(selected.next);
            setSelectedResponse(null);
            setIsCorrect(null);
          }, 1000); // Auto-advance after 1s if correct
        }
      } else {
        setIsCorrect(false);
      }
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack align="center">
        <Text size="lg" weight={600}>{currentDialogue.esperanto}</Text>
        <Text size="sm" color="dimmed">({currentDialogue.english})</Text>

        <Radio.Group value={selectedResponse} onChange={setSelectedResponse}>
          <Stack>
            {currentDialogue.responses.map((response, index) => (
              <Radio key={index} value={response.text} label={response.text} />
            ))}
          </Stack>
        </Radio.Group>

        {isCorrect !== null && (
          <Text size="md" color={isCorrect ? "green" : "red"}>
            {isCorrect ? "✅ Correct! Moving to next..." : "❌ Try Again!"}
          </Text>
        )}

        <Button
          color="primary"
          onClick={handleCheckAnswer}
          disabled={!selectedResponse}
        >
          Check Answer
        </Button>
      </Stack>
    </Card>
  );
};

export default DialoguePracticeModule;
