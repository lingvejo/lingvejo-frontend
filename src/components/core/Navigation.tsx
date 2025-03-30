'use client';
import React, { useEffect, useState } from 'react';
import { Group, Stack, Text } from '@mantine/core';
import theme from '@/components/theme/Theme';
import { ElementItem } from '@/components/content/NavigationElement';
import { getSetting } from '@/utils/data';

// Define the props for the IconStack component
interface IconStackProps {
    type: string;
    icon: React.ReactNode; // Assuming icon is a React node (e.g., an SVG or JSX element)
    label: string;
    isSelected: boolean;
    onClick: () => void; // Function type for the click handler
}

// IconStack component
const IconStack: React.FC<IconStackProps> = ({ type, icon, label, isSelected, onClick }) => (
    <Stack
        h={type === "bottom" ? 60: 50}
        label={label}
        align='center'
        justify='center'
        gap={0}
        style={{
            color: isSelected ? theme.colors.primary : 'gray',
            cursor: 'pointer',
        }}
        onClick={onClick}
    >
        {type === "planet" ? (
            <Group spacing="xs">
                {icon}
                <Text size="sm">{getSetting(label)}</Text>
            </Group>
            ) : (
            icon
        )}
    </Stack>
);

// Define the props for the Navigation component
export interface NavigationProps {
    type: string;  // Navigation bar type
    content: string; // The current selected content label
    setContent: (label: string) => void; // Function to set the content
}

// Navigation component
export const Navigation: React.FC<NavigationProps> = ({ type, content, setContent }): JSX.Element => {
    const [icons, setIcons] = useState<ElementItem[]>([]); // State to hold icons

    useEffect(() => {
        const loadIcons = async () => {
            switch (type) {
                case "bottom":
                    const { bottom } = await import('@/components/content/NavigationElement');
                    setIcons(bottom);
                    break;
                case "planet":
                    const { planet } = await import('@/components/content/NavigationElement');
                    setIcons(planet);
                    break;
                default:
                    setIcons([]); // Handle default case
            }
        };

        loadIcons();
    }, [type]); // Run effect when type changes

    return (
        <Group grow gap={0}>
            {icons.map(({ icon, label }) => (
                <IconStack
                    type={type}
                    key={label}
                    icon={icon}
                    label={label}
                    isSelected={content === label}
                    onClick={() => setContent(label)}
                />
            ))}
        </Group>
    );
};
