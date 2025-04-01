import { IconPlanet, IconTrophy, IconUser,
    IconLanguage, IconFlame, IconBox, IconStar } from '@tabler/icons-react';
import { ReactNode } from 'react';
import Planet from '@/components/planet/Planet';
import Leaderboard from '@/components/leaderboard/Leaderboard';
import Milestone from '@/components/planet/Milestone';
import Streak from '@/components/streak/Streak';
import Profile from '../profile/UserProfile';
import Dashboard from '@/components/inventory/Dashboard';
import IntroScene from '../intro/IntroScene';

// Define the interface for each icon item
export interface ElementItem {
    icon: ReactNode;
    label: string;
    content: ReactNode;
}

export const bottom: ElementItem[] = [
    { icon: <IconPlanet />, label: 'planet', content: <Planet />},
    { icon: <IconTrophy />, label: 'leaderboard', content: <Leaderboard />},
    { icon: <IconUser />, label: 'profile', content: <Profile />},
    { icon: <IconStar />, label: 'intro', content: <IntroScene />},
];

export const planet: ElementItem[] = [
    { icon: <IconLanguage />, label: 'language', content: <Milestone />},
    { icon: <IconFlame />, label: 'streak', content: <Streak />},
    { icon: <IconBox />, label: 'inventory', content: <Dashboard />},
    { icon: <IconStar />, label: 'achievements', content: <></> }, // New achievements section
];

export const getPlanetContentByLabel = (label: string) => {
    return planet.find(item => item.label === label)?.content;
}