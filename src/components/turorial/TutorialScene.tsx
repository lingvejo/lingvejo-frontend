'use client';

import { useTranslations } from 'next-intl';
import { tutorialScene } from '@/scenes/tutorialScene';
import VisualNovel from '@/components/core/visualNovel/VisualNovel';
import { SceneProps } from '@/components/core/visualNovel/types';

export default function TutorialScene({ onComplete }: SceneProps) {
  const t = useTranslations();

  return <VisualNovel scene={tutorialScene(t)} onComplete={onComplete} />;
}
