import { fireEvent, render, screen } from '@testing-library/react';
import { signIn } from 'next-auth/client';

import SocialButtonGroup from './SocialButtonGroup';

describe('SocialButtonGroup', () => {
  const renderSocialButtonGroup = () => render((
    <SocialButtonGroup />
  ));

  context('OAuth가 구글인 경우', () => {
    describe('"구글 로그인" 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderSocialButtonGroup();

        fireEvent.click(screen.getByText('구글 로그인'));

        expect(signIn).toBeCalledWith('google');
      });
    });
  });

  context('OAuth가 깃허브인 경우', () => {
    describe('"깃허브 로그인" 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderSocialButtonGroup();

        fireEvent.click(screen.getByText('깃허브 로그인'));

        expect(signIn).toBeCalledWith('github');
      });
    });
  });

  context('OAuth가 카카오인 경우', () => {
    describe('"카카오 로그인" 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderSocialButtonGroup();

        fireEvent.click(screen.getByText('카카오 로그인'));

        expect(signIn).toBeCalledWith('kakao');
      });
    });
  });
});
