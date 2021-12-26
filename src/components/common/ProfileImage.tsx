import React, { ReactElement } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import DefaultAvatarSvg from '../../assets/icons/img_avatar_default.svg';

interface Props {
  src?: string | null;
  alt?: string;
  size?: string;
  onClick?: () => void;
}

function ProfileImage({
  src, alt = 'profile', size = '32px', onClick,
}: Props): ReactElement {
  if (!src) {
    return (
      <DefaultAvatarIcon
        size={size}
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

const DefaultAvatarIcon = styled(DefaultAvatarSvg)`
  width: ${({ size }) => size};
  height: ${({ size }) => size};

  ${({ onClick }) => onClick && css`
    cursor: pointer;
  `};
`;

const ProfileAvatarImage = styled.img`
  border-radius: 70%;
  overflow: hidden;
  ${({ onClick }) => onClick && css`
    cursor: pointer;
  `};
`;
