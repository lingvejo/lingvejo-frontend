import { useState, useEffect } from 'react';
import { getModules } from '@/utils/data';
import { Container, Button, Title, Progress, Group, Stack } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import EditModeActions from './editor/EditModeActions';
import MarkdownRenderer from './renderer/MarkdownRenderer';
import CustomModuleRenderer from './renderer/CustomModuleRenderer';

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
  language: string;
  activeStep: number;
  activeUnit: number;
  activeLesson: number;
  activeModule: number;
  onComplete: () => void;
  setProgress: (progress: number) => void;
  isReviewMode: boolean;
}

const LearningPage: React.FC<LearningPageProps> = ({
  language,
  activeStep,
  activeUnit,
  activeLesson,
  activeModule,
  onComplete,
  setProgress,
  isReviewMode
}) => {
  const t = useTranslations();
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  const modules = getModules(language, activeStep, activeUnit, activeLesson);
  const currentModule = isReviewMode ? modules.flat() : modules[activeModule];

  const currentContent = currentModule && currentModule.length > 0 ? currentModule[currentContentIndex] : null;

  const setProgressBar = () => {
    if (currentModule) {
      setProgress(((currentContentIndex + 1) / currentModule.length) * 100);
    }
  };

  const handleNext = () => {
    if (currentContentIndex + 1 < (currentModule ? currentModule.length : 0)) {
      setCurrentContentIndex(currentContentIndex + 1);
      setProgressBar();
    } else {
      onComplete();
    }
  };

  useEffect(() => {
    setProgressBar();
  }, [currentContentIndex, activeModule]);

  return (
    <Container style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      height: '87vh', 
      padding: '20px', 
    }}>
      <div>
        {currentContent && (
          <Stack align="stretch" justify="space-around" gap="md">
            <Title order={3}>{currentContent.title}</Title>
            {currentContent.type === 'markdown' ? (
              <MarkdownRenderer content={currentContent.content} />
            ) : (
              <CustomModuleRenderer module={currentContent} />
            )}
          </Stack>
        )}
      </div>
      <EditModeActions 
        onEdit={() => console.log('Edit mode')} 
        onAdd={() => console.log('Add new module')} 
        onDelete={() => console.log('Delete module')} 
      />
      <Group position="apart" style={{ marginTop: '20px' }}>
        <Button
          variant="outline"
          style={{
            flex: 1,
            opacity: currentContentIndex === 0 ? 0.5 : 1
          }}
          onClick={() => {
            if (currentContentIndex > 0) {
              setCurrentContentIndex(currentContentIndex - 1);
            }
          }}
          disabled={currentContentIndex === 0}
        >
          <IconChevronLeft />
        </Button>
        <Button
          onClick={handleNext}
          disabled={!currentContent}
          autoFocus
          style={{
            flex: 1
          }}
        >
          <IconChevronRight />
        </Button>
      </Group>
    </Container>
  );
};

export default LearningPage;
