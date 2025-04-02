'use client';
import { AppShell } from '@mantine/core';
import { Navigation, NavigationProps } from '../Navigation';

export function TopNavigation({ type, content, setContent }: NavigationProps): JSX.Element {
    return (
        <AppShell.Header>
            <Navigation type={type} content={content} setContent={setContent} />
        </AppShell.Header>
    );
}