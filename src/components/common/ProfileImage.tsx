import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import DefaultAvatarSvg from '../../assets/icons/img_avatar_default.svg';

interface Props {
  src?: string | null;
  alt?: string;
  size?: string;
}

function ProfileImage({ src, alt = 'profile', size = '32px' }: Props): ReactElement {
  if (!src) {
    return <DefaultAvatarIcon size={size} data-testid="default-profile-icon" />;
  }

  return (
    <ProfileAvatarImage
      src={src}
      alt={alt}
      width={size}
      height={size}
    />
  );
}

export default ProfileImage;

const DefaultAvatarIcon = styled(DefaultAvatarSvg)`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;

const ProfileAvatarImage = styled.img`
  border-radius: 70%;
  overflow: hidden;
`;
