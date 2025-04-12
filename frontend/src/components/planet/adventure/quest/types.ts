import { DialogueLine } from '@/components/core/visualNovel/types';

export type Quest = {
    questId: number;
    title: string;
    content: {
        story: DialogueLine[];
    };
};