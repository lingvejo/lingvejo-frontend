import { useState, useEffect } from 'react';
import { getModules } from '@/utils/data/queries/getModules';
import { Container, Button, Title, Progress, Group, Stack, Loader, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import EditModeActions from './editor/EditModeActions';
import MarkdownRenderer from './renderer/MarkdownRenderer';
import CustomModuleRenderer from './renderer/CustomModuleRenderer';
import { handleError } from '@/utils/data';

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
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [modules, setModules] = useState<any[]>([]); // Modules state

  // Fetch modules inside useEffect to trigger on component mount
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const fetchedModules = await getModules(language, activeStep, activeUnit, activeLesson);
        setModules(fetchedModules); // Set modules to state
        setCurrentContentIndex(0); // Reset content index on successful fetch
        setLoading(false); // Stop loading
      } catch (error) {
        handleError(error); // Handle error using existing error handler
        setError('Failed to load content, please try again.'); // Display error message
        setLoading(false); // Stop loading on error
      }
    };

    fetchModules();
  }, [language, activeStep, activeUnit, activeLesson]);

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

  // Show loading screen or error message
  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '87vh' }}>
        <Loader size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '87vh' }}>
        <Text color="red">{error}</Text>
      </Container>
    );
  }

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '87vh',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div>
        {currentContent && (
          <Stack align="stretch" justify="space-around" gap="md">
            <Title order={3}>{currentContent.title}</Title>
            {currentContent.type === 'markdown' ? (
              <MarkdownRenderer content={currentContent.content} />
            ) : currentContent.type === 'custom' ? (
              <CustomModuleRenderer module={currentContent} />
            ) : (
              <div>Module type not supported</div>
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
            opacity: currentContentIndex === 0 ? 0.5 : 1,
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
            flex: 1,
          }}
        >
          <IconChevronRight />
        </Button>
      </Group>
    </Container>
  );
};

export default LearningPage;
