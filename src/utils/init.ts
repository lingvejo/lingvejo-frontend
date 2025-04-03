export const initSettings = () => {
    localStorage.setItem('locale', 'en');
    localStorage.setItem('isIntroFinished', 'true'); // DEBUG: auto finish intro
    localStorage.setItem('streak', JSON.stringify(0));
    localStorage.setItem('potion', JSON.stringify(5));
    localStorage.setItem('gold', JSON.stringify(500));
    localStorage.setItem('language', "23");
    localStorage.setItem('planetStep', "4");
    localStorage.setItem('planetUnit', JSON.stringify(0));
    localStorage.setItem('planetLesson', JSON.stringify(0));
    localStorage.setItem('planetModule', JSON.stringify(0));
    localStorage.setItem('planetXpPerLesson', JSON.stringify(40));
};


export const init = () => {
    initSettings();
};