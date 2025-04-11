'use client';

import { useTranslations } from 'next-intl';
import { tutorialStory } from './tutorialStory';
import VisualNovel from '@/components/core/visualNovel/VisualNovel';
import { SceneProps } from '@/components/core/visualNovel/types';

export default function TutorialScene({ onComplete }: SceneProps) {
  const t = useTranslations();
  return <VisualNovel story={tutorialStory(t)} onComplete={onComplete} />;
}
