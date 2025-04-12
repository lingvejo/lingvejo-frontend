'use client';

import NiceAvatar, { AvatarFullConfig } from 'react-nice-avatar';
import { Box } from '@mantine/core';
import { initialAvatar } from './avatarOptions';

type AvatarPreviewProps = {
  avatar?: AvatarFullConfig | null;
  size?: number;
};

const AvatarPreview = ({ avatar, size = 160 }: AvatarPreviewProps) => {
  const config = avatar ?? initialAvatar;

  return (
    <Box
      w={size}
      h={size}
      style={{
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'inline-block',
      }}
    >
      <NiceAvatar
        {...config}
        style={{ width: '100%', height: '100%' }}
      />
    </Box>
  );
};

export default AvatarPreview;
