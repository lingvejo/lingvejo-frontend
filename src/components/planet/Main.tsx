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

  const [currentUnit, setCurrentUnit] = useState<number>(0); // State to track the current unit
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const [learningPageVisible, setLearningPageVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const latestMilestoneIndex = milestones.flat().findIndex(m => m.current < m.max);
  const focusOnLatestButton = useRef<HTMLButtonElement | null>(null);
  const currentUnitIndex = Math.floor(latestMilestoneIndex / milestones[0].length); // Determine the current unit index

  useEffect(() => {
    if (focusOnLatestButton.current) {
      focusOnLatestButton.current.focus();
    }
    setCurrentUnit(currentUnitIndex); // Update the current unit when it changes
  }, [latestMilestoneIndex]);

  const handleStartLearning = () => {
    setLearningPageVisible(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (activeMilestone !== null && !event.target.closest('.milestone-popup')) {
      setActiveMilestone(null);
      setPopupVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMilestone]);

  return (
    <>
      <Stack align="center" gap="xl">
        {milestones.map((unit, unitIndex) => (
          <Group key={unitIndex} justify="center" style={{ width: '100%' }}>
            <UnitDisplayer currentStep={getSetting("step")} currentUnit={unitIndex} />
            {unit.map((milestone, index) => (
              <MilestoneButton
                key={index}
                milestone={milestone}
                index={index}
                onStartLearning={handleStartLearning}
                isLatest={unitIndex === Math.floor(latestMilestoneIndex / unit.length) && index === latestMilestoneIndex % unit.length}
                ref={unitIndex === Math.floor(latestMilestoneIndex / unit.length) && index === latestMilestoneIndex % unit.length ? focusOnLatestButton : null}
                setPopupVisible={setPopupVisible}
                setActiveMilestone={setActiveMilestone}                  />
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
        <LearningPage />
      </FullscreenModal>
    </>
  );
};

export default Main;
