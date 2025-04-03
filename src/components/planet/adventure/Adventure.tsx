import { Container, Stack, Group, Card, Text, Divider, Loader } from '@mantine/core';
import { useRef, useState, useEffect } from 'react';
import { handleError } from '@/utils/data';
import LessonButton from './LessonButton';
import LearningPage, { LearningPageTitle } from './LearningPage';
import UnitDisplayer from './UnitDisplayer';
import FullscreenModal from '@/components/core/Modal';
import WizardNPC from '@/components/npc/WizardNPC';
import EditModeActions from './editor/EditModeActions';
import { getUnits } from '@/utils/data/getter/getUnits';
import { getLatestProgress } from '@/utils/data/getter/getLatestProgress'; // Import getLatestProgress
import { getProgress } from '@/utils/data/getter/getProgress'; // Import getProgress

const conversations = [
  "Welcome to the planet, adventurer!",
];

const Adventure = () => {
  const [units, setUnits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState<{ [lessonId: string]: { completed: boolean } }>({});

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const fetchedUnits = await getUnits(); // Assuming `getUnits` fetches all units
        setUnits(fetchedUnits);
        setLoading(false);
      } catch (error) {
        handleError(error);
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  useEffect(() => {
    const loadUserProgress = async () => {
      try {
        const progress = await getProgress(1, planetId, stepId); // Temporarily using userId = 1
        const progressMap = progress.reduce((acc, { unitId, lessonId, moduleId, complete }) => {
          acc[lessonId] = { completed: complete };
          return acc;
        }, {});
        setUserProgress(progressMap);
      } catch (error) {
        handleError(error);
      }
    };
  
    loadUserProgress();
  }, [units]); // If you need to depend on `units` or other state values
  

  const [wizardHere, setWizardHere] = useState(true);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [learningPageVisible, setLearningPageVisible] = useState(false);
  const [learningProgress, setLearningProgress] = useState<number>(0);
  const [learningPageLocation, setLearningPageLocation] = useState({ step: 0, unit: 0, lesson: 0, module: 0 });
  const focusOnLatestButton = useRef<HTMLButtonElement | null>(null);

  const handleStartLearning = (unitId: number, lessonId: number) => {
    const { unitId: latestUnitId, lessonId: latestLessonId, moduleId: latestModuleId } = getLatestProgress(unitId, lessonId); // Get the latest progress data

    setLearningPageLocation({
      unit: latestUnitId,
      lesson: latestLessonId,
      module: latestModuleId,
      step: 0, // Assuming a static step or adjust as needed
    });

    setLearningPageVisible(true);
  };

  return (
    <>
      <Stack align="center" gap="xl">
        {loading ? (
          <Loader size="lg" color="blue" variant="dots" />
        ) : (
          units.length > 0 && units.map((unit) => (
            <Card key={unit.id} shadow="md" padding="lg" radius="md" style={{ width: '100%', maxWidth: 600 }}>
              <UnitDisplayer
                currentStep={0} // You can adjust as needed, currently static
                currentUnit={unit.id} // The database id
                unitTitle={unit.title} // Pass the title to UnitDisplayer
              />
              <Divider my="sm" />
              <Group justify="center" style={{ width: '100%' }}>
                {unit.lessons.map((lesson) => {
                  const isCompleted = userProgress[lesson.id]?.completed ?? false; // Get lesson completion status
                  return (
                    <LessonButton
                      key={`${unit.id}-${lesson.id}`} // Keep key unique based on unit and lesson IDs
                      lessonData={lesson} // Pass the entire lesson data to the button
                      lessonTitle={lesson.title} // Pass lesson title here
                      currentModule={0} // Static step, can be dynamic if needed
                      lessonId={lesson.id} // Pass lesson ID to uniquely identify the lesson
                      unitId={unit.id} // Pass unit ID for context
                      onStartLearning={() => handleStartLearning(unit.id, lesson.id)} // Action to start the lesson
                      isCompleted={isCompleted} // Pass completion status
                      isLatest={unit.id === lesson.id} // Check if the current unit and lesson are the latest
                      ref={isCompleted ? focusOnLatestButton : null} // Focus latest if completed
                    />
                  );
                })}
              </Group>
            </Card>
          ))
        )}
        <Container mt="xl" />
      </Stack>

      <FullscreenModal
        opened={learningPageVisible}
        onClose={() => setLearningPageVisible(false)}
        title={<LearningPageTitle progress={learningProgress} />}
      >
        <LearningPage
          language={0} // Adjust based on logic
          activeStep={learningPageLocation.step}
          activeUnit={learningPageLocation.unit}
          activeLesson={learningPageLocation.lesson}
          activeModule={learningPageLocation.module}
          onComplete={() => setLearningPageVisible(false)}
          setProgress={setLearningProgress}
          isReviewMode={isReviewMode}
        />
      </FullscreenModal>

      {wizardHere && (
        <WizardNPC
          wizardHere={wizardHere}
          conversations={conversations}
          type="wizard"
          onLeave={() => setWizardHere(false)}
        />
      )}

      <EditModeActions
        onEdit={() => console.log('Edit mode')}
        onAdd={() => console.log('Add new module')}
        onDelete={() => console.log('Delete module')}
      />
    </>
  );
};

export default Adventure;
