import { TFunction } from 'next-intl';

export const tutorialScene = (t: TFunction) => [
  {
    background: 'marketCrowd',
    text: t('tutorial.0'),
  },
  {
    background: 'marketCrowd',
    text: t('tutorial.1'),
  },
  {
    character: 'villager1',
    name: t('tutorial.stranger'),
    background: 'marketCrowd',
    text: t('tutorial.2'),
  },
  {
    character: 'villager2',
    location: 'right',
    name: t('tutorial.stranger'),
    background: 'marketCrowd',
    text: t('tutorial.3'),
  },
  {
    background: 'marketCrowd',
    text: t('tutorial.4'),
  },
  {
    character: 'villager3',
    name: t('tutorial.stranger'),
    background: 'marketCrowd',
    text: t('tutorial.5'),
  },
  {
    background: 'marketCrowd',
    text: t('tutorial.6'),
  },
  {
    background: 'forestPath',
    text: t('tutorial.7'),
  },
  {
    background: 'forestPath',
    text: t('tutorial.8'),
  },
  {
    background: 'forestPath',
    text: t('tutorial.9'),
  },
  {
    character: 'aurora',
    name: t('tutorial.wizard'),
    background: 'forestClearing',
    text: t('tutorial.10'),
    choices: [
      { label: t('tutorial.10_choice1'), next: 11 },
      { label: t('tutorial.10_choice2'), next: 11 },
    ],
  },
  {
    character: 'aurora',
    name: t('tutorial.wizard'),
    background: 'forestClearing',
    text: t('tutorial.11'),
  },
  {
    character: 'aurora',
    name: t('tutorial.wizard'),
    background: 'forestClearing',
    text: t('tutorial.12'),
    choices: [
      { label: t('tutorial.12_choice1'), next: null },
      { label: t('tutorial.12_choice2'), next: null },
    ],
  },
];

export default tutorialScene;