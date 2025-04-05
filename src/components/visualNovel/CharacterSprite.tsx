import { CHARACTERS_URL } from '@/constants/public';
import { Image } from '@mantine/core';
import './CharacterSprite.css';  // Assuming you have a CSS file for styling

type Props = {
  side: 'left' | 'right';
  show: boolean;
  character?: string;
};

export default function CharacterSprite({ side, show, character }: Props) {
  if (!show || !character) return null;
  
  return (
    <Image
      src={CHARACTERS_URL + character + ".png"}
      width={150}
      fit="contain"
      alt={`${side}-character`}
      className={`wizard-sprite ${side === 'right' ? 'flipped' : ''}`}
      style={{
        filter: 'drop-shadow(0px 0px 16px #000)',
      }}
    />
  );
}
