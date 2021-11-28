import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import { signInWithRedirectOAuth } from '@/services/api/auth';
import { githubProvider, googleProvider } from '@/services/firebase';

import PROFILE_FIXTURE from '../../fixtures/profile';

import SignUp from './SignInContainer';

jest.mock('@/services/api/auth');

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SignUp', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        user: given.user,
        auth: given.auth,
        isRegister: given.isRegister,
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderSignUp = () => render((
    <SignUp />
  ));

  context('"user" 존재하는 경우', () => {
    given('user', () => (PROFILE_FIXTURE));

    const mockReplace = jest.fn();

    beforeEach(() => {
      (useRouter as jest.Mock).mockImplementationOnce(() => ({
        replace: mockReplace,
      }));
    });

    it('"router.replace"가 호출되어야만 한다', () => {
      renderSignUp();

      expect(mockReplace).toBeCalledWith('/');
    });
  });

  context('"isRegister" 참인 경우', () => {
    given('isRegister', () => (true));

    const mockReplace = jest.fn();

    beforeEach(() => {
      (useRouter as jest.Mock).mockImplementationOnce(() => ({
        replace: mockReplace,
      }));
    });

    it('"router.replace"가 호출되어야만 한다', () => {
      renderSignUp();

      expect(mockReplace).toBeCalledWith('/register');
    });
  });

  context('"auth"가 존재하는 경우', () => {
    const uid = '1234567';

    given('auth', () => ({ uid }));

    it('디스패치 액션이 호출되어야만 한다', () => {
      renderSignUp();

      expect(dispatch).toBeCalledTimes(3);
    });
  });

  context('"auth"가 존재하지 않는 경우', () => {
    given('auth', () => (undefined));

    describe('"구글 로그인" 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderSignUp();

        fireEvent.click(screen.getByText('구글 로그인'));

        expect(signInWithRedirectOAuth).toBeCalledWith(googleProvider);
      });
    });

    describe('"깃허브 로그인" 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderSignUp();

        fireEvent.click(screen.getByText('깃허브 로그인'));

        expect(signInWithRedirectOAuth).toBeCalledWith(githubProvider);
      });
    });
  });
});
