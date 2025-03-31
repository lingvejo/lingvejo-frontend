// components/Main.tsx
import { Container, Stack, Group } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { getMilestones, getSetting } from '@/utils/data';
import MilestoneButton from './MilestoneButton';
import LearningPage, { LearningPageTitle } from './LearningPage';
import UnitDisplayer from './UnitDisplayer';
import FullscreenModal from '@/components/core/Modal';

const Main = () => {
  const milestones = getMilestones(getSetting('language'), getSetting('step'));
  
  const activeStep = getSetting("step");
  const [activeUnit, setActiveUnit] = useState<number>(0);
  const [activeLesson, setActiveLesson] = useState<number>(0);
  
  const [learningPageVisible, setLearningPageVisible] = useState(false);
  const latestMilestoneIndex = milestones.flat().findIndex(m => m.current < m.max);
  const focusOnLatestButton = useRef<HTMLButtonElement | null>(null);


  const handleStartLearning = () => {
    setLearningPageVisible(true);
  };

  return (
    <>
      <Stack align="center" gap="xl">
        {milestones.map((unit, unitIndex) => (
          <Group key={unitIndex} justify="center" style={{ width: '100%' }}>
            <UnitDisplayer currentStep={activeStep} currentUnit={unitIndex} />
            {unit.map((milestone, index) => (
              <MilestoneButton
                key={index}
                milestone={milestone}
                unit={unitIndex}
                lesson={index}
                onStartLearning={handleStartLearning}
                isLatest={unitIndex === Math.floor(latestMilestoneIndex / unit.length) && index === latestMilestoneIndex % unit.length}
                ref={unitIndex === Math.floor(latestMilestoneIndex / unit.length) && index === latestMilestoneIndex % unit.length ? focusOnLatestButton : null}
                setActiveUnit={setActiveUnit}
                setActiveLesson={setActiveLesson}
              />
            ))}
          </Group>
        ))}
        <Container h={180} />
      </Stack>
      <FullscreenModal
        opened={learningPageVisible}
        onClose={() => setLearningPageVisible(false)}
        title={<LearningPageTitle />}
      >
        <LearningPage
          activeStep={activeStep}
          activeUnit={activeUnit}
          activeLesson={activeLesson}
        />
      </FullscreenModal>
    </>
  );
};

export default Main;
