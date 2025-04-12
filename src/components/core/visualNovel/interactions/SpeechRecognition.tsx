'use client';

import React, { useState, useEffect } from 'react';
import { Button, Card, Stack, Text } from '@mantine/core';
import { useSpeechRecognition } from 'react-speech-recognition';
import { SpeechRecognitionProps } from '../types';

const SpeechRecognition = ({ phrases, onComplete }: SpeechRecognitionProps) => {
  const getRandomPhrase = () => phrases[Math.floor(Math.random() * phrases.length)];
  const [currentPhrase, setCurrentPhrase] = useState(getRandomPhrase);
  const [autoCompleted, setAutoCompleted] = useState(false);

  const {
    transcript,
    resetTranscript,
    listening,
    startListening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const checkMatch = () => transcript.trim().toLowerCase() === currentPhrase.translation.toLowerCase();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setTimeout(() => setAutoCompleted(true), 2000);
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (checkMatch()) {
      setTimeout(() => onComplete(), 1000);
    }
  }, [transcript]);

  const handleRetry = () => {
    resetTranscript();
    setAutoCompleted(false);
    setCurrentPhrase(getRandomPhrase);
  };

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder>
      <Stack align="center" spacing="md">
        <Text size="lg" weight={600}>
          Say:{' '}
          <span style={{ color: 'var(--mantine-primary-color-filled)' }}>
            {currentPhrase.translation}
          </span>
        </Text>
        <Text size="sm" color="dimmed">
          ({currentPhrase.text})
        </Text>

        {!browserSupportsSpeechRecognition ? (
          <>
            <Text size="md" color="red">
              Speech recognition not supported
            </Text>
            {autoCompleted && (
              <>
                <Text size="md" weight={500} color="green">
                  Auto-completed
                </Text>
                <Button onClick={onComplete} variant="filled" radius="md" fullWidth>
                  Continue
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <Button color="primary" onClick={startListening} disabled={listening} fullWidth>
              {listening ? 'Listening...' : 'Start Speaking'}
            </Button>

            <Text size="md" weight={500} color={checkMatch() ? 'green' : 'red'}>
              {transcript || 'Say something...'}
            </Text>

            {checkMatch() && (
              <Button onClick={onComplete} variant="filled" radius="md" fullWidth>
                Continue
              </Button>
            )}
          </>
        )}

        {!browserSupportsSpeechRecognition && !autoCompleted && (
          <Button onClick={handleRetry} variant="light" color="gray" radius="md" fullWidth>
            Retry
          </Button>
        )}
      </Stack>
    </Card>
  );
};

export default SpeechRecognition;
