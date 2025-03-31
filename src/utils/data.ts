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

export const getMilestones = (language: string, step: number) => {
  return milestones;
}

export const getUnitDescription = (language: string, step: number, unit: number) => {
  return units[step][unit];
}

export const getLesson = (language: string, step: number, unit: number, lesson: number) => {
  return lessons[step][unit][lesson];
}

const lessons = [
  [
    [
      {
        "title": "Saluton! (Hello!)",
        "content": "Mi estas Rufi. Saluton! Mi havas hundon."
      },
      {
        "title": "La Kato (The Cat)",
        "content": "Ŝi estas Miau. Ŝi estas malgranda. Mi amas la katon."
      }
    ],
    [
      {
        "title": "La Familio (The Family)",
        "content": "Mi havas familion. Mia patro estas feliĉa. Mia patrino estas bela."
      },
      {
        "title": "La Koloroj (The Colors)",
        "content": "La hundi estas ruĝa. La kato estas blua. Mi ŝatas la verdan koloron."
      }
    ],
    [
      {
        "title": "La Tagoj de la Semajno (The Days of the Week)",
        "content": "Hodiaŭ estas lundo. Mardo venas post lundo. Mi amas vendredon."
      },
      {
        "title": "La Tempo (The Weather)",
        "content": "Hodiaŭ estas sunplena. Morgaŭ estos pluva. Mi ŝatas la sunon."
      }
    ]
  ]
]

const units = [
  [
    "Learn the basics",
    "Be an advanced speaker",
    "Saluton, Mondo!"
  ]
]

const milestones = [
  [
    { current: 5, max: 5, xp: 10, title: "Complete Letter Recognition" }, // Final milestone
    { current: 5, max: 5, xp: 10, title: "Master Phonemic Awareness" }, // Second milestone
  ],
  [
    { current: 5, max: 5, xp: 10, title: "Complete Basic Math Operations" }, // First milestone in the second unit
    { current: 1, max: 2, xp: 10, title: "Understand Fractions and Decimals" }, // Second milestone
  ],
  [
    { current: 0, max: 5, xp: 10, title: "Explore Geometry Basics" }, // Fourth milestone
    { current: 0, max: 5, xp: 10, title: "Introduction to Data Interpretation" }, // Fifth milestone
  ]
];
