import { IconPlanet, IconTrophy, IconUser } from '@tabler/icons-react';

export const icons = [
    { icon: <IconPlanet />, label: 'planet'},
    { icon: <IconTrophy />, label: 'trophy'},
    { icon: <IconUser />, label: 'user'},
];

export const renderContent = (content: string | null) => {    switch (content) {
        case 'planet':
            return <div>Content for ddPlanet</div>;
        case 'trophy':
            return <div>Content for Trophy</div>;
        case 'user':
            return <div>Content for User</div>;
    }
};