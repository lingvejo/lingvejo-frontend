'use client';
import { AppShell, Container, Stack } from '@mantine/core';
import { useState } from 'react';
import { BottomNavigation } from './navbar/BottomNavigation';
import { renderContent } from '@/components/content/ContentRender';
import { useVoyager } from '@/contexts/VoyagerContext'; // Adjust path if needed
import LoadingScreen from '@/components/core/loading/LoadingScreen'; // Optional
import { markTutorialComplete } from '@/utils/data/mutations/markTutorialComplete';
import TutorialScene from '@/components/tutorial/TutorialScene';

export default function FullscreenAppShell() {
  const { voyager, loading } = useVoyager();
  const [content, setContent] = useState<string>('planet');

  if (loading) {
    return <LoadingScreen />;
  }

  const completedTutorial = voyager?.completedTutorial === true;

  const handleTutorialComplete = async () => {
    if (voyager?.uid) {
      const success = await markTutorialComplete(voyager?.uid);
      if (success) {
        location.reload(); // Simplest way to re-fetch context
      }
    }
  };

  return (
    <AppShell
      padding={0}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {completedTutorial ? (
        <>
          <AppShell.Main
            style={{
              paddingTop: 20,
              paddingBottom: 40,
              flex: 1,
              overflowY: 'auto',
            }}
          >
            <Container fluid px={0}>
              <Stack spacing="md">{renderContent(content)}</Stack>
            </Container>
          </AppShell.Main>
          <BottomNavigation type="bottom" content={content} setContent={setContent} />
        </>
      ) : (
        <TutorialScene onComplete={handleTutorialComplete} />
      )}
    </AppShell>
  );
}
