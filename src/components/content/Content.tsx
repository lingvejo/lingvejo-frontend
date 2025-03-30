import Planet from '@/components/planet/Planet';

export const renderContent = (content: string) => {    switch (content) {
        case 'planet':
            return <Planet />;
        case 'trophy':
            return <div>Content for Trophy</div>;
        case 'user':
            return <div>Content for User</div>;
    }
};