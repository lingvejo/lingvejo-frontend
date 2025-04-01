import { useState } from 'react';
import { getModules, getSetting } from '@/utils/data';
import { Container, Button, Text, Progress } from '@mantine/core';
import { useTranslations } from 'next-intl';


interface LearningPageTitleProps {
  progress: number;
}

export const LearningPageTitle: React.FC<LearningPageTitleProps> = ({ progress }) => {
  return (
    <div style={{ width: '85vw' }}>
      <Progress value={progress} />
    </div>
  );
};

interface LearningPageProps {
  language: string,
  activeStep: number,
  activeUnit: number,
  activeLesson: number,
  activeModule: number,
  onComplete: () => void,
  setProgress: (progress: number) => void
}

const LearningPage: React.FC<LearningPageProps> = ({
  language,
  activeStep,
  activeUnit,
  activeLesson,
  activeModule,
  onComplete,
  setProgress
}) => {
  const t = useTranslations();
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  const modules = getModules(language, activeStep, activeUnit, activeLesson);  
  const currentContent = modules[activeModule][currentContentIndex];
  const setProgressBar = () => setProgress((currentContentIndex + 1) / modules[activeModule].length * 100);

  const handleNext = () => {    
    if ((currentContentIndex + 1) < modules[activeModule].length) {
      setCurrentContentIndex(currentContentIndex + 1);
      setProgressBar();
    } else {
      const haveErrors = false;
      if (haveErrors) {

      } else onComplete();
    }
  };

  setProgressBar();

  return (
    <Container style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      height: '87vh', 
      padding: '20px', 
    }}>
      <div>
        <Text size="lg" weight={500}>{currentContent.title}</Text>
        <Text>{currentContent.content}</Text>
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
