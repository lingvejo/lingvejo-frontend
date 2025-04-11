'use client';

import { ReactNode } from 'react';
import VisualNovel from '@/components/core/visualNovel/VisualNovel';
import { SceneProps } from '@/components/core/visualNovel/types';
import { Quest } from './types';

export async function QuestLoader(
  quest: Quest,
  onComplete: SceneProps['onComplete']
): Promise<ReactNode> {
  const story = quest.content?.story;
  return <VisualNovel story={story} onComplete={onComplete} />;
}
