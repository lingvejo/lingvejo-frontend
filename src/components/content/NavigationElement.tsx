import { IconPlanet, IconTrophy, IconUser,
    IconLanguage, IconFlame, IconPill, IconCoins } from '@tabler/icons-react';
import { ReactNode } from 'react';

// Define the interface for each icon item
export interface ElementItem {
    icon: ReactNode; // The icon can be a React node (e.g., JSX element)
    label: string;   // The label is a string
}

export const bottom: ElementItem[] = [
    { icon: <IconPlanet />, label: 'planet'},
    { icon: <IconTrophy />, label: 'trophy'},
    { icon: <IconUser />, label: 'user'},
];

export const planet: ElementItem[] = [
    { icon: <IconLanguage />, label: 'language'},
    { icon: <IconFlame />, label: 'streak'},
    { icon: <IconPill />, label: 'pill'},
    { icon: <IconCoins />, label: 'coin'},
];