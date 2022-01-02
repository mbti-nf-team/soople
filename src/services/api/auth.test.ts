import {
  getRedirectResult, GithubAuthProvider, signOut,
} from 'firebase/auth';
import { getDoc, setDoc } from 'firebase/firestore';

import PROFILE_FIXTURE from '../../../fixtures/profile';
import { docRef, firebaseAuth } from '../firebase';

import {
  getUserProfile, getUserToken, postSignIn, postSignOut, postUserProfile,
} from './auth';

jest.mock('../firebase');

describe('auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('postUserProfile', () => {
    const userRef = 'userRef';

    beforeEach(() => {
      (docRef as jest.Mock).mockReturnValueOnce(userRef);
    });

    it('updateDoc 함수가 호출되어야만 한다', async () => {
      await postUserProfile(PROFILE_FIXTURE);

      expect(setDoc).toBeCalledWith(userRef, PROFILE_FIXTURE);
    });
  });

  describe('getUserProfile', () => {
    const mockResponse = {
      email: 'test@test.com',
      name: 'test',
    };

    beforeEach(() => {
      (getDoc as jest.Mock).mockImplementationOnce(() => ({
        data: jest.fn().mockReturnValue(mockResponse),
      }));
    });

    it('해당 detail 글 정보가 나타나야만 한다', async () => {
      const response = await getUserProfile('id');

      expect(getDoc).toBeCalled();
      expect(response).toEqual(mockResponse);
    });
  });

  describe('postSignIn', () => {
    context('반환값이 존재하지 않을 경우', () => {
      (getRedirectResult as jest.Mock).mockReturnValueOnce(null);

      it('null이 반환되어야만 한다', async () => {
        const result = await postSignIn();

        expect(getRedirectResult).toBeCalledWith({ languageCode: 'ko' });
        expect(result).toBeNull();
      });
    });

    context('반환값이 존재하는 경우', () => {
      (getRedirectResult as jest.Mock).mockReturnValueOnce({
        user: 'test',
      });

      GithubAuthProvider.credentialFromResult = jest.fn().mockImplementationOnce(() => ({
        accessToken: 'token',
      }));

      it('user 정보가 반환되어야 한다', async () => {
        const result = await postSignIn();

        expect(getRedirectResult).toBeCalledWith({ languageCode: 'ko' });
        expect(result).toBe('test');
      });
    });
  });

  describe('postSignOut', () => {
    it('"signOut"이 호출되어야만 한다', async () => {
      await postSignOut();

      expect(signOut).toBeCalled();
    });
  });

  describe('getUserToken', () => {
    const mockGetIdToken = jest.fn();

    beforeEach(() => {
      mockGetIdToken.mockClear();
    });

    context('유저 정보가 존재한 경우', () => {
      beforeEach(() => {
        (firebaseAuth.currentUser as any) = {
          getIdToken: mockGetIdToken,
        };
      });

      it('"getIdToken"이 호출되어야만 한다', async () => {
        await getUserToken();

        expect(mockGetIdToken).toBeCalled();
      });
    });

    context('유저 정보가 존재하지 않는 경우', () => {
      beforeEach(() => {
        (firebaseAuth.currentUser as any) = null;
      });

      it('"getIdToken"이 호출되지 않아야만 한다', async () => {
        await getUserToken();

        expect(mockGetIdToken).not.toBeCalled();
      });
    });
  });
});
