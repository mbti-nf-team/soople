import { memo, ReactElement } from 'react';

import Image from 'next/image';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface Props {
  src?: string | null;
  alt?: string;
  size?: number | `${number}`;
  priority?: boolean;
  onClick?: () => void;
}

function ProfileImage({
  src, alt = '프로필 이미지', size = 32, onClick, priority = false,
}: Props): ReactElement {
  if (!src) {
    return (
      <ProfileAvatarImage
        priority={priority}
        src="/img_avatar_default.png"
        alt={alt}
        width={size}
        height={size}
        style={{
          minHeight: size,
          minWidth: size,
        }}
        data-testid="default-profile-icon"
        onClick={onClick}
      />
    );
  }

  return (
    <ProfileAvatarImage
      priority={priority}
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{
        minHeight: size,
        minWidth: size,
      }}
      onClick={onClick}
    />
  );
}

export default memo(ProfileImage);

const ProfileAvatarImage = styled(Image)`
  border-radius: 70%;
  overflow: hidden;
  ${({ onClick }) => onClick && css`
    cursor: pointer;
  `};
`;
