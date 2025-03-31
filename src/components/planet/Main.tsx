import { Container, Stack, Group } from '@mantine/core';
import { useRef, useState } from 'react';
import { getSetting, getStep } from '@/utils/data';
import LessonButton from './LessonButton';
import LearningPage, { LearningPageTitle } from './LearningPage';
import UnitDisplayer from './UnitDisplayer';
import FullscreenModal from '@/components/core/Modal';

const Main = () => {
  const planetLanguage = getSetting("planetLanguage");
  const planetStep = getSetting("planetStep");
  const planetUnit = getSetting("planetUnit");
  const planetLesson = getSetting("planetLesson");

  const step = getStep(planetLanguage, planetStep);

  // By default the focus should be on the last learned lesson
  const [activeUnit, setActiveUnit] = useState(planetStep);
  const [activeLesson, setActiveLesson] = useState(planetUnit);
  
  const [learningPageVisible, setLearningPageVisible] = useState(false);
  const focusOnLatestButton = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Stack align="center" gap="xl">
        {step.units.map((unit, unitIndex) => {
          // Calculate the latest unit and lesson indices
          const latestUnitIndex = Math.floor(planetLesson / step.units.length);
          const latestLessonIndex = planetLesson % step.units.length;

          return (
            <Group key={unitIndex} justify="center" style={{ width: '100%' }}>
              <UnitDisplayer currentStep={planetStep} currentUnit={unitIndex} />
              {unit.lessons.map((lesson, lessonIndex) => {
                const isEnabled = unitIndex < latestUnitIndex || (unitIndex === latestUnitIndex && lessonIndex <= latestLessonIndex);

                return (
                  <LessonButton
                    key={`${unitIndex}-${lessonIndex}`}
                    step={planetStep}
                    unit={unitIndex}
                    lesson={lessonIndex}
                    lessonData={lesson}
                    onStartLearning={() => setLearningPageVisible(true)}
                    isEnabled={isEnabled}
                    isLatest={lessonIndex === latestLessonIndex}
                    ref={isEnabled && unitIndex === latestUnitIndex && lessonIndex === latestLessonIndex ? focusOnLatestButton : null}
                    setActiveUnit={setActiveUnit}
                    setActiveLesson={setActiveLesson}
                  />
                );
              })}
            </Group>
          );
        })}
        <Container h={180} />
      </Stack>
      <FullscreenModal
        opened={learningPageVisible}
        onClose={() => setLearningPageVisible(false)}
        title={<LearningPageTitle />}
      >
        <LearningPage
          language={planetLanguage}
          activeStep={planetStep}
          activeUnit={activeUnit}
          activeLesson={activeLesson}
          onComplete={() => setLearningPageVisible(false)}
        />
      </FullscreenModal>
    </>
  );
};

export default Main;
