// components/UnitDisplayer.tsx
import { getSetting, getUnitDescription } from '@/utils/data';
import { Button, Stack, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

interface UnitDisplayerProps {
  currentStep: number;
  currentUnit: number;
}

const UnitDisplayer: React.FC<UnitDisplayerProps> = ({ currentStep, currentUnit }) => {
  const t = useTranslations();

  return (
    <Button
      h={75}
      style={{
        width: 'calc(100% - 32px)', // Full width minus padding
        borderRadius: '10px',
        backgroundColor: 'var(--mantine-primary-color-filled)', // Primary background color
        color: 'white', // White text color
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', // Shadow effect
      }}
    >
      <Stack gap="xs">
        {/* Displaying unit index + 1 for user-friendly format */}
        <Text size="sm">{t("planet.unitDescription", { step: currentStep+1, unit: currentUnit+1 })}</Text>
        <Text size="xl">{getUnitDescription(getSetting("language"), currentStep, currentUnit)}</Text>
      </Stack>
    </Button>
  );
};

export default UnitDisplayer;
