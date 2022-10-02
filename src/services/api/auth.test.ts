import {
  deleteUser, getRedirectResult, reauthenticateWithRedirect, signOut,
} from 'firebase/auth';
import { getDoc, setDoc } from 'firebase/firestore';

import FIXTURE_PROFILE from '../../../fixtures/profile';
import { docRef, firebaseAuth } from '../firebase';

import {
  deleteMember,
  getAuthRedirectResult,
  getUserProfile,
  postReauthenticateWithProvider,
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
        exists: jest.fn().mockImplementation(() => given.isExist),
      }));
    });

    context('uid가 존재하지 않는 경우', () => {
      it('null을 반환해야만 한다', async () => {
        const response = await getUserProfile();

        expect(response).toBeNull();
      });
    });

    context('uid가 존재하는 경우', () => {
      context('user 정보가 존재하지 않는 경우', () => {
        given('isExist', () => false);

        it('null을 반환해야만 한다', async () => {
          const response = await getUserProfile('id');

          expect(response).toBeNull();
        });
      });

      context('user 정보가 존재하는 경우', () => {
        given('isExist', () => true);

        it('해당 detail 글 정보가 나타나야만 한다', async () => {
          const response = await getUserProfile('id');

          expect(getDoc).toBeCalled();
          expect(response).toEqual(mockResponse);
        });
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
    context('user 정보가 없는 경우', () => {
      beforeEach(() => {
        (getRedirectResult as jest.Mock).mockImplementation(() => ({
          user: null,
        }));
      });

      it('null을 반환애야만 한다', async () => {
        const user = await getAuthRedirectResult();

        expect(user).toBeNull();
      });
    });

    context('user 정보가 존재하는 경우', () => {
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

  describe('postReauthenticateWithProvider', () => {
    context('user가 존재하지 않는 경우', () => {
      beforeEach(() => {
        (firebaseAuth.currentUser as any) = '';
      });

      it('"reauthenticateWithRedirect"이 호출되지 않아야만 한다', async () => {
        await postReauthenticateWithProvider();

        expect(reauthenticateWithRedirect).not.toBeCalled();
      });
    });

    context('user가 존재하는 경우', () => {
      context('providerId가 "google.com"인 경우', () => {
        beforeEach(() => {
          (firebaseAuth.currentUser as any) = {
            providerData: [{
              providerId: 'google.com',
            }],
          };
        });

        it('"reauthenticateWithRedirect"이 호출되어야만 한다', async () => {
          await postReauthenticateWithProvider();

          expect(reauthenticateWithRedirect).toBeCalledTimes(1);
        });
      });

      context('providerId가 "github.com"인 경우', () => {
        beforeEach(() => {
          (firebaseAuth.currentUser as any) = {
            providerData: [{
              providerId: 'github.com',
            }],
          };
        });

        it('"reauthenticateWithRedirect"이 호출되어야만 한다', async () => {
          await postReauthenticateWithProvider();

          expect(reauthenticateWithRedirect).toBeCalledTimes(1);
        });
      });
    });
  });

  describe('deleteMember', () => {
    context('user가 존재하는 경우', () => {
      beforeEach(() => {
        (firebaseAuth.currentUser as any) = 'currentUser';
      });

      it('"deleteUser"이 호출되어야만 한다', async () => {
        await deleteMember();

        expect(deleteUser).toBeCalled();
      });
    });

    context('user가 존재하지 않는 경우', () => {
      beforeEach(() => {
        (firebaseAuth.currentUser as any) = '';
      });

      it('"deleteUser"이 호출되지 않아야만 한다', async () => {
        await deleteMember();

        expect(deleteUser).not.toBeCalled();
      });
    });
  });
});
