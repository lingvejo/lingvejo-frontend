// components/LessonUnit.tsx
import { Stack, Divider } from '@mantine/core';
import LessonButton from './LessonButton';

interface LessonUnitProps {
  unit: { current: number; max: number }[];
  unitIndex: number;
  latestLessonIndex: number;
  setActiveLesson: (index: number | null) => void;
  onStartLearning: () => void;
  setPopupVisible: (visible: boolean) => void;
  focusOnLatestButton: React.Ref<HTMLButtonElement | null>;
}

const LessonUnit: React.FC<LessonUnitProps> = ({
  unit,
  unitIndex,
  latestLessonIndex,
  setActiveLesson,
  onStartLearning,
  setPopupVisible,
  focusOnLatestButton,
}) => {
  return (
    <div style={{ width: '100%' }}>
      <Stack align="center" spacing="xl">
        {unit.map((progress, index) => (
          <LessonButton
            key={index}
            progress={progress}
            index={index}
            setActiveLesson={setActiveLesson}
            onStartLearning={onStartLearning}
            isLatest={unitIndex === Math.floor(latestLessonIndex / unit.length) && index === latestLessonIndex % unit.length}
            ref={unitIndex === Math.floor(latestLessonIndex / unit.length) && index === latestLessonIndex % unit.length ? focusOnLatestButton : null}
            setPopupVisible={setPopupVisible}
          />
        ))}
      </Stack>
      {unitIndex < 1 && <Divider style={{ margin: '20px 0' }} />} {/* Horizontal separator */}
    </div>
  );
};

export default LessonUnit;
