'use client';
import { AppShell } from '@mantine/core';
import { useState, useEffect } from 'react';
import { BottomNavigation } from './NavigationBar/BottomNavigation';
import { renderContent } from '@/components/content/ContentRender';
import { getSetting } from '@/utils/data'; // Assuming you have getSetting/setSetting functions
import IntroScene from '@/components/intro/IntroScene'; // Import the IntroScene component

export default function FullscreenAppShell() {
    const [content, setContent] = useState<string>('planet');
    const [isIntroFinished, setIsIntroFinished] = useState<boolean>(false);

    // Check if the intro has been completed
    useEffect(() => {
        const introStatus = getSetting("isIntroFinished"); // Fetch the setting for intro
        setIsIntroFinished(introStatus === "true"); // Convert the string to boolean
    }, []);

    return (
        <AppShell padding="md">
            {/* Conditionally render either the IntroScene or the Main AppShell */}
            {isIntroFinished ? (
                <>
                    <AppShell.Main>{renderContent(content)}</AppShell.Main>
                    <BottomNavigation type="bottom" content={content} setContent={setContent} />
                </>
            ) : (
                <IntroScene onComplete={() => setIsIntroFinished(true)} />
            )}
        </AppShell>
    );
}
