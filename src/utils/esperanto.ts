export const esperanto = [
  {
    title: "Komencanto",
    description: "Saluton! (Hello!)",
    units: [
      {
        title: "Learn the Alphabet",
        description: "Master the basics of reading and pronunciation.",
        lessons: [
          {
            title: "Introduction to Esperanto",
            modules: [
              [
                { type: "markdown", title: "What is Esperanto?", content: "Esperanto is an international auxiliary language created by L. L. Zamenhof in 1887. It was designed to be easy to learn and politically neutral." },
                { type: "markdown", title: "Why Learn Esperanto?", content: "- **Easy Grammar**: No irregular verbs.\n- **Phonetic Spelling**: Words are spelled as they sound.\n- **International Community**: Millions of speakers worldwide." }
              ]
            ]
          },
          {
            title: "Esperanto Alphabet",
            modules: [
              [
                { type: "markdown", title: "Vowels", content: "Esperanto has **five vowels**: A, E, I, O, U" }
              ],
              [
                { type: "custom", title: "Pronunciation Guide", component: "AudioMatchingModule", data: { pairs: [{ sound: "a.mp3", word: "A" }, { sound: "e.mp3", word: "E" }] } }
              ]
            ]
          }
        ]
      },
      {
        title: "Basic Phrases",
        description: "Learn essential greetings and polite expressions.",
        lessons: [
          {
            title: "Everyday Greetings",
            modules: [
              [
                { type: "markdown", title: "Basic Greetings", content: "- **Saluton** – Hello\n- **Bonan matenon** – Good morning\n- **Bonan nokton** – Good night" }
              ,
              
                { type: "custom", title: "Practice Speaking", component: "SpeechRecognitionModule", data: { phrases: [{ esperanto: "Saluton", english: "Hello" }, { esperanto: "Bonan matenon", english: "Good morning" }] } }
              ,
              
                { type: "custom", title: "Arrange the Sentence", component: "DragAndDropModule", data: { words: ["Mi", "estas", "lernanto"] } }
              ],
              [
                { type: "custom", title: "Fill in the Blank", component: "FillInTheBlankModule", data: { sentence: "Mi ___ lernanto.", options: ["estas", "ne", "havas"] } }
              ],
              [{
                type: "custom",
                title: "Dialogue Practice",
                component: "DialoguePracticeModule",
                data: {
                  conversation: [
                    {
                      esperanto: "Saluton! Kiel vi fartas?",
                      english: "Hello! How are you?",
                      responses: [
                        { text: "Bone, dankon! Kaj vi?", next: 1 },
                        { text: "Mi ne komprenas.", next: 2 }
                      ]
                    },
                    {
                      esperanto: "Bone! Mi ĝojas!", 
                      english: "Good! I'm happy!", 
                      responses: [{ text: "Dankon!", next: null }]
                    },
                    {
                      esperanto: "Ne gravas! Mi helpos vin lerni!", 
                      english: "No worries! I will help you learn!", 
                      responses: [{ text: "Dankon!", next: null }]
                    }
                  ]
                }
              },
                {
                  type: "custom",
                  title: "Challenge Mode",
                  component: "ChallengeModule",
                  data: {
                    task: "Translate the sentence correctly to advance!",
                    challenges: [
                      { esperanto: "Mi estas lernanto.", english: "I am a student." }
                    ]
                  }
                },
                { 
                  type: "custom", 
                  title: "Mini-Game", 
                  component: "MiniGameModule", 
                  data: { 
                    gameType: "Memory Match", 
                    words: [
                      { esperanto: "Saluton", english: "Hello" }, 
                      { esperanto: "Dankon", english: "Thank you" }
                    ] 
                  } 
                }
              ],
              [
                { type: "custom", title: "Image Association", component: "ImageAssociationModule", data: { images: [{ image: "saluton.png", word: "Saluton" }, { image: "matenon.png", word: "Bonan matenon" }] }
              },
                  {
                    "type": "custom",
                    "title": "Story Mode",
                    "component": "StoryModule",
                    "data": {
                      "story": [
                        "You wake up in a strange land, the air filled with the scent of unfamiliar flowers. Towering trees with glowing leaves sway gently in the breeze.",
                        "A robed figure stands before you, a staff in hand. The wizard smiles warmly and speaks: 'Saluton! Kiu vi estas?'",
                        "You struggle to understand the words. The wizard notices your confusion and gestures, conjuring an illusion of the sun rising over a distant planet.",
                        "'Vi ne komprenas? Ĉu vi venas de alia mondo?' they ask, tilting their head. You nod hesitantly.",
                        "The wizard chuckles. 'Ne timu, mi helpos vin. Lernu nian lingvon, kaj vi trovos la vojon.'",
                        "The journey begins. Will you accept the wizard's guidance and unlock the mysteries of this land?"
                      ]
                    }
                  },

                    {
                      "type": "custom",
                      "title": "Exploration Mode",
                      "component": "ExplorationModule",
                      "data": {
                        "locations": [
                          { "name": "Village", "description": "A peaceful village with friendly locals and cozy homes." },
                          { "name": "Forest", "description": "A dense, mysterious forest filled with ancient trees and hidden secrets." },
                          { "name": "Castle", "description": "A grand castle standing tall, home to a wise ruler and their court." }
                        ]
                      }
                    }
                
                ,
                { type: "custom", title: "Roleplay Scenarios", component: "RoleplayModule", data: { scenario: "You meet a traveler.", dialogue: [{ npc: "Saluton! De kie vi venas?", responses: [{ text: "Mi venas el Usono.", next: 1 }, { text: "Mi ne komprenas.", next: 2 }] }, { npc: "Ho, bone! Ĉu vi lernas Esperanton?", responses: [{ text: "Jes, mi lernas.", next: null }] }, { npc: "Ne gravas! Mi helpos vin lerni!", responses: [{ text: "Dankon!", next: null }] }] } }
              ]
            ]
          }
        ]
      }
    ]
  }
];
