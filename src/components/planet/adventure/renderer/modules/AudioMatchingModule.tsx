import React, { useState } from 'react';
import { Card, Button, Group, Text, Stack } from '@mantine/core';
import { IconVolume2 } from '@tabler/icons-react';
import { Howl } from 'howler';

interface AudioMatchingModuleProps {
  data: {
    pairs: { sound: string; word: string }[];
  };
}

const AudioMatchingModule: React.FC<AudioMatchingModuleProps> = ({ data }) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<{ [key: string]: boolean }>({});

  const playSound = (soundFile: string) => {
    const sound = new Howl({ src: [soundFile] });
    sound.play();
  };

  const handleMatch = (word: string, sound: string) => {
    if (selectedWord && selectedWord === word) {
      setMatchedPairs((prev) => ({ ...prev, [word]: true }));
      setSelectedWord(null);
    } else {
      setSelectedWord(word);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack>
        <Text size="lg" weight={500}>Match the sound to the word</Text>
        <Group>
          {data.pairs.map(({ sound, word }) => (
            <Button
              key={sound}
              variant={matchedPairs[word] ? 'filled' : 'light'}
              color="blue"
              lefticon={<IconVolume2 size={16} />}
              onClick={() => playSound(sound)}
            >
              Play Sound
            </Button>
          ))}
        </Group>
        <Group>
          {data.pairs.map(({ word, sound }) => (
            <Button
              key={word}
              variant={matchedPairs[word] ? 'filled' : 'outline'}
              color={matchedPairs[word] ? 'green' : 'gray'}
              onClick={() => handleMatch(word, sound)}
            >
              {word}
            </Button>
          ))}
        </Group>
      </Stack>
    </Card>
  );
};

export default AudioMatchingModule;
