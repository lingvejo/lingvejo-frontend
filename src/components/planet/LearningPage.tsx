import { getLesson, getSetting } from '@/utils/data';
import { Container, Button, Text, Progress } from '@mantine/core';
import { useTranslations } from 'next-intl';

export const LearningPageTitle = () => {
  return (
    <div style={{ width: '85vw' }}>
      <Progress value={50} />
    </div>
  );
};

interface LearningPageProps {
  activeStep: number,
  activeUnit: number,
  activeLesson: number
}

const LearningPage: React.FC<LearningPageProps> = ({
  activeStep, activeUnit, activeLesson
}) => {
  const t = useTranslations();
  const lesson = getLesson(getSetting('language'), activeStep, activeUnit, activeLesson);

  return (
    <Container style={{ 
      display: 'flex', // Use flexbox for layout
      flexDirection: 'column', // Stack items vertically
      justifyContent: 'space-between', // Space between items
      height: '87vh', // Full height of the viewport
      padding: '20px', // Optional padding
    }}>
      <div>
        <Text size="xl" weight={700}>{lesson.title}</Text>
        <Container>{lesson.content}</Container>
      </div>
      <Button
        variant="outline"
        style={{ 
          width: '100%', // Full width
          marginTop: '20px' // Space above the button
        }}
      >
        {t("planet.learningPage.next")}
      </Button>
    </Container>
  );
};

export default LearningPage;
