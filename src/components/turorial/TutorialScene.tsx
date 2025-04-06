'use client';

import { useTranslations } from 'next-intl';
import { tutorialScene } from '@/scenes/tutorialScene';
import VisualNovel from '@/components/visualNovel/VisualNovel';
import { SceneProps } from '@/components/visualNovel/types';

export default function TutorialScene({ onComplete }: SceneProps) {
  const t = useTranslations();

  return <VisualNovel scene={tutorialScene(t)} onComplete={onComplete} />;
}
