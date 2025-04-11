'use client';

import { useTranslations } from 'next-intl';
import { tutorialScene } from './tutorialScene';
import VisualNovel from '@/components/core/visualNovel/VisualNovel';
import { SceneProps } from '@/components/core/visualNovel/types';

export default function TutorialScene({ onComplete }: SceneProps) {
  const t = useTranslations();
  return <VisualNovel story={tutorialScene(t)} onComplete={onComplete} />;
}
