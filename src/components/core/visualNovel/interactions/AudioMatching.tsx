'use client';

import React, { useState } from 'react';
import { Card, Button, Group, Stack, Text } from '@mantine/core';
import { IconVolume2 } from '@tabler/icons-react';
import { Howl } from 'howler';
import { AudioMatchingProps } from '../types';

const AudioMatching = ({ pairs, onComplete }: AudioMatchingProps) => {
  const [selectedSound, setSelectedSound] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<{ [key: string]: boolean }>({});

  const playSound = (soundFile: string) => {
    const sound = new Howl({ src: [soundFile] });
    sound.play();
    setSelectedSound(soundFile);
  };

  const handleWordClick = (word: string) => {
    if (!selectedSound) return;

    const match = pairs.find((p) => p.word === word && p.sound === selectedSound);
    if (match) {
      setMatchedPairs((prev) => ({
        ...prev,
        [word]: true,
        [selectedSound]: true, // mark sound as matched too
      }));
    }

    setSelectedSound(null);
  };

  const handleRetry = () => {
    setSelectedSound(null);
    setMatchedPairs({});
  };

  const allMatched = Object.keys(matchedPairs).filter((key) =>
    pairs.some((p) => p.word === key)
  ).length === pairs.length;

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder>
      <Stack spacing="md">
        <Group grow>
          {pairs.map(({ sound }, index) => (
            <Button
              key={index}
              variant={selectedSound === sound ? 'filled' : 'light'}
              color={selectedSound === sound ? 'black' : 'gray'}
              leftSection={<IconVolume2 size={16} />}
              onClick={() => playSound(sound)}
              disabled={matchedPairs[sound]} // disable if already matched
            >
              Play Sound
            </Button>
          ))}
        </Group>

        <Group grow>
          {pairs.map(({ word }, index) => (
            <Button
              key={index}
              variant={matchedPairs[word] ? 'filled' : 'outline'}
              color={matchedPairs[word] ? 'green' : selectedSound ? 'black' : 'gray'}
              onClick={() => handleWordClick(word)}
              disabled={matchedPairs[word]}
            >
              {word}
            </Button>
          ))}
        </Group>

        {allMatched ? (
          <Button onClick={onComplete} variant="filled" radius="md" fullWidth>
            Continue
          </Button>
        ) : (
          <Button
            onClick={handleRetry}
            variant="light"
            color="gray"
            radius="md"
            fullWidth
          >
            Retry
          </Button>
        )}
      </Stack>
    </Card>
  );
};

export default AudioMatching;
