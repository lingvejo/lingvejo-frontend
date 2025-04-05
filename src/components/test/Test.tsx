import VisualNovel from "../visualNovel/VisualNovel";

const mergedSceneData = [
  {
    speaker: 'left',
    name: 'Mysterious Wizard',
    character: 'aurora',
    background: '1',
    text: "You wake up in a strange land, unfamiliar with the language.",
    choices: [
      { label: 'Ask her where you are.', next: 1 },
      { label: 'Request help in learning the language.', next: 2 },
    ],
  },
  {
    speaker: 'right',
    name: 'Mysterious Wizard',
    character: 'aurora',
    background: '1',
    text: 'Suddenly, a figure approaches you. She looks like a wizard, her robes shining under the alien sun.',
    choices: null,
  },
  {
    speaker: 'left',
    name: 'Mysterious Wizard',
    character: 'aurora',
    background: '1',
    text: 'She speaks to you in the strange tongue, but you understand her through the magic of translation.',
    choices: [
      { label: 'Ask her where you are.', next: 3 },
      { label: 'Request help in learning the language.', next: 4 },
    ],
  },
  {
    speaker: 'left',
    name: 'Mysterious Wizard',
    character: 'aurora',
    background: '2',
    text: 'Good. Then we may begin your training...',
    choices: null,
  },
  {
    speaker: 'left',
    name: 'Mysterious Wizard',
    character: 'aurora',
    background: '2',
    text: 'Ah, I forget myself. I am Valena, a guide of the Galactic Magic Association.',
    choices: null,
  },
];


export default function () {
    return <VisualNovel scene={mergedSceneData} />
  
}