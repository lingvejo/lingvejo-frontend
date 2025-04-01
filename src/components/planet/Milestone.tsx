import { Container, Stack, Group, Card, Text, Button, Divider } from '@mantine/core';
import { useRef, useState } from 'react';
import { getSetting, getStep, setSetting } from '@/utils/data';
import LessonButton from './LessonButton';
import LearningPage, { LearningPageTitle } from './LearningPage';
import UnitDisplayer from './UnitDisplayer';
import FullscreenModal from '@/components/core/Modal';

const Milestone = () => {
  const planetLanguage = getSetting("language");
  const planetStep = Number(getSetting("planetStep"));
  const planetUnit = Number(getSetting("planetUnit"));
  const planetLesson = Number(getSetting("planetLesson"));
  const planetModule = Number(getSetting("planetModule"));

  const step = getStep(planetLanguage, planetStep);
  
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [learningPageVisible, setLearningPageVisible] = useState(false);
  const [learningProgress, setLearningProgress] = useState<number>(0);
  const [learningPageLocation, setLearningPageLocation] = useState({ step: 0, unit: 0, lesson: 0, module: 0 });
  const focusOnLatestButton = useRef<HTMLButtonElement | null>(null);

  const handleStartLearning = (stepIndex: number, unitIndex: number, lessonIndex: number) => {
    let moduleIndex = 0;
    if (unitIndex < planetUnit || (unitIndex === planetUnit && lessonIndex < planetLesson)) {
      setIsReviewMode(true);
    } else {
      setIsReviewMode(false);
      moduleIndex = planetModule;
    }
    setLearningPageLocation({ step: stepIndex, unit: unitIndex, lesson: lessonIndex, module: moduleIndex });
    setLearningPageVisible(true);
  };
  
  const LearningPageOnComplete = () => {
    if (!isReviewMode) {
      let newModule = planetModule + 1;
      const currentLesson = step.units[planetUnit].lessons[planetLesson];

      if (newModule >= currentLesson.modules.length) {
        newModule = 0;
        setSetting('planetModule', newModule);
        
        let newLesson = planetLesson + 1;
        setSetting('planetLesson', newLesson);
    
        if (newLesson >= step.units[planetUnit].lessons.length) {
          newLesson = 0;
          setSetting('planetLesson', newLesson);
          
          let newUnit = planetUnit + 1;
          setSetting('planetUnit', newUnit);
    
          if (newUnit >= step.units.length) {
            let newStep = planetStep + 1;
            setSetting('planetStep', newStep);
            setSetting('planetUnit', 0);
          } else {
            setSetting('planetUnit', newUnit);
          }
        }
      } else {
        setSetting('planetModule', newModule);
      }
    }
    setLearningPageVisible(false);
  };

  return (
    <>
      <Stack align="center" gap="xl">
        {step && step.units.map((unit, unitIndex) => (
          <Card key={unitIndex} shadow="md" padding="lg" radius="md" style={{ width: '100%', maxWidth: 600 }}>
            <Text align="center" weight={600} size="lg" color="var(--mantine-color-primary-7)">
              <UnitDisplayer currentStep={planetStep} currentUnit={unitIndex} />
            </Text>
            <Divider my="sm" />
            <Group justify="center" style={{ width: '100%' }}>
              
              {unit.lessons.map((lesson, lessonIndex) => {
                const isEnabled = unitIndex < planetUnit || (unitIndex === planetUnit && lessonIndex <= planetLesson);
                return (
                  <LessonButton
                    key={`${unitIndex}-${lessonIndex}`}
                    step={planetStep}
                    unit={unitIndex}
                    lesson={lessonIndex}
                    lessonData={lesson}
                    onStartLearning={() => handleStartLearning(planetStep, unitIndex, lessonIndex)}
                    isEnabled={isEnabled}
                    isLatest={unitIndex === planetUnit && lessonIndex === planetLesson}
                    ref={isEnabled && unitIndex === planetUnit && lessonIndex === planetLesson ? focusOnLatestButton : null}
                  />
                );
              })}
            </Group>
          </Card>
        ))}
        <Container mt="xl" />
      </Stack>
      <FullscreenModal
        opened={learningPageVisible}
        onClose={() => setLearningPageVisible(false)}
        title={<LearningPageTitle progress={learningProgress} />}
      >
        <LearningPage
          language={planetLanguage}
          activeStep={learningPageLocation.step}
          activeUnit={learningPageLocation.unit}
          activeLesson={learningPageLocation.lesson}
          activeModule={learningPageLocation.module}
          onComplete={LearningPageOnComplete}
          setProgress={setLearningProgress}
          isReviewMode={isReviewMode}
        />
      </FullscreenModal>
    </>
  );  
};

export default Milestone;
