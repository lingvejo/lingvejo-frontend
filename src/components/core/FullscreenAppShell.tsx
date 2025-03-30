'use client';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react'; // Import useState from React
import { BottomNavigation } from './BottomNavigation';
import { renderContent } from './Content';

export default function FullscreenAppShell() {
    const [opened, { toggle }] = useDisclosure();
    const [content, setContent] = useState<string | null>('planet'); // Set default to 'planet'

    return (
        <AppShell
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
            <AppShell.Main>{renderContent(content)}</AppShell.Main>
            <BottomNavigation content={content} setContent={setContent} />
        </AppShell>
    );
}
