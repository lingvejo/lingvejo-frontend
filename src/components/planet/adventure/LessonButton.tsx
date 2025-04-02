import { getLessonTitle, getSetting } from '@/utils/data';
import { Center, Button, Text, Popover } from '@mantine/core';
import { IconLeaf, IconLeaf2, IconArrowDown } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface LessonButtonProps {
  step: number;
  unit: number;
  lesson: number;
  lessonData: any;
  onStartLearning: () => void;
  isEnabled: boolean;
  isLatest: boolean;
  ref: React.Ref<HTMLButtonElement>;
}

const LessonButton = React.forwardRef<HTMLButtonElement, LessonButtonProps>(
  (
    {
      step,
      unit,
      lesson,
      lessonData,
      onStartLearning,
      isEnabled,
      isLatest
    },
    ref
  ) => {
    const t = useTranslations();

    const planetModule = Number(getSetting("planetModule"));
    const maxLength = lessonData.modules.length;

    let buttonColor = isEnabled ? 'var(--mantine-primary-color-filled)' : 'var(--mantine-color-gray-5)';
    if (isEnabled && isLatest) {
      // Module learning percentage
      const percentage = Math.min((planetModule / maxLength) * 100, 100); // Ensure percentage does not exceed 100
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
              disabled={!isEnabled} // Set the disabled prop
            >
              {isEnabled && !isLatest ? <IconLeaf2 size={40} /> : <IconLeaf size={40} />}
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="lg" weight={500}>
              {getLessonTitle(getSetting("language"), step, unit, lesson)}
            </Text>
            <Text size="sm">
              {isLatest ? t('planet.lessonDescription', { current: planetModule + 1, max: maxLength }) : ''}
            </Text>
            <Button
              style={{
                marginTop: '10px',
                width: '100%', // Full width button
              }}
              onClick={() => {
                if (isEnabled) { // Only trigger if not disabled
                  onStartLearning(); // Trigger the learning page
                }
              }}
              disabled={!isEnabled} // Set the disabled prop
            >
              {isLatest ? t('planet.startLesson', { xp: getSetting("planetXpPerLesson") }) : t('planet.reviewLesson') }
            </Button>
          </Popover.Dropdown>
        </Popover>
      </Center>
    );
  }
);

export default LessonButton;
