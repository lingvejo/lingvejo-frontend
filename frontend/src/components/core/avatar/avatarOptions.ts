export const sex = ['man', 'woman'] as const;
export type Sex = typeof sex[number];

export const earSize = ['small', 'big'] as const;
export type EarSize = typeof earSize[number];

export const hairStyleMan = ['normal', 'thick', 'mohawk'] as const;
export type HairStyleMan = typeof hairStyleMan[number];

export const hairStyleWoman = ['normal', 'womanLong', 'womanShort'] as const;
export type HairStyleWoman = typeof hairStyleWoman[number];

export const hatStyle = ['beanie', 'turban', 'none'] as const;
export type HatStyle = typeof hatStyle[number];

export const eyeBrowStyle = ['up', 'upWoman'] as const;
export type EyeBrowStyle = typeof eyeBrowStyle[number];

export const eyeStyle = ['circle', 'oval', 'smile'] as const;
export type EyeStyle = typeof eyeStyle[number];

export const glassesStyle = ['round', 'square', 'none'] as const;
export type GlassesStyle = typeof glassesStyle[number];

export const noseStyle = ['short', 'long', 'round'] as const;
export type NoseStyle = typeof noseStyle[number];

export const mouthStyle = ['laugh', 'smile', 'peace'] as const;
export type MouthStyle = typeof mouthStyle[number];

export const shirtStyle = ['hoody', 'short', 'polo'] as const;
export type ShirtStyle = typeof shirtStyle[number];

// Combined export for usage in UI editors or generators
export const defaultOptions = {
  sex,
  earSize,
  hairStyleMan,
  hairStyleWoman,
  hatStyle,
  eyeBrowStyle,
  eyeStyle,
  glassesStyle,
  noseStyle,
  mouthStyle,
  shirtStyle,
};

export const initialAvatar = {
  shape: 'circle',
  sex: 'man',
  faceColor: '#F9C9B6',
  earSize: 'small',
  hairColor: '#000000',
  hairStyle: 'thick',
  hatColor: '#000000',
  hatStyle: 'none',
  eyeStyle: 'circle',
  glassesStyle: 'none',
  noseStyle: 'short',
  mouthStyle: 'peace',
  shirtStyle: 'hoody',
  shirtColor: '#000000',
  bgColor: '#d0ebff',
  isGradient: false,
}