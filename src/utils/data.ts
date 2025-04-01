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