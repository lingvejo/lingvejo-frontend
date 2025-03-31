// components/MilestoneButton.tsx
import { Center, Button, Text, Paper, Popover } from '@mantine/core';
import { IconLeaf, IconLeaf2 } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface MilestoneButtonProps {
  milestone: { current: number; max: number, xp: number, title: string };
  unit: number;
  lesson: number;
  onStartLearning: () => void;
  isLatest: boolean;
  ref: React.Ref<HTMLButtonElement>;
  setActiveUnit: (index: number | null) => void;
  setActiveLesson: (index: number | null) => void;
}

const MilestoneButton = React.forwardRef<HTMLButtonElement, MilestoneButtonProps>(
  ({ milestone, unit, lesson, onStartLearning,
    isLatest, setActiveUnit, setActiveLesson }, ref) => {
    const t = useTranslations();
    const progress = (milestone.current / milestone.max) * 100; // Calculate progress percentage

    return (
      <Center style={{ position: 'relative' }}>
        {isLatest && (
          <div
            style={{
              position: 'absolute',
              top: -25,
              backgroundColor: 'white',
              padding: '5px 10px',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
              zIndex: 1,
            }}
          >
            <Text size="sm">{t(`planet.start`)}</Text>
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
                background: `linear-gradient(
                  to right,
                  var(--mantine-primary-color-filled) ${progress}%, 
                  var(--mantine-color-gray-5) ${progress}%
                )`,
                color: 'white',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                transition: 'background-color 0.3s ease',
              }}
            >
              {isLatest ? <IconLeaf2 size={40} /> : <IconLeaf size={40} />}
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="lg" weight={500}>{milestone.title}</Text>
            <Text size="sm">
              {t('planet.lessonDescription', { current: milestone.current, max: milestone.max })}
            </Text>
            <Button
              variant="outline"
              style={{
                marginTop: '10px',
                width: '100%', // Full width button
                color: 'var(--mantine-primary-color-filled)',
              }}
              onClick={() => {
                onStartLearning(); // Trigger the learning page
                setActiveUnit(unit);
                setActiveLesson(lesson);
              }}
            >
              {t('planet.startLesson', { xp: milestone.xp })}
            </Button>
          </Popover.Dropdown>
        </Popover>
      </Center>
      );
    }
  );
  
  export default MilestoneButton;