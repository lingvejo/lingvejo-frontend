import { settingsCollection } from "./db";

export const getSetting = (label: string): any => {
    const settings = settingsCollection.find({});

    // Check if settings exist and return the value for the given label
    for (const setting of settings) {
        if (setting[label] !== undefined) {
            return setting[label];
        }
    }

    // Return undefined if the label is not found
    return undefined;
};

export const setSetting = (label: string, value: any): void => {
    const settings = settingsCollection.find({});

    // Update the setting if it exists
    for (const setting of settings) {
        if (setting[label] !== undefined) {
            setting[label] = value; // Update the value
            settingsCollection.saveCollection(); // Save the updated collection
            return;
        }
    }
};