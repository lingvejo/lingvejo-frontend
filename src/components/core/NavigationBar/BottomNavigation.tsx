'use client';
import { AppShell } from '@mantine/core';
import { Navigation, NavigationProps } from '../Navigation';

export function BottomNavigation({ type, content, setContent }: NavigationProps): JSX.Element {
    return (
        <AppShell.Footer>
            <Navigation type={type} content={content} setContent={setContent} />
        </AppShell.Footer>
    );
}