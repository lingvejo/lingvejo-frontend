import { DialogueLine } from '@/components/core/visualNovel/types';

type BaseQuest = {
    questId: number;
    title: string;
};
  
export type Quest =
    | (BaseQuest & {
        type: 'VisualNovel';
        content: {
            story: DialogueLine[];
        };
    })
