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

    // DEBUG: disable swipe
    const swipeHandlers = useSwipeable({});
    // const swipeHandlers = useSwipeable({
    //     onSwipedLeft: () => setContent(getNextTab(content, tabLabels)),
    //     onSwipedRight: () => setContent(getPrevTab(content, tabLabels)),
    //     preventScrollOnSwipe: true,
    //     trackMouse: true
    // });

    return (
        <AppShell
            header={{ height: 50 }}
            padding={{ top: 'md', bottom: 'md', left: 0, right: 0 }}
        >
            <TopNavigation type={type} content={content} setContent={setContent} />
            <AppShell.Main {...swipeHandlers} style={{ overflowX: 'hidden' }}>
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
