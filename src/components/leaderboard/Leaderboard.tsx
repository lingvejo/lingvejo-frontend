'use client';
import { AppShell } from '@mantine/core';
import { useState } from 'react';
import { TopNavigation } from '@/components/core/TopNavigation';
import { getLeaderboardContentByLabel } from '../content/NavigationElement';

const Planet = () => {
    const [content, setContent] = useState<string>('league');

    return (
        <AppShell
            header={{ height: 50 }}
            padding="md"
        >
            <TopNavigation type="leaderboard" content={content} setContent={setContent} />
            <AppShell.Main style={{ paddingTop: '60px' }}>
                {getLeaderboardContentByLabel(content)}
            </AppShell.Main>
        </AppShell>
    );
};

export default Planet;
