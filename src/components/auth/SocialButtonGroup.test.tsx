import { fireEvent, render, screen } from '@testing-library/react';

import { githubProvider, googleProvider, signInRedirectOAuth } from '@/services/firebase';

import SocialButtonGroup from './SocialButtonGroup';

jest.mock('@/services/firebase');

describe('SocialButtonGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderSocialButtonGroup = () => render((
    <SocialButtonGroup />
  ));

  context('OAuth가 구글인 경우', () => {
    describe('"구글 로그인" 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderSocialButtonGroup();

        fireEvent.click(screen.getByTestId('google-icon'));

        expect(signInRedirectOAuth).toBeCalledWith(googleProvider);
      });
    });
  });

  context('OAuth가 깃허브인 경우', () => {
    describe('"깃허브 로그인" 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderSocialButtonGroup();

        fireEvent.click(screen.getByTestId('github-icon'));

        expect(signInRedirectOAuth).toBeCalledWith(githubProvider);
      });
    });
  });
});
