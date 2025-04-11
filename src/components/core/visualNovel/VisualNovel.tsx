'use client';

import { useState } from 'react';
import { Box, Stack } from '@mantine/core';
import CharacterSprite from './CharacterSprite';
import DialogueBox from './DialogueBox';
import { BACKGROUND_URL } from '@/constants/public';
import { VisualNovelProps } from './types';

export default function VisualNovel({ scene, onComplete }: VisualNovelProps) {
  const [index, setIndex] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);

  const currentLine = scene[index];

  const handleNext = () => {
    if (currentLine.choices) return;
  
    const isLastLine = index === scene.length - 1;
    if (isLastLine) {
      onComplete();
      return;
    }
  
    setIndex((prev) => prev + 1);
    setIsTypingDone(false);
  };  

  const handleChoice = (nextIndex: number | null) => {
    if (nextIndex === null) {
      onComplete();
      return;
    }
    
    setIndex(nextIndex);
    setIsTypingDone(false);
  };

  const backgroundStyle = currentLine.background
    ? { backgroundImage: `url(${BACKGROUND_URL + currentLine.background + '.png'})` }
    : {};

  const characterStyle = {
    position: 'absolute',
    bottom: '10px',
    left: currentLine.location === 'left' ? '10px' : 'auto',
    right: currentLine.location === 'right' ? '10px' : 'auto',
    zIndex: 1,
  };

  const dialogueBoxStyle = {
    zIndex: 2,
  };

  return (
    <Box
      style={{
        height: '100vh',
        padding: '1rem',
        backgroundColor: '#101010',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        ...backgroundStyle,
      }}
    >
      <Stack spacing="xs" justify="flex-end" style={{ height: '100%' }}>
        <Box style={characterStyle}>
          <CharacterSprite
            location={currentLine.location}
            character={currentLine.character}
          />
        </Box>

        <Box style={dialogueBoxStyle}>
          <DialogueBox
            character={currentLine.name}
            text={currentLine.text}
            isTypingDone={isTypingDone}
            setIsTypingDone={setIsTypingDone}
            onNext={handleNext}
            choices={currentLine.choices}
            handleChoice={handleChoice}
          />
        </Box>
      </Stack>
    </Box>
  );
}
