export const continents: Continent[] = [
  { continentId: 1, planetId: 23, name: 'Komencanto', description: 'Por baza lernantoj.' },
  { continentId: 2, planetId: 23, name: 'Thalorwyn', description: 'A mystical forest realm filled with ancient whispers.' },
  { continentId: 3, planetId: 23, name: 'Zephyrel', description: 'Windswept highlands where clouds kiss the peaks.' },
  { continentId: 4, planetId: 23, name: 'Myrrakar', description: 'Land of glowing caves and subterranean knowledge.' },
  { continentId: 5, planetId: 23, name: 'Astraelith', description: 'Celestial towers rise from plains of starlight.' },
  { continentId: 6, planetId: 23, name: 'Varnakai', description: 'Dark jungles humming with magical energy.' },
  { continentId: 7, planetId: 23, name: 'Eldurith', description: 'Volcanic lands forged in ancient fire.' },
  { continentId: 8, planetId: 23, name: 'Silvaran', description: 'Home of the silver lakes and language sages.' },
  { continentId: 9, planetId: 23, name: 'Noctareth', description: 'Veiled in perpetual twilight and moonlit fog.' },
  { continentId: 10, planetId: 23, name: 'Lunetherra', description: 'A land governed by lunar tides and silent wizards.' },
  { continentId: 11, planetId: 23, name: 'Cindravael', description: 'Ashen steppes of forgotten civilizations.' },
  { continentId: 12, planetId: 23, name: 'Glacielle', description: 'Frozen whispers echo across its icy cliffs.' },
  { continentId: 13, planetId: 23, name: 'Verdalune', description: 'Lush meadows with bioluminescent wildlife.' },
  { continentId: 14, planetId: 23, name: 'Aurorath', description: 'Skies painted with magical auroras and light rituals.' },
];

  
  export  const regions: Region[] = [
    {
      regionId: 2,
      continentId: 4,
      name: 'Learn the Alphabet',
      description: 'Master the basics of reading and pronunciation.'
    },
    {
      regionId: 4,
      continentId: 4,
      name: 'Basic Phrases',
      description: 'Learn essential greetings and polite expressions.'
    }
  ];
  
  export const settlements: Settlement[] = [
    { settlementId: 1, regionId: 2, name: 'Introduction to Esperanto' },
    { settlementId: 9, regionId: 2, name: 'Esperanto Alphabet' },
    { settlementId: 10, regionId: 4, name: 'Everyday Greetings' }
  ];

  type Continent = {
    continentId: number;
    planetId: number;
    name: string;
    description: string;
  };
  
  type Region = {
    regionId: number;
    continentId: number;
    name: string;
    description: string;
  };
  
  type Settlement = {
    settlementId: number;
    regionId: number;
    name: string;
  };


  export const planetMoods = {
    cryonix: {
      // ❄️ Frozen Tundra World – Ice + UV light shimmer
      globe: {
        color: '#030f2e', // Deep glacial sea, cold blue-black
        emissive: '#aeefff' // Electric icy glow
      },
      side: 'rgba(174, 239, 255, 0.12)',
      stroke: '#d0f0ff',
      continentColor: 'rgba(255, 255, 255, 0.98)' // Blinding tundra-white
    },
    ignara: {
      // 🔥 Volcanic World – Heat, lava, sulfur
      globe: {
        color: '#200000', // Molten abyss
        emissive: '#ff5e00'
      },
      side: 'rgba(255, 80, 40, 0.18)',
      stroke: '#ff7b00',
      continentColor: 'rgba(255, 200, 120, 0.95)' // Smoldering surface
    },
    viridion: {
      // 🌿 Bio-luminescent Jungle World – Vibrant + alien
      globe: {
        color: '#003824', // Emerald blackwater
        emissive: '#00ffcc'
      },
      side: 'rgba(0, 255, 187, 0.15)',
      stroke: '#00fcd3',
      continentColor: 'rgba(189, 255, 236, 0.95)' // Glowing flora
    },
    noctyra: {
      // 🌌 Nebula World – Mysterious & elegant
      globe: {
        color: '#0a0018', // Dark matter sea
        emissive: '#b085ff'
      },
      side: 'rgba(160, 120, 255, 0.12)',
      stroke: '#9f7afa',
      continentColor: 'rgba(230, 220, 255, 0.94)' // Ethereal wisps
    },
    solara: {
      // ☀️ Radiant Desert World – Blinding & radiant
      globe: {
        color: '#331a00', // Parched golden-brown oceans
        emissive: '#ffd700'
      },
      side: 'rgba(255, 215, 0, 0.14)',
      stroke: '#ffe066',
      continentColor: 'rgba(255, 250, 220, 0.95)' // Dusty dunes
    },
    cerulea: {
      // 🌊 Deep Oceanic World – Pressure, glow, mythic depths
      globe: {
        color: '#000f3e', // Abyssal sea
        emissive: '#0099ff'
      },
      side: 'rgba(0, 153, 255, 0.13)',
      stroke: '#00bfff',
      continentColor: 'rgba(195, 230, 255, 0.95)' // Coral glow
    }
  };
  