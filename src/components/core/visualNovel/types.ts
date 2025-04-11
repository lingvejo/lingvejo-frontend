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
    setIsTypingDone: (val: boolean) => void;
    onNext: () => void;
    choices?: DialogueChoice[];
    handleChoice: (nextIndex: number | null) => void;
};