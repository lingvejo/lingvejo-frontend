import { IconPlanet, IconTrophy, IconUser,
    IconLanguage, IconFlame, IconPill, IconCoins } from '@tabler/icons-react';
import { ReactNode } from 'react';
import Planet from '@/components/planet/Planet';

// Define the interface for each icon item
export interface ElementItem {
    icon: ReactNode;
    label: string;
    content: ReactNode;
}

export const bottom: ElementItem[] = [
    { icon: <IconPlanet />, label: 'planet', content: <Planet />},
    { icon: <IconTrophy />, label: 'trophy', content: <>trophy</>},
    { icon: <IconUser />, label: 'user', content: <>user</>},
];

export const planet: ElementItem[] = [
    { icon: <IconLanguage />, label: 'language', content: <>1</>},
    { icon: <IconFlame />, label: 'streak', content: <>2</>},
    { icon: <IconPill />, label: 'pill', content: <>3</>},
    { icon: <IconCoins />, label: 'coin', content: <>4</>},
];