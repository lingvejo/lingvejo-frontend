import { Button, Stack, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

interface UnitDisplayerProps {
  currentStep: number;
  currentUnit: number;
  unitTitle: string;  // Added new prop for the unit title
}

const UnitDisplayer: React.FC<UnitDisplayerProps> = ({ currentStep, currentUnit, unitTitle }) => {
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
        <Text size="sm">{t("planet.unitDescription", { step: currentStep, unit: currentUnit })}</Text>
        <Text size="xl">{unitTitle}</Text> {/* Display the unit title passed as a prop */}
      </Stack>
    </Button>
  );
};

export default UnitDisplayer;
