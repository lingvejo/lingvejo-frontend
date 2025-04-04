import { IconPlanet, IconTrophy, IconStar, IconMap,
    IconCompass, IconFlame, IconBox, IconPentagonNumber1,
    IconWand, IconSwords, IconUsers, IconChecklist,
    IconPencil, IconUserCircle, IconChartArrowsVertical,
    IconGalaxy, IconHammer, IconAffiliate } from '@tabler/icons-react';
import { ReactNode } from 'react';
import Planet from '@/components/planet/Planet';
import Leaderboard from '@/components/leaderboard/Leaderboard';
import Adventure from '@/components/planet/adventure/Adventure';
import Streak from '@/components/planet/streak/Streak';
import Profile from '@/components/profile/Profile';
import Inventory from '@/components/planet/inventory/Inventory';
import Map from '@/components/map/Map';
import League from '@/components/leaderboard/league/League';
import HallofLegends from '@/components/profile/hallOfLegends/HallOfLegends';
import Spells from '@/components/planet/spell/Spells';
import MultiplayerMode from '@/components/leaderboard/multiplayer/MultiplayerMode';
import Missions from '@/components/planet/mission/MissionsPage';
import Voyager from '@/components/profile/voyager/Voyager';
import VoyagersJournal from '@/components/profile/journal/VoyagersJournal';
import ProgressTracker from '@/components/profile/progress/ProgressTracker';
import GalaxyMap from '@/components/map/galaxy/GalaxyMap';
import Test from '../test/Test';
import Guild from '@/components/leaderboard/guild/Guild';

// Define the interface for each icon item
export interface ElementItem {
    icon: ReactNode;
    label: string;
    content: ReactNode;
}

export const bottom: ElementItem[] = [
    { icon: <IconPlanet />, label: 'planet', content: <Planet />},
    { icon: <IconStar />, label: 'profile', content: <Profile />},
    { icon: <IconUsers />, label: 'leaderboard', content: <Leaderboard />},
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
    { icon: <IconAffiliate />, label: 'guild', content: <Guild />},
    { icon: <IconSwords />, label: 'multiplayerMode', content: <MultiplayerMode />},
];

export const profile: ElementItem[] = [
    { icon: <IconChartArrowsVertical />, label: 'progress', content: <ProgressTracker />},
    { icon: <IconPentagonNumber1 />, label: 'HallofLegends', content: <HallofLegends /> },
    { icon: <IconPencil />, label: 'VoyagersJournal', content: <VoyagersJournal /> },
    { icon: <IconUserCircle />, label: 'user', content: <Voyager />},
];

export const map: ElementItem[] = [
    { icon: <IconGalaxy />, label: 'galaxy', content: <GalaxyMap />},
    { icon: <IconHammer />, label: "test", content: <Test /> },
];

const getContentByLabel = (data: { label: string; content: any }[], label: string) => 
  data.find(item => item.label === label)?.content;

export const getPlanetContentByLabel = (label: string) => getContentByLabel(planet, label);
export const getLeaderboardContentByLabel = (label: string) => getContentByLabel(leaderboard, label);
export const getProfileContentByLabel = (label: string) => getContentByLabel(profile, label);
