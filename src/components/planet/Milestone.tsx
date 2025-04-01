import { Container, Stack, Group } from '@mantine/core';
import { useRef, useState } from 'react';
import { getSetting, getStep, setSetting } from '@/utils/data';
import LessonButton from './LessonButton';
import LearningPage, { LearningPageTitle } from './LearningPage';
import UnitDisplayer from './UnitDisplayer';
import FullscreenModal from '@/components/core/Modal';

const Milestone = () => {
  const planetLanguage = getSetting("language");
  const planetStep = Number(getSetting("planetStep")); // Convert to number
  const planetUnit = Number(getSetting("planetUnit")); // Convert to number
  const planetLesson = Number(getSetting("planetLesson")); // Convert to number
  const planetModule = Number(getSetting("planetModule")); // Convert to number

  console.log(`Debugging Data: ${JSON.stringify({
    planetLanguage,
    planetStep,
    planetUnit,
    planetLesson,
    planetModule
  })}`);
  
  const step = getStep(planetLanguage, planetStep);
  
  const [isReviewMode, setIsReviewMode] = useState(false); // New state for review mode
  
  const [learningPageVisible, setLearningPageVisible] = useState(false);
  const [learningProgress, setLearningProgress] = useState<number>(0);
  const [learningPageLocation, setLearningPageLocation] = useState({step: 0, unit: 0, lesson: 0, module: 0});
  const focusOnLatestButton = useRef<HTMLButtonElement | null>(null);

  const handleStartLearning = (stepIndex: number, unitIndex: number, lessonIndex: number) => {
    let moduleIndex = 0;
    // Check if the lesson is already completed
    if (unitIndex < planetUnit || (unitIndex === planetUnit && lessonIndex < planetLesson)) {
      setIsReviewMode(true);
    } else {
      setIsReviewMode(false); // Set to learning mode
      moduleIndex = planetModule;
    }
    setLearningPageLocation({step: stepIndex, unit: unitIndex, lesson: lessonIndex, module: moduleIndex});
    setLearningPageVisible(true);
  };
  
  const LearningPageOnComplete = () => {
    if (!isReviewMode) {
      // Increment the module
      let newModule = planetModule + 1; // No need to use Number() here since it's already a number
    
      // Get the current lesson
      const currentLesson = step.units[planetUnit].lessons[planetLesson];

      // Check if the module is full
      if (newModule >= currentLesson.modules.length) { // Compare with modules.length
        // Reset the module and increment the lesson
        newModule = 0;
        setSetting('planetModule', newModule);
        
        let newLesson = planetLesson + 1; // Increment lesson
        setSetting('planetLesson', newLesson);
    
        // Check if the lesson is full
        if (newLesson >= step.units[planetUnit].lessons.length) {
          // Reset the lesson and increment the unit
          newLesson = 0;
          setSetting('planetLesson', newLesson);
          
          let newUnit = planetUnit + 1; // Increment unit
          setSetting('planetUnit', newUnit);
    
          // Check if the unit is full
          if (newUnit >= step.units.length) {
            // Increment the step if all units are completed
            let newStep = planetStep + 1; // Increment step
            setSetting('planetStep', newStep);
            setSetting('planetUnit', 0); // Reset unit to 0 for the new step
          } else {
            // If the unit is not full, just update the unit
            setSetting('planetUnit', newUnit);
          }
        }
      } else {
        // If the module is not full, just update the module
        setSetting('planetModule', newModule);
      }
    }

    setLearningPageVisible(false);
  };  

  return (
    <>
      <Stack align="center" gap="xl">
        {step && step.units.map((unit, unitIndex) => {
          return (
            <Group key={unitIndex} justify="center" style={{ width: '100%' }}>
              <UnitDisplayer currentStep={planetStep} currentUnit={unitIndex} />
              {unit.lessons.map((lesson, lessonIndex) => {
                const isEnabled = unitIndex < planetUnit || (unitIndex === planetUnit && lessonIndex <= planetLesson);
                return (
                  <LessonButton
                    key={`${unitIndex}-${lessonIndex}`}
                    step={planetStep}
                    unit={unitIndex}
                    lesson={lessonIndex}
                    lessonData={lesson}
                    onStartLearning={() => handleStartLearning(planetStep, unitIndex, lessonIndex)} // Updated function
                    isEnabled={isEnabled}
                    isLatest={unitIndex === planetUnit && lessonIndex === planetLesson}
                    ref={isEnabled && unitIndex === planetUnit && lessonIndex === planetLesson ? focusOnLatestButton : null}
                  />
                );
              })}
            </Group>
          );
        })}
        <Container />
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
          isReviewMode={isReviewMode} // Pass the review mode state
        />
      </FullscreenModal>
    </>
  );  
};

export default Milestone;
