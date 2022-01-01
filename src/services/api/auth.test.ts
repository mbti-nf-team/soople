import { getDoc, updateDoc } from 'firebase/firestore';

import PROFILE_FIXTURE from '../../../fixtures/profile';
import { docRef } from '../firebase';

import { getUserProfile, updateUserProfile } from './auth';

jest.mock('../firebase');

describe('auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('updateUserProfile', () => {
    const userRef = 'userRef';

    beforeEach(() => {
      (docRef as jest.Mock).mockReturnValueOnce(userRef);
    });

    it('updateDoc 함수가 호출되어야만 한다', async () => {
      await updateUserProfile(PROFILE_FIXTURE);

      const {
        name, image, portfolioUrl, position,
      } = PROFILE_FIXTURE;

      expect(updateDoc).toBeCalledWith(userRef, {
        name,
        image,
        portfolioUrl,
        position,
      });
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
});
