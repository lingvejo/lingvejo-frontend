'use client';
import { AppShell } from '@mantine/core';
import { useState } from 'react';
import { TopNavigation } from '@/components/core/navbar/TopNavigation';
import { useSwipeable } from 'react-swipeable';

interface SwipableAppShellProps {
    type: string;
    tabs: { label: string; content: React.ReactNode }[];
}

const SwipableAppShell: React.FC<SwipableAppShellProps> = ({ type, tabs }) => {
    const tabLabels = tabs.map(tab => tab.label);
    const [content, setContent] = useState(tabLabels[0]);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => setContent(getNextTab(content, tabLabels)),
        onSwipedRight: () => setContent(getPrevTab(content, tabLabels)),
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    return (
        <AppShell header={{ height: 50 }} padding="md">
            <TopNavigation type={type} content={content} setContent={setContent} />
            <AppShell.Main {...swipeHandlers} style={{ paddingTop: '60px', overflowX: 'hidden' }}>
                {tabs.find(tab => tab.label === content)?.content}
            </AppShell.Main>
        </AppShell>
    );
};

const getNextTab = (current: string, tabs: string[]) =>
    tabs[(tabs.indexOf(current) + 1) % tabs.length];

const getPrevTab = (current: string, tabs: string[]) =>
    tabs[(tabs.indexOf(current) - 1 + tabs.length) % tabs.length];

export default SwipableAppShell;
