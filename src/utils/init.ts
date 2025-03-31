import { settingsCollection } from './db';

export const initSettings = () => {
    localStorage.locale = 'en'
    localStorage.streak = 0,
    localStorage.pill = 5,
    localStorage.coin = 500,
    localStorage.planetLanguage = 'eo'
    localStorage.planetStep = 0
    localStorage.planetUnit = 1
    localStorage.planetLesson = 1
    localStorage.planetModule = 1
    localStorage.planetXpPerLesson = 40
};

export const init = () => {
    initSettings();
};