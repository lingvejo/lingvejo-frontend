'use client';
import { AppShell, Container, Stack } from '@mantine/core';
import { useState, useEffect } from 'react';
import { BottomNavigation } from './navbar/BottomNavigation';
import { renderContent } from '@/components/content/ContentRender';
import { getSetting } from '@/utils/data'; // Assuming you have getSetting/setSetting functions
import IntroScene from '@/components/intro/IntroScene'; // Import the IntroScene component
import Test from '../test/Test';

export default function FullscreenAppShell() {
    const [content, setContent] = useState<string>('planet');
    const [isIntroFinished, setIsIntroFinished] = useState<boolean>(false);

    // Check if the intro has been completed
    useEffect(() => {
        const introStatus = getSetting("isIntroFinished"); // Fetch the setting for intro
        setIsIntroFinished(introStatus === "true"); // Convert the string to boolean
    }, []);

    return (
        <AppShell
            padding={0}
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                overflow: 'hidden', // Prevents the overall scrollbar from appearing
            }}
        >
            {/* Conditionally render either the IntroScene or the Main AppShell */}
            {!isIntroFinished ? (
                <>
                    <AppShell.Main
                        style={{
                            paddingTop: 20, // Adjust space at the top of the page
                            paddingBottom: 40, // Adjust space at the bottom to make room for BottomNavigation
                            flex: 1,
                            overflowY: 'auto', // Allows scrolling if content exceeds the screen
                        }}
                    >
                        <Container>
                            <Stack spacing="md">
                                {renderContent(content)}
                            </Stack>
                        </Container>
                    </AppShell.Main>
                    <BottomNavigation type="bottom" content={content} setContent={setContent} />
                </>
            ) : (
                // <IntroScene onComplete={() => setIsIntroFinished(true)} />
                // DEBUG: Add test component to load at start
                // isIntroFinished is flopped
                <Test />
            )}
        </AppShell>
    );
}
