// import { settingsCollection } from "./db";

export const getSetting = (label: string): any => {
  if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(label);
  }
  return null; // or a default value if localStorage is not available
};

export const setSetting = (label: string, value: any) => {
  if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(label, value);
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

export const esperanto = [
  // Step 1
  {
    "title": "Komencanto",
    "description": "Saluton! (Hello!)",
    "units": [
      // Unit 1
      {
        "title": "Learn the Alphabet",
        "description": "How to read?",
        "lessons": [
          // Lesson 1
          {
            "title": "Let's Load Up",
            "modules":
              // Module 1
              {
                "title": "Saluton! (Hello!)",
                "contents": [
                  {
                    "title": "Greeting in Esperanto",
                    "content": "En Esperanto, ni diras 'Saluton' por saluti."
                  },
                  {
                    "title": "Introducing Yourself",
                    "content": "Vi povas diri 'Mi estas [via nomo]' por prezenti vin."
                  }
                ]
              }
          },
          // Lesson 2
          {
            "title": "The Alphabet",
            "modules":
              // Module 2
              {
                "title": "Esperanto Letters",
                "contents": [
                  {
                    "title": "Vowels",
                    "content": "La vokaloj en Esperanto estas: a, e, i, o, u."
                  },
                  {
                    "title": "Consonants",
                    "content": "La konsonantoj estas: b, c, ĉ, d, f, g, ĝ, h, j, k, l, m, n, p, r, s, ŝ, t, v, z."
                  }
                ]
              }
          }
        ]
      },
      // Unit 2
      {
        "title": "Basic Phrases",
        "description": "Common expressions in Esperanto.",
        "lessons": [
          // Lesson 1
          {
            "title": "Everyday Greetings",
            "modules":
              // Module 1
              {
                "title": "Common Greetings",
                "contents": [
                  {
                    "title": "Good Morning",
                    "content": "Bonan matenon!"
                  },
                  {
                    "title": "Good Night",
                    "content": "Bonan nokton!"
                  }
                ]
              }
          },
          // Lesson 2
          {
            "title": "Polite Expressions",
            "modules":
              // Module 2
              {
                "title": "Please and Thank You",
                "contents": [
                  {
                    "title": "Please",
                    "content": "Bonvolu."
                  },
                  {
                    "title": "Thank You",
                    "content": "Dankon."
                  }
                ]
              }
          }
        ]
      }
    ]
  }
]

export default esperanto;