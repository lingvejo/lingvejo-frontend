import { IconPlanet, IconTrophy, IconUser, IconMap,
    IconCompass, IconFlame, IconBox, IconPentagonNumber1,
    IconWand, IconSwords, IconStar, IconChecklist,
    IconPencil } from '@tabler/icons-react';
import { ReactNode } from 'react';
import Planet from '@/components/planet/Planet';
import Leaderboard from '@/components/leaderboard/Leaderboard';
import Adventure from '@/components/planet/adventure/Milestone';
import Streak from '@/components/planet/streak/Streak';
import Profile from '@/components/profile/Profile';
import Inventory from '@/components/planet/inventory/Inventory';
import WorldMap from '@/components/worldmap/WorldMap';
import League from '@/components/leaderboard/league/League';
import MysticalTrophies from '@/components/profile/trophy/MysticalTrophies';
import Spells from '../planet/spell/Spells';
import MultiplayerMode from '../leaderboard/multiplayer/MultiplayerMode';
import Missions from '../planet/mission/MissionsPage';
import UserProfile from '../profile/user/UserProfile';
import LanguageJournal from '../profile/journal/LanguageJournal';

// Define the interface for each icon item
export interface ElementItem {
    icon: ReactNode;
    label: string;
    content: ReactNode;
}

export const bottom: ElementItem[] = [
    { icon: <IconPlanet />, label: 'planet', content: <Planet />},
    { icon: <IconStar />, label: 'leaderboard', content: <Leaderboard />},
    { icon: <IconUser />, label: 'profile', content: <Profile />},
    { icon: <IconMap />, label: 'worldmap', content: <WorldMap />},
];

export const planet: ElementItem[] = [
    { icon: <IconCompass />, label: 'adventure', content: <Adventure />},
    { icon: <IconFlame />, label: 'streak', content: <Streak />},
    { icon: <IconChecklist />, label: 'mission', content: <Missions />},
    { icon: <IconWand />, label: 'spell', content: <Spells />},
    { icon: <IconBox />, label: 'inventory', content: <Inventory />},
];

export const leaderboard: ElementItem[] = [
    { icon: <IconTrophy />, label: 'league', content: <League />},
    { icon: <IconSwords />, label: 'multiplayerMode', content: <MultiplayerMode />},
];

export const profile: ElementItem[] = [
    { icon: <IconTrophy />, label: 'user', content: <UserProfile />},
    { icon: <IconPentagonNumber1 />, label: 'mysticalTrophies', content: <MysticalTrophies /> },
    { icon: <IconPencil />, label: 'languageJournal', content: <LanguageJournal /> },
];

export const getPlanetContentByLabel = (label: string) => planet.find(item => item.label === label)?.content;
export const getLeaderboardContentByLabel = (label: string) => leaderboard.find(item => item.label === label)?.content;
export const getProfileContentByLabel = (label: string) => profile.find(item => item.label === label)?.content;