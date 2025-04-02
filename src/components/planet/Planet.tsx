'use client';
import { AppShell } from '@mantine/core';
import { useState } from 'react';
import { TopNavigation } from '@/components/core/TopNavigation';
import { getPlanetContentByLabel } from '../content/NavigationElement';

const Planet = () => {
    const [content, setContent] = useState<string>('adventure');

    return (
        <AppShell
            header={{ height: 50 }}
            padding="md"
        >
            <TopNavigation type="planet" content={content} setContent={setContent} />
            <AppShell.Main style={{ paddingTop: '60px' }}>
                {getPlanetContentByLabel(content)}
            </AppShell.Main>
        </AppShell>
    );
};

export default Planet;
