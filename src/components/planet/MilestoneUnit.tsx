// components/MilestoneUnit.tsx
import { Stack, Divider } from '@mantine/core';
import MilestoneButton from './MilestoneButton';

interface MilestoneUnitProps {
  unit: { current: number; max: number }[];
  unitIndex: number;
  latestMilestoneIndex: number;
  setActiveMilestone: (index: number | null) => void;
  onStartLearning: () => void;
  setPopupVisible: (visible: boolean) => void;
  focusOnLatestButton: React.Ref<HTMLButtonElement | null>;
}

const MilestoneUnit: React.FC<MilestoneUnitProps> = ({
  unit,
  unitIndex,
  latestMilestoneIndex,
  setActiveMilestone,
  onStartLearning,
  setPopupVisible,
  focusOnLatestButton,
}) => {
  return (
    <div style={{ width: '100%' }}>
      <Stack align="center" spacing="xl">
        {unit.map((milestone, index) => (
          <MilestoneButton
            key={index}
            milestone={milestone}
            index={index}
            setActiveMilestone={setActiveMilestone}
            onStartLearning={onStartLearning}
            isLatest={unitIndex === Math.floor(latestMilestoneIndex / unit.length) && index === latestMilestoneIndex % unit.length}
            ref={unitIndex === Math.floor(latestMilestoneIndex / unit.length) && index === latestMilestoneIndex % unit.length ? focusOnLatestButton : null}
            setPopupVisible={setPopupVisible}
          />
        ))}
      </Stack>
      {unitIndex < 1 && <Divider style={{ margin: '20px 0' }} />} {/* Horizontal separator */}
    </div>
  );
};

export default MilestoneUnit;
