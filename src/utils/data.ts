// import { settingsCollection } from "./db";
import { esperanto } from './esperanto';

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
  if (language === 'eo' && step >= 0 && step < esperanto.length) {
      return esperanto[step];
  }
  return null; // or handle the error appropriately
};

export const getUnit = (language: string, step: number, unit: number) => {
  return esperanto[step].units[unit];
}

export const getLessonTitle = (language: string, step: number, unit: number, lesson: number) => {
  return esperanto[step].units[unit].lessons[lesson].title;
}

export const getModules = (language: string, step: number, unit: number, lesson: number) => {
  return esperanto[step].units[unit].lessons[lesson].modules;
}