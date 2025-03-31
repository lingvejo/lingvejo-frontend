import { bottom, planet } from './NavigationElement';

export const renderContent = (label: string) => {
    const item = bottom.find((element) => element.label === label);
    return item ? item.content : undefined; // Return the content if found, otherwise return undefined
};

export const renderDrawer = (label: string) => {
    const item = planet.find((element) => element.label === label);
    return item ? item.content : undefined; // Return the content if found, otherwise return undefined
};