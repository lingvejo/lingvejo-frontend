import { IconPlanet, IconTrophy, IconUser,
    IconLanguage, IconFlame, IconPill, IconCoins } from '@tabler/icons-react';
import { ReactNode } from 'react';
import Planet from '@/components/planet/Planet';
import Leaderboard from '@/components/leaderboard/Leaderboard';
import Milestone from '@/components/planet/Milestone';
import Streak from '@/components/streak/Streak';
import UserProfile from '../profile/UserProfile';

// Define the interface for each icon item
export interface ElementItem {
    icon: ReactNode;
    label: string;
    content: ReactNode;
}

export const bottom: ElementItem[] = [
    { icon: <IconPlanet />, label: 'planet', content: <Planet />},
    { icon: <IconTrophy />, label: 'leaderboard', content: <Leaderboard />},
    { icon: <IconUser />, label: 'profile', content: <UserProfile />},
];

export const planet: ElementItem[] = [
    { icon: <IconLanguage />, label: 'language', content: <Milestone />},
    { icon: <IconFlame />, label: 'streak', content: <Streak />},
    { icon: <IconPill />, label: 'pill', content: <>3</>},
    { icon: <IconCoins />, label: 'coin', content: <>4</>},
];

export const getPlanetContentByLabel = (label: string) => {
    return planet.find(item => item.label === label)?.content;
}