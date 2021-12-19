import React, { ReactElement } from 'react';

interface Props {
  src?: string | null;
  alt?: string;
  size?: string;
}

function ProfileImage({ src, alt = 'profile', size = '30px' }: Props): ReactElement {
  if (!src) {
    return <>이미지 없음</>;
  }

  return (
    <img src={src} alt={alt} width={size} height={size} />
  );
}

export default ProfileImage;
