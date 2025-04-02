import { Stack } from '@mantine/core';
import LessonUnit from './LessonUnit';

interface LessonListProps {
  progress: { current: number; max: number }[][];
  latestLessonIndex: number;
  setActiveLesson: (index: number | null) => void;
  onStartLearning: () => void;
  setPopupVisible: (visible: boolean) => void;
  focusOnLatestButton: React.Ref<HTMLButtonElement | null>;
}

const LessonList: React.FC<LessonListProps> = ({
  progress,
  latestLessonIndex,
  setActiveLesson,
  onStartLearning,
  setPopupVisible,
  focusOnLatestButton,
}) => {
  return (
    <Stack align="center" spacing="xl">
      {progress.map((unit, unitIndex) => (
        <LessonUnit
          key={unitIndex}
          unit={unit}
          unitIndex={unitIndex}
          latestLessonIndex={latestLessonIndex}
          setActiveLesson={setActiveLesson}
          onStartLearning={onStartLearning}
          setPopupVisible={setPopupVisible}
          focusOnLatestButton={focusOnLatestButton}
        />
      ))}
    </Stack>
  );
};

export default LessonList;
