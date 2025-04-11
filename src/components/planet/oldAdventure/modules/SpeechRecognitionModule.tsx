import React, { useState, useEffect } from "react";
import { Button, Text, Card, Stack } from "@mantine/core";
import { useSpeechRecognition } from "react-speech-recognition";

interface SpeechRecognitionModuleProps {
  data: {
    phrases: { esperanto: string; english: string }[];
  };
  fallbackMessage?: string;
}

const SpeechRecognitionModule: React.FC<SpeechRecognitionModuleProps> = ({
  data,
  fallbackMessage,
}) => {
  const [currentPhrase, setCurrentPhrase] = useState(
    data.phrases[Math.floor(Math.random() * data.phrases.length)]
  );

  const {
    transcript,
    resetTranscript,
    listening,
    startListening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [autoCompleted, setAutoCompleted] = useState(false);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setTimeout(() => {
        setAutoCompleted(true);
      }, 2000);
    }
  }, [browserSupportsSpeechRecognition]);

  const checkMatch = () => {
    return (
      transcript.trim().toLowerCase() === currentPhrase.esperanto.toLowerCase()
    );
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack align="center">
        <Text size="lg" weight={600}>
          Say:{" "}
          <span style={{ color: "var(--mantine-primary-color-filled)" }}>
            {currentPhrase.esperanto}
          </span>
        </Text>
        <Text size="sm" color="dimmed">
          ({currentPhrase.english})
        </Text>

        {!browserSupportsSpeechRecognition ? (
          <>
            <Text size="md" color="red">
              {fallbackMessage || "Speech recognition not supported"}
            </Text>
            {autoCompleted && (
              <Text size="md" weight={500} color="green">
                Auto-completed: {currentPhrase.esperanto}
              </Text>
            )}
          </>
        ) : (
          <>
            <Button color="primary" onClick={startListening} disabled={listening}>
              {listening ? "Listening..." : "Start Speaking"}
            </Button>

            <Text size="md" weight={500} color={checkMatch() ? "green" : "red"}>
              {transcript || "Say something..."}
            </Text>
          </>
        )}

        <Button
          variant="light"
          color="gray"
          onClick={() => {
            resetTranscript();
            setAutoCompleted(false);
            setCurrentPhrase(
              data.phrases[Math.floor(Math.random() * data.phrases.length)]
            );
          }}
        >
          Try Another
        </Button>
      </Stack>
    </Card>
  );
};

export default SpeechRecognitionModule;
