import { getRedirectResult, signInWithRedirect } from 'firebase/auth';

import { googleProvider } from '../firebase';

import {
  postSignInWithGithub,
  postSignInWithGoogle,
  signInWithRedirectOAuth,
} from './auth';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn().mockImplementationOnce(() => ({
    languageCode: 'ko',
  })),
  GoogleAuthProvider: jest.fn(),
  GithubAuthProvider: jest.fn(),
  signInWithRedirect: jest.fn(),
  getRedirectResult: jest.fn(),
}));

describe('auth api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signInWithRedirectOAuth', () => {
    it('signInWithRedirect가 호출되어야만 한다', () => {
      signInWithRedirectOAuth(googleProvider);

      expect(signInWithRedirect).toBeCalledWith({ languageCode: 'ko' }, {});
    });
  });

  describe('postSignInWithGoogle', () => {
    context('반환값이 존재하지 않을 경우', () => {
      (getRedirectResult as jest.Mock).mockReturnValueOnce(null);

      it('null이 반환되어야만 한다', async () => {
        const result = await postSignInWithGoogle();

        expect(getRedirectResult).toBeCalledWith({ languageCode: 'ko' });
        expect(result).toBeNull();
      });
    });

    context('반환값이 존재하지 않을 경우', () => {
      (getRedirectResult as jest.Mock).mockReturnValueOnce({
        user: 'test',
      });

      it('user 정보가 반환되어야 한다', async () => {
        const result = await postSignInWithGoogle();

        expect(getRedirectResult).toBeCalledWith({ languageCode: 'ko' });
        expect(result).toBe('test');
      });
    });
  });

  describe('postSignInWithGithub', () => {
    context('반환값이 존재하지 않을 경우', () => {
      (getRedirectResult as jest.Mock).mockReturnValueOnce(null);

      it('null이 반환되어야만 한다', async () => {
        const result = await postSignInWithGithub();

        expect(getRedirectResult).toBeCalledWith({ languageCode: 'ko' });
        expect(result).toBeNull();
      });
    });

    context('반환값이 존재하지 않을 경우', () => {
      (getRedirectResult as jest.Mock).mockReturnValueOnce({
        user: 'test',
      });

      it('user 정보가 반환되어야 한다', async () => {
        const result = await postSignInWithGithub();

        expect(getRedirectResult).toBeCalledWith({ languageCode: 'ko' });
        expect(result).toBe('test');
      });
    });
  });
});
