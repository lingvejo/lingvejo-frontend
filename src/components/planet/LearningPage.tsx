import { useState } from 'react';
import { getModules, getSetting } from '@/utils/data';
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
  language: string,
  activeStep: number,
  activeUnit: number,
  activeLesson: number,
  onComplete: () => void // New prop for completion callback
}

const LearningPage: React.FC<LearningPageProps> = ({
  language, activeStep, activeUnit, activeLesson, onComplete
}) => {
  const t = useTranslations();
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  const modules = getModules(language, activeStep, activeUnit, activeLesson);  
  const currentContent = modules.contents[currentContentIndex];

  const handleNext = () => {    
    if (currentContentIndex < modules.contents.length - 1) {
      setCurrentContentIndex(currentContentIndex + 1);
    } else {
      // Call the onComplete function when finished
      const haveErrors = false;
      if (haveErrors) {

      } else onComplete();
    }
  };

  return (
    <Container style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      height: '87vh', 
      padding: '20px', 
    }}>
      <div>
        <Text size="xl" weight={700}>{modules.title}</Text>
        <Container>
          <Text size="lg" weight={500}>{currentContent.title}</Text>
          <Text>{currentContent.content}</Text>
        </Container>
      </div>
      <Button
        variant="outline"
        style={{ 
          width: '100%', 
          marginTop: '20px' 
        }}
        onClick={handleNext}
      >
        {t("planet.learningPage.next")}
      </Button>
    </Container>
  );
};

export default LearningPage;
