// components/MilestoneList.tsx
import { Stack } from '@mantine/core';
import MilestoneUnit from './MilestoneUnit';

interface MilestoneListProps {
  milestones: { current: number; max: number }[][];
  latestMilestoneIndex: number;
  setActiveMilestone: (index: number | null) => void;
  onStartLearning: () => void;
  setPopupVisible: (visible: boolean) => void;
  focusOnLatestButton: React.Ref<HTMLButtonElement | null>;
}

const MilestoneList: React.FC<MilestoneListProps> = ({
  milestones,
  latestMilestoneIndex,
  setActiveMilestone,
  onStartLearning,
  setPopupVisible,
  focusOnLatestButton,
}) => {
  return (
    <Stack align="center" spacing="xl">
      {milestones.map((unit, unitIndex) => (
        <MilestoneUnit
          key={unitIndex}
          unit={unit}
          unitIndex={unitIndex}
          latestMilestoneIndex={latestMilestoneIndex}
          setActiveMilestone={setActiveMilestone}
          onStartLearning={onStartLearning}
          setPopupVisible={setPopupVisible}
          focusOnLatestButton={focusOnLatestButton}
        />
      ))}
    </Stack>
  );
};

export default MilestoneList;
