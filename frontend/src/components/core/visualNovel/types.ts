export type DialogueChoice = {
  label: string;
  next: number | null;
};

export type DialogueLine = {
  text: string;
  background?: string;
  location?: string;
  name?: string;
  character?: string;
  choices?: DialogueChoice[];
  interaction?: DialogueInteraction;
};

export type SceneProps = {
  onComplete: () => void;
};

export type VisualNovelProps = {
  story: DialogueLine[];
  onComplete: () => void;
};

export type CharacterSpriteProps = {
  location?: string;
  character?: string;
};

export type DialogueBoxProps = {
  character?: string;
  text: string;
  isTypingDone: boolean;
  setIsTypingDone: (done: boolean) => void;
  onNext: () => void;
  choices?: DialogueChoice[];
  interaction?: DialogueInteraction;
  handleChoice: (nextIndex: number | null) => void;
};

export interface BaseInteractionProps {
  onComplete: () => void;
}

export interface DragAndDropProps extends BaseInteractionProps {
  words: string[];
}

export interface MultipleChoiceProps extends BaseInteractionProps {
  options: string[];
  correct: string[];
}

export interface FillInTheBlankProps extends BaseInteractionProps {
  sentence: string;
  options: string[];
}

export interface ImageAssociationProps extends BaseInteractionProps {
  images: { word: string; image: string }[];
}

export interface AudioMatchingProps extends BaseInteractionProps {
  pairs: { word: string; sound: string }[];
}

export interface SpeechRecognitionProps extends BaseInteractionProps {
  phrases: { text: string; translation: string }[];
}

export interface ChallengeProps extends BaseInteractionProps {
  challenge: { text: string; translation: string };
}

export interface MiniGameProps extends BaseInteractionProps {
  words: { text: string; translation: string }[];
  gameType: 'Memory Match';
}

export type DialogueInteractionMap = {
  DragAndDrop: DragAndDropProps;
  MultipleChoice: MultipleChoiceProps;
  FillInTheBlank: FillInTheBlankProps;
  ImageAssociation: ImageAssociationProps;
  AudioMatching: AudioMatchingProps;
  SpeechRecognition: SpeechRecognitionProps;
  Challenge: ChallengeProps;
  MiniGame: MiniGameProps;
};

export type DialogueInteraction = {
  [K in keyof DialogueInteractionMap]: { type: K } & DialogueInteractionMap[K];
}[keyof DialogueInteractionMap];
