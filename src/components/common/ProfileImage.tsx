import React, { ReactElement } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface Props {
  src?: string | null;
  alt?: string;
  size?: string;
  onClick?: () => void;
}

function ProfileImage({
  src, alt = '프로필 이미지', size = '32px', onClick,
}: Props): ReactElement {
  if (!src) {
    return (
      <ProfileAvatarImage
        src="/img_avatar_default.png"
        alt={alt}
        width={size}
        height={size}
        data-testid="default-profile-icon"
        onClick={onClick}
      />
    );
  }

  return (
    <ProfileAvatarImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      onClick={onClick}
    />
  );
}

export default ProfileImage;

const ProfileAvatarImage = styled.img`
  border-radius: 70%;
  overflow: hidden;
  ${({ onClick }) => onClick && css`
    cursor: pointer;
  `};
`;
