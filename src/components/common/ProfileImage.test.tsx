import { render, screen } from '@testing-library/react';

import ProfileImage from './ProfileImage';

describe('ProfileImage', () => {
  const renderProfileImage = (src: string) => render((
    <ProfileImage
      src={src}
    />
  ));

  context('프로필 이미지가 존재하지 않는 경우', () => {
    it('기본 프로필 이미지가 나타나야 한다', () => {
      renderProfileImage('');

      expect(screen.getByTestId('default-profile-icon')).not.toBeNull();
    });
  });

  context('프로필 이미지가 존재하는 경우', () => {
    it('작성자의 이미지가 나타나야 한다', () => {
      renderProfileImage('/test.com');

      expect(screen.getByAltText('프로필 이미지')).not.toBeNull();
    });
  });
});
