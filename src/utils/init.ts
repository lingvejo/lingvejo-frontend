import { settingsCollection } from './db';

export const initSettings = () => {
    if (settingsCollection.find({})?.length === 0) {
        settingsCollection.insert({
            locale: 'en',  // app language
            language: 'eo',  // learning language
            step: 0, // step of learning
            streak: 0,
            pill: 5,
            coin: 500
        });
    }
};

export const init = () => {
    initSettings();
};