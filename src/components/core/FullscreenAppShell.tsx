'use client';
import { AppShell } from '@mantine/core';
import { useState } from 'react';
import { BottomNavigation } from './BottomNavigation';
import { renderContent } from '@/components/content/ContentRender';

export default function FullscreenAppShell() {
    const [content, setContent] = useState<string>('planet');

    return (
        <AppShell padding="md">
            <AppShell.Main>{renderContent(content)}</AppShell.Main>
            <BottomNavigation type="bottom" content={content} setContent={setContent} />
        </AppShell>
    );
}
