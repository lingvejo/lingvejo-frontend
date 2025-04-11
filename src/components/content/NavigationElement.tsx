import { IconPlanet, IconTrophy, IconStar, IconMap,
    IconCompass, IconFlame, IconShoppingCart, IconPentagonNumber1,
    IconWand, IconSwords, IconUsers, IconChecklist,
    IconPencil, IconUserCircle, IconComet,
    IconGalaxy, IconHammer, IconAffiliate } from '@tabler/icons-react';
import { ReactNode } from 'react';
import Planet from '@/components/planet/Planet';
import Leaderboard from '@/components/leaderboard/Leaderboard';
import Streak from '@/components/planet/streak/Streak';
import Profile from '@/components/profile/Profile';
import ArcaneExchange from '@/components/planet/arcaneExchange/ArcaneExchange';
import Map from '@/components/map/Map';
import League from '@/components/leaderboard/league/League';
import HallofLegends from '@/components/profile/hallOfLegends/HallOfLegends';
import MultiplayerMode from '@/components/leaderboard/multiplayer/MultiplayerMode';
import DailyMissions from '@/components/planet/dailyMissions/DailyMissions';
import Voyager from '@/components/profile/voyager/Voyager';
import Journal from '@/components/profile/journal/Journal';
import AdventureLog from '@/components/map/adventureLog/AdventureLog';
import GalaxyMap from '@/components/map/galaxyMap/GalaxyMap';
import Test from '../test/Test';
import Guild from '@/components/leaderboard/guild/Guild';
import WorldExplorer from '@/components/planet/adventure/WorldExplorer';

// Define the interface for each icon item
export interface ElementItem {
    icon: ReactNode;
    label: string;
    content: ReactNode;
}

export const bottom: ElementItem[] = [
    { icon: <IconPlanet />, label: 'planet', content: <Planet />},
    { icon: <IconMap />, label: 'map', content: <Map />},
    { icon: <IconUsers />, label: 'leaderboard', content: <Leaderboard />},
    { icon: <IconStar />, label: 'profile', content: <Profile />},
];

export const map: ElementItem[] = [
    { icon: <IconComet />, label: 'AdventureLog', content: <AdventureLog />},
    { icon: <IconGalaxy />, label: 'galaxy', content: <GalaxyMap />},
    { icon: <IconHammer />, label: "test", content: <Test /> },
];

export const planet: ElementItem[] = [
    { icon: <IconCompass />, label: 'WorldExplorer', content: <WorldExplorer />},
    { icon: <IconFlame />, label: 'Streak', content: <Streak />},
    { icon: <IconChecklist />, label: 'DailyMissions', content: <DailyMissions />},
    { icon: <IconShoppingCart />, label: 'ArcaneExchange', content: <ArcaneExchange />},
];

export const profile: ElementItem[] = [
    { icon: <IconPencil />, label: 'Journal', content: <Journal /> },
    { icon: <IconPentagonNumber1 />, label: 'HallofLegends', content: <HallofLegends /> },
    { icon: <IconUserCircle />, label: 'Voyager', content: <Voyager />},
];

export const leaderboard: ElementItem[] = [
    { icon: <IconTrophy />, label: 'league', content: <League />},
    { icon: <IconAffiliate />, label: 'guild', content: <Guild />},
    { icon: <IconSwords />, label: 'multiplayerMode', content: <MultiplayerMode />},
];

const getContentByLabel = (data: { label: string; content: any }[], label: string) => 
  data.find(item => item.label === label)?.content;

export const getPlanetContentByLabel = (label: string) => getContentByLabel(planet, label);
export const getLeaderboardContentByLabel = (label: string) => getContentByLabel(leaderboard, label);
export const getProfileContentByLabel = (label: string) => getContentByLabel(profile, label);
