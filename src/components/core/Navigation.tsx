'use client';
import React, { useEffect, useState } from 'react';
import { Group, Stack, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import theme from '@/components/theme/Theme';
import { ElementItem } from '@/components/content/NavigationElement';
import { Drawer } from './Drawer';
import { renderDrawer } from '../content/ContentRender';

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
        h={type === "bottom" ? 60 : 50}
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
        {icon}
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
    const [drawerOpened, setDrawerOpened] = useState(false); // State to control drawer visibility
    const [drawerTitle, setDrawerTitle] = useState(''); // State for drawer title

    const t = useTranslations();

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
                case "leaderboard":
                    const { leaderboard } = await import('@/components/content/NavigationElement');
                    setIcons(leaderboard);
                    break;
                case "profile":
                    const { profile } = await import('@/components/content/NavigationElement');
                    setIcons(profile);
                    break;
                default:
                    setIcons([]); // Handle default case
            }
        };

        loadIcons();
    }, [type]); // Run effect when type changes

    const handleIconClick = (label: string) => {
        setContent(label);
        setDrawerTitle(label);        
        // if (type !== "bottom") {
        //     setDrawerOpened(true); // Open the drawer if type is not "bottom"
        // }
    };

    return (
        <>
            <Group grow gap={0}>
                {icons.map(({ icon, label }) => (
                    <IconStack
                        type={type}
                        key={label}
                        icon={icon}
                        label={label}
                        isSelected={content === label}
                        onClick={() => handleIconClick(label)}
                    />
                ))}
            </Group>
            <Drawer
                drawerOpened={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                title={drawerTitle ? t(`${type}.${drawerTitle}`) : ''}
                content={drawerTitle ? renderDrawer(drawerTitle) : ''}
            />
        </>
    );
};
