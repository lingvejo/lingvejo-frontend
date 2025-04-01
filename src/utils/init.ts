import { settingsCollection } from './db';

export const initSettings = () => {
    localStorage.setItem('locale', 'en');
    localStorage.setItem('isIntroFinished', 'false');
    localStorage.setItem('streak', JSON.stringify(0));
    localStorage.setItem('potion', JSON.stringify(5));
    localStorage.setItem('gold', JSON.stringify(500));
    localStorage.setItem('language', 'eo');
    localStorage.setItem('planetStep', JSON.stringify(0));
    localStorage.setItem('planetUnit', JSON.stringify(0));
    localStorage.setItem('planetLesson', JSON.stringify(0));
    localStorage.setItem('planetModule', JSON.stringify(0));
    localStorage.setItem('planetXpPerLesson', JSON.stringify(40));
};


export const init = () => {
    initSettings();
};