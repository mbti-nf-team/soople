import { fireEvent, render, screen } from '@testing-library/react';

import { githubProvider, googleProvider } from '@/services/firebase';

import SignInOAuthButtons from './SignInOAuthButtons';

describe('SignInOAuthButtons', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
  });

  const renderSignInOAuthButtons = () => render((
    <SignInOAuthButtons
      onClick={handleClick}
    />
  ));

  describe('"구글 로그인" 버튼을 클릭한다', () => {
    it('클릭 이벤트가 호출되야만 한다', () => {
      renderSignInOAuthButtons();

      fireEvent.click(screen.getByText('구글 로그인'));

      expect(handleClick).toBeCalledWith(googleProvider);
    });
  });

  describe('"깃허브 로그인" 버튼을 클릭한다', () => {
    it('클릭 이벤트가 호출되야만 한다', () => {
      renderSignInOAuthButtons();

      fireEvent.click(screen.getByText('깃허브 로그인'));

      expect(handleClick).toBeCalledWith(githubProvider);
    });
  });
});
