'use client';
import { AppShell } from '@mantine/core';
import { useState } from 'react';
import { TopNavigation } from '@/components/core/TopNavigation';
import Main from './Main';

const Planet = () => {
    const [content, setContent] = useState<string>('language');

    return (
        <AppShell
            header={{ height: 50 }}
            padding="md"
            style={{ height: '100vh' }} // Ensure AppShell takes full height
        >
            <TopNavigation type="planet" content={content} setContent={setContent} />
            <AppShell.Main style={{ paddingTop: '60px' }}> {/* Add padding to avoid overlap with UnitDisplayer */}
                <Main />
            </AppShell.Main>
        </AppShell>
    );
};

export default Planet;
