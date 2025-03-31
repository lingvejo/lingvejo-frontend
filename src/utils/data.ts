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

export const setSetting = (label: string, value: any) => {
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

export const getUnitDescription = (language: string, step: number, unit: number) => {
  return units[step][unit]; // testing
}

export const getMilestones = (language: string, step: number) => {
  return milestones; // testing
}



const units = [
  [
    "Learn the basics",
    "Be an advanced speaker"
  ]
]

const milestones = [
  [
    { current: 5, max: 5, xp: 10, title: "Complete Letter Recognition" }, // Final milestone
    { current: 5, max: 5, xp: 10, title: "Master Phonemic Awareness" }, // Second milestone
    { current: 5, max: 5, xp: 10, title: "Achieve Vocabulary Building" }, // Third milestone
    { current: 5, max: 5, xp: 10, title: "Understand Basic Sentence Structure" }, // Fourth milestone
    { current: 5, max: 5, xp: 10, title: "Develop Reading Comprehension Skills" }, // Fifth milestone
  ],
  [
    { current: 5, max: 5, xp: 10, title: "Complete Basic Math Operations" }, // First milestone in the second unit
    { current: 1, max: 2, xp: 10, title: "Understand Fractions and Decimals" }, // Second milestone
    { current: 0, max: 5, xp: 10, title: "Learn to Solve Word Problems" }, // Third milestone
    { current: 0, max: 5, xp: 10, title: "Explore Geometry Basics" }, // Fourth milestone
    { current: 0, max: 5, xp: 10, title: "Introduction to Data Interpretation" }, // Fifth milestone
  ]
];
