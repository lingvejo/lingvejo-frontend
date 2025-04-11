'use client';

import { ReactNode } from 'react';
import VisualNovel from '@/components/core/visualNovel/VisualNovel';
import { SceneProps } from '@/components/core/visualNovel/types';
import { Quest } from './types';

export async function QuestLoader(
  quest: Quest,
  onComplete: SceneProps['onComplete']
): Promise<ReactNode> {
  if (quest.type === 'VisualNovel') {
    const story = quest.content?.story;
    return <VisualNovel scene={story} onComplete={onComplete} />;
  }

  throw new Error(`Unknown quest type: ${quest.type}`);
}
