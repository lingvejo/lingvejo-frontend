'use client';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { BottomNavigation } from './BottomNavigation';
import { renderContent } from '@/components/content/Content';

export default function FullscreenAppShell() {
    const [opened, { toggle }] = useDisclosure();
    const [content, setContent] = useState<string>('planet');

    return (
        <AppShell padding="md">
            <AppShell.Main>{renderContent(content)}</AppShell.Main>
            <BottomNavigation type="bottom" content={content} setContent={setContent} />
        </AppShell>
    );
}
