import { IconPlanet, IconTrophy, IconStar, IconMap,
    IconCompass, IconFlame, IconBox, IconPentagonNumber1,
    IconWand, IconSwords, IconUsers, IconChecklist,
    IconPencil, IconUserCircle, IconChartArrowsVertical, IconGalaxy } from '@tabler/icons-react';
import { ReactNode } from 'react';
import Planet from '@/components/planet/Planet';
import Leaderboard from '@/components/leaderboard/Leaderboard';
import Adventure from '@/components/planet/adventure/Milestone';
import Streak from '@/components/planet/streak/Streak';
import Profile from '@/components/profile/Profile';
import Inventory from '@/components/planet/inventory/Inventory';
import Map from '@/components/map/Map';
import League from '@/components/leaderboard/league/League';
import MysticalTrophies from '@/components/profile/trophy/MysticalTrophies';
import Spells from '@/components/planet/spell/Spells';
import MultiplayerMode from '@/components/leaderboard/multiplayer/MultiplayerMode';
import Missions from '@/components/planet/mission/MissionsPage';
import UserProfile from '@/components/profile/user/UserProfile';
import LanguageJournal from '@/components/profile/journal/LanguageJournal';
import ProgressTracker from '@/components/profile/progress/ProgressTracker';
import Galaxy from '@/components/map/galaxy/Galaxy';

// Define the interface for each icon item
export interface ElementItem {
    icon: ReactNode;
    label: string;
    content: ReactNode;
}

export const bottom: ElementItem[] = [
    { icon: <IconPlanet />, label: 'planet', content: <Planet />},
    { icon: <IconUsers />, label: 'leaderboard', content: <Leaderboard />},
    { icon: <IconStar />, label: 'profile', content: <Profile />},
    { icon: <IconMap />, label: 'map', content: <Map />},
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
    { icon: <IconChartArrowsVertical />, label: 'progress', content: <ProgressTracker />},
    { icon: <IconPentagonNumber1 />, label: 'mysticalTrophies', content: <MysticalTrophies /> },
    { icon: <IconPencil />, label: 'languageJournal', content: <LanguageJournal /> },
    { icon: <IconUserCircle />, label: 'user', content: <UserProfile />},
];

export const map: ElementItem[] = [
    { icon: <IconGalaxy />, label: 'galaxy', content: <Galaxy />},
    { icon: <IconSwords />, label: 'multiplayerMode', content: <MultiplayerMode />},
];

export const getPlanetContentByLabel = (label: string) => planet.find(item => item.label === label)?.content;
export const getLeaderboardContentByLabel = (label: string) => leaderboard.find(item => item.label === label)?.content;
export const getProfileContentByLabel = (label: string) => profile.find(item => item.label === label)?.content;