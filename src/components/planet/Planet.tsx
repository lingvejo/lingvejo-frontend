'use client';
import { AppShell } from '@mantine/core';
import { useState } from 'react';
import { TopNavigation } from '../core/TopNavigation';

const Planet = () => {
    const [content, setContent] = useState<string>('language');

    return (
        <AppShell
            header={{ height: 50 }}
            padding="md"
        >
            <TopNavigation type="planet" content={content} setContent={setContent} />
            <AppShell.Main>Main</AppShell.Main>
        </AppShell>
    );
};

export default Planet;
