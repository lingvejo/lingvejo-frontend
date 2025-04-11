import { CHARACTERS_URL } from '@/constants/public';
import { Image } from '@mantine/core';
import './CharacterSprite.css';  // Assuming you have a CSS file for styling
import { CharacterSpriteProps } from './types';

const isValidLocation = (loc: any): loc is 'left' | 'right' =>
  loc === 'left' || loc === 'right';

export default function CharacterSprite({ location, character }: CharacterSpriteProps) {
  if (!character) return null;
  const finalLocation: 'left' | 'right' = isValidLocation(location) ? location : 'left';

  return (
    <Image
      src={CHARACTERS_URL + character + ".png"}
      width={150}
      fit="contain"
      alt={`${finalLocation}-character`}
      className={`wizard-sprite ${finalLocation === 'right' ? 'flipped' : ''}`}
      style={{
        filter: 'drop-shadow(0px 0px 16px #e2e2e2)',
        backgroundColor: 'transparent',
        mixBlendMode: 'multiply', // <-- Extra fallback if needed
      }}
    />
  );
}
