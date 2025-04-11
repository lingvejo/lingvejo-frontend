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

export type DialogueInteraction =
  | { type: 'DragAndDrop'; words: string[] }
  | { type: 'MultipleChoice'; options: string[]; correct: string }
  | { type: 'FillInTheBlank'; sentence: string; options: string[] }
  | { type: 'ImageAssociation'; images: { word: string; image: string }[] }
  | { type: 'AudioMatching'; pairs: { word: string; sound: string }[] }
  | { type: 'SpeechRecognition'; phrases: { text: string; translation: string }[] }
  | { type: 'Challenge'; challenge: { text: string; translation: string } }
  | { type: 'MiniGame'; words: { text: string; translation: string }[]; gameType: 'Memory Match' };
