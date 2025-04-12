import { Text, Loader, Center, Button } from '@mantine/core';
import { DialogueInteraction } from './types';
import { Suspense, lazy } from 'react';

interface DialogueInteractionProps {
  interaction: DialogueInteraction;
  onComplete?: () => void;
}

// Predefined mapping of valid interaction types to components
const interactionComponents: Record<
  DialogueInteraction['type'],
  ReturnType<typeof lazy>
> = {
  DragAndDrop: lazy(() => import('./interactions/DragAndDrop')),
  MultipleChoice: lazy(() => import('./interactions/MultipleChoice')),
  FillInTheBlank: lazy(() => import('./interactions/FillInTheBlank')),
  ImageAssociation: lazy(() => import('./interactions/ImageAssociation')),
  AudioMatching: lazy(() => import('./interactions/AudioMatching')),
  SpeechRecognition: lazy(() => import('./interactions/SpeechRecognition')),
  Challenge: lazy(() => import('./interactions/Challenge')),
  MiniGame: lazy(() => import('./interactions/MiniGame')),
};

const DialogueInteraction = ({ interaction, onComplete }: DialogueInteractionProps) => {
  const Component = interactionComponents[interaction.type];

  if (!Component) {
    return (
      <>
        <Text c="yellow">✨ Unknown interaction type: {interaction.type}</Text>
        <Button onClick={onComplete} variant="outline" color="white">
          Next
        </Button>
      </>
    );
  }

  return (
    <Suspense fallback={<Center><Loader /></Center>}>
      <Component {...interaction} onComplete={onComplete} />
    </Suspense>
  );
};

export default DialogueInteraction;
