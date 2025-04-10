'use client';
import React, { useState } from 'react';
import { Group, Stack } from '@mantine/core';
import theme from '@/components/theme/Theme';
import * as NavigationElement from '@/components/content/NavigationElement'; // Import everything as an object

// Extract available navigation types dynamically
type NavigationType = keyof typeof NavigationElement;

// IconStack component
interface IconStackProps {
    type: string;
    icon: React.ReactNode;
    label: string;
    isSelected: boolean;
    onClick: () => void;
}

const IconStack: React.FC<IconStackProps> = ({ type, icon, label, isSelected, onClick }) => (
    <Stack
        h={type === "bottom" ? 60 : 50}
        align="center"
        justify="center"
        gap={0}
        style={{
            color: isSelected ? theme.colors.primary : 'gray',
            cursor: 'pointer',
        }}
        onClick={onClick}
    >
        {icon}
    </Stack>
);

// Navigation component
interface NavigationProps {
    type: NavigationType;
    content: string;
    setContent: (label: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ type, content, setContent }) => {
    const icons = NavigationElement[type] || []; // Dynamically fetch icons based on `type`

    const handleIconClick = (label: string) => {
        setContent(label);
    };

    return (
        <Group grow gap={0}>
            {icons.map(({ icon, label }) => (
                <IconStack
                    key={label}
                    type={type}
                    icon={icon}
                    label={label}
                    isSelected={content === label}
                    onClick={() => handleIconClick(label)}
                />
            ))}
        </Group>
    );
};
