import { settingsCollection } from './db';

export const initSettings = () => {
    localStorage.locale = 'en'
    localStorage.streak = 0
    localStorage.pill = 5
    localStorage.coin = 500
    localStorage.language = 'eo'
    localStorage.planetStep = 0
    localStorage.planetUnit = 0
    localStorage.planetLesson = 0
    localStorage.planetModule = 0
    localStorage.planetXpPerLesson = 40
};

export const init = () => {
    initSettings();
};