import { getRedirectResult, signOut } from 'firebase/auth';
import { getDoc, setDoc } from 'firebase/firestore';

import FIXTURE_PROFILE from '../../../fixtures/profile';
import { docRef } from '../firebase';

import {
  getAuthRedirectResult,
  getUserProfile,
  postSignOut,
  postUserProfile,
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
      await postUserProfile(FIXTURE_PROFILE);

      expect(setDoc).toBeCalledWith(userRef, FIXTURE_PROFILE);
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

    context('uid가 null인 경우', () => {
      it('null을 반환해야만 한다', async () => {
        const response = await getUserProfile();

        expect(response).toBeNull();
      });
    });

    context('uid가 존재하는 경우', () => {
      it('해당 detail 글 정보가 나타나야만 한다', async () => {
        const response = await getUserProfile('id');

        expect(getDoc).toBeCalled();
        expect(response).toEqual(mockResponse);
      });
    });
  });

  describe('postSignOut', () => {
    it('"signOut"이 호출되어야만 한다', async () => {
      await postSignOut();

      expect(signOut).toBeCalled();
    });
  });

  describe('getAuthRedirectResult', () => {
    beforeEach(() => {
      (getRedirectResult as jest.Mock).mockImplementation(() => ({
        user: FIXTURE_PROFILE,
      }));
    });

    it('"getRedirectResult"이 호출되어야만 한다', async () => {
      const user = await getAuthRedirectResult();

      expect(getRedirectResult).toBeCalled();
      expect(user).toEqual(FIXTURE_PROFILE);
    });
  });
});
