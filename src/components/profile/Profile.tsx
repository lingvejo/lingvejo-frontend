'use client';
import { AppShell } from '@mantine/core';
import { useState } from 'react';
import { TopNavigation } from '@/components/core/TopNavigation';
import { getProfileContentByLabel } from '../content/NavigationElement';

const Profile = () => {
    const [content, setContent] = useState<string>('progress');

    return (
        <AppShell
            header={{ height: 50 }}
            padding="md"
        >
            <TopNavigation type="profile" content={content} setContent={setContent} />
            <AppShell.Main style={{ paddingTop: '60px' }}>
                {getProfileContentByLabel(content)}
            </AppShell.Main>
        </AppShell>
    );
};

export default Profile;
