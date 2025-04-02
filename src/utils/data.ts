// import { settingsCollection } from "./db";
import { esperanto } from './esperanto';
import { leaderboard } from './leaderboard';

export const setSetting = (label: string, value: any) => {
  if (typeof window !== 'undefined' && window.localStorage) {
      // Store the value as a string
      localStorage[label] = value // Convert to string
  }
};

export const getSetting = (label: string) => {
  if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage[label]; // No parsing needed
  }
};

export const getStep = (language: string, step: number) => {
  try {
    if (language === 'eo') return esperanto[step];
  } catch (error) {
    console.error("Error fetching step:", error);
    // Return a default object in case of an error
    return { title: "", description: "", units: [] };
  }
};

export const getCourse = (language: string) => {
  return esperanto;
}

export const getUnit = (language: string, step: number, unit: number) => {
  return esperanto[step].units[unit];
}

export const getLessonTitle = (language: string, step: number, unit: number, lesson: number) => {
  try {
    return esperanto[step].units[unit].lessons[lesson].title;
  } catch (e) {
    return '';
  }
}

export const getModules = (language: string, step: number, unit: number, lesson: number) => {
  try {
    return esperanto[step].units[unit].lessons[lesson].modules;
  } catch (e) {
    return [];
  }
}

export const getLeaderboardData = () => leaderboard;

export const getGalaxy = () => [
  {
    systemName: 'English',
    planets: [
      {
        name: 'Esperanto',
        iso: 'eo',
        discovered: { date: '2023-01-01', by: 'Astral Cartographer' },
        lastObserved: { date: '2023-10-01', by: 'Celestial Archivist' },
        adventurers: 320,
        wizards: 15,
      },
      {
        name: 'Toki Pona',
        iso: 'tok',
        discovered: { date: '2023-02-15', by: 'Galactic Explorer' },
        lastObserved: { date: '2023-09-20', by: 'Stellar Navigator' },
        adventurers: 150,
        wizards: 5,
      },
    ],
  },
  {
    systemName: 'Esperanto',
    planets: [
      {
        name: 'Angla',
        iso: 'en',
        discovered: { date: '2023-03-01', by: 'Celestial Scholar' },
        lastObserved: { date: '2023-10-05', by: 'Astral Observer' },
        adventurers: 410,
        wizards: 22,
      },
      {
        name: 'Tokipona',
        iso: 'tok',
        discovered: { date: '2023-04-10', by: 'Cosmic Voyager' },
        lastObserved: { date: '2023-09-15', by: 'Ethereal Watcher' },
        adventurers: 120,
        wizards: 8,
      },
    ],
  },
  {
    systemName: 'Toki Pona',
    planets: [
      {
        name: 'Toki Inli',
        iso: 'en',
        discovered: { date: '2023-05-05', by: 'Interstellar Traveler' },
        lastObserved: { date: '2023-10-10', by: 'Lunar Guardian' },
        adventurers: 280,
        wizards: 18,
      },
      {
        name: 'Toki Epelanto',
        iso: 'eo',
        discovered: { date: '2023-06-15', by: 'Galactic Sage' },
        lastObserved: { date: '2023-09-30', by: 'Astronomical Scholar' },
        adventurers: 90,
        wizards: 6,
      },
    ],
  },
];
