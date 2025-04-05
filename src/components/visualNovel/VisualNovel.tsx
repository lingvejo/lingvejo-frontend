'use client';

import { useState } from 'react';
import { Box, Stack } from '@mantine/core';
import CharacterSprite from './CharacterSprite'; // Assume you already have this component
import DialogueBox from './DialogueBox'; // Assume you already have this component
import { BACKGROUND_URL } from '@/constants/public';

export type DialogueLine = {
  speaker: 'left' | 'right';
  name: string;
  character: string;
  text: string;
  background?: string;
  choices?: { label: string; next: number }[];
};

type Props = {
  scene: DialogueLine[];
  onChoice: (nextIndex: number) => void;
};

export default function VisualNovel({ scene, onChoice }: Props) {
  const [index, setIndex] = useState(0); // Track current dialogue line
  const [isTypingDone, setIsTypingDone] = useState(false); // Control text typing animation

  const currentLine = scene[index];

  const handleNext = () => {
    if (currentLine.choices) return; // Don't proceed if there are choices
    setIndex((prev) => Math.min(prev + 1, scene.length - 1));
    setIsTypingDone(false); // Reset typing state
  };

  const handleChoice = (nextIndex: number) => {
    setIndex(nextIndex); // Set the next index based on the choice
    setIsTypingDone(false); // Reset typing state
    onChoice(nextIndex); // Trigger the callback for choice
  };

  const backgroundStyle = currentLine.background
    ? { backgroundImage: `url(${BACKGROUND_URL + currentLine.background + '.png'})` }
    : {};

  const characterStyle = {
    position: 'absolute',
    bottom: '10px',
    left: currentLine.speaker === 'left' ? '10px' : 'auto',
    right: currentLine.speaker === 'right' ? '10px' : 'auto',
    zIndex: 1, // Ensure sprite is above the background
  };

  const dialogueBoxStyle = {
    zIndex: 2, // Ensure dialog is above the character
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
            side={currentLine.speaker}
            show={true}
            character={currentLine.character}
          />
        </Box>

        <Box style={dialogueBoxStyle}>
          <DialogueBox
            speaker={currentLine.name}
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
