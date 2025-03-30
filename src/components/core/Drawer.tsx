'use client';
import React from 'react';
import { Drawer as MantineDrawer } from '@mantine/core';

interface DrawerProps {
    drawerOpened: boolean; // Controls whether the drawer is open
    onClose: () => void; // Function to close the drawer
    title: string; // Title of the drawer
    content: React.ReactNode; // Content to be displayed inside the drawer
}

// Drawer component
export function Drawer({ drawerOpened, onClose, title, content }: DrawerProps) {
    return (
        <MantineDrawer
            opened={drawerOpened}
            onClose={onClose}
            title={title}
            padding="md"
            size="lg"
            position="top"
        >
            {content}
        </MantineDrawer>
    );
}