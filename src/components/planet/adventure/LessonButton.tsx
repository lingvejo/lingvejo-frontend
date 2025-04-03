import { Center, Button, Text, Popover } from '@mantine/core';
import { IconLeaf, IconLeaf2, IconArrowDown } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import React from 'react';

// Define interface for the LessonButton props
interface LessonButtonProps {
  lessonData: any; // The lesson data that contains module information
  onStartLearning: () => void; // Function to trigger when the lesson starts
  isEnabled: boolean; // Flag to indicate if the button is enabled
  isLatest: boolean; // Flag to indicate if this is the latest lesson
  lessonTitle: string; // The title of the lesson
  currentModule: number; // Current module number (for progress)
  lessonId: string; // Unique lesson ID
  unitId: string; // Unique unit ID
  userProgress: { [lessonId: string]: { completed: boolean; progressPercentage: number } }; // User's progress state
}

const LessonButton = React.forwardRef<HTMLButtonElement, LessonButtonProps>(
  (
    {
      lessonData,
      onStartLearning,
      isEnabled,
      isLatest,
      lessonTitle,
      currentModule,
      lessonId, // Lesson ID passed as prop
      unitId, // Unit ID passed as prop
      userProgress, // User progress passed as prop
    },
    ref
  ) => {
    const t = useTranslations();

    const maxLength = lessonData.modules.length;

    // Check if the lesson is completed based on user progress
    const isCompleted = userProgress[lessonId]?.completed;

    let buttonColor = isEnabled ? 'var(--mantine-primary-color-filled)' : 'var(--mantine-color-gray-5)';
    
    // If the lesson is enabled and is the latest, show progress
    if (isEnabled && isLatest) {
      const percentage = Math.min((currentModule / maxLength) * 100, 100); // Ensure progress doesn't exceed 100
      buttonColor = `linear-gradient(
        to right,
        var(--mantine-primary-color-filled) ${percentage}%, 
        var(--mantine-color-gray-5) ${percentage}%
      )`
    }

    return (
      <Center style={{ position: 'relative' }}>
        {isEnabled && isLatest && (
          <div
            style={{
              position: 'absolute',
              top: -15,
              backgroundColor: 'white',
              padding: '1px 10px',
              borderRadius: '100px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
              zIndex: 1,
            }}
          >
            <Center>
              <IconArrowDown />
            </Center>
          </div>
        )}
        <Popover withArrow trapFocus>
          <Popover.Target>
            <Button
              ref={ref}
              variant="filled"
              radius="xl"
              size="sm"
              style={{
                width: 80,
                height: 80,
                background: buttonColor,
                color: 'white',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                transition: 'background-color 0.3s ease',
                cursor: isEnabled ? 'pointer' : 'not-allowed', // Change cursor based on disabled state
              }}
              disabled={!isEnabled} // Disable button if not enabled
            >
              {isEnabled && !isLatest ? <IconLeaf2 size={40} /> : <IconLeaf size={40} />}
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="lg" weight={500}>
              {lessonTitle} {/* Display the title of the lesson */}
            </Text>
            <Text size="sm">
              {isLatest && !isCompleted
                ? t('planet.lessonDescription', { current: currentModule + 1, max: maxLength })
                : ''} {/* Show description only if it's the latest lesson and not completed */}
            </Text>
            <Button
              style={{
                marginTop: '10px',
                width: '100%', // Full width button
              }}
              onClick={() => {
                if (isEnabled) {
                  onStartLearning(); // Trigger learning when clicked
                }
              }}
              disabled={!isEnabled} // Disable button if not enabled
            >
              {isCompleted ? t('planet.completedLesson') : t('planet.startLesson', { xp: 30 })}
            </Button>
          </Popover.Dropdown>
        </Popover>
      </Center>
    );
  }
);

export default LessonButton;
