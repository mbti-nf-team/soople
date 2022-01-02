import {
  addDoc, getDoc, getDocs, serverTimestamp,
} from 'firebase/firestore';

import { WriteFields } from '@/models/group';
import {
  getGroupDetail, getGroups, postNewGroup,
} from '@/services/api/group';

import GROUP_FIXTURE from '../../../fixtures/group';
import PROFILE_FIXTURE from '../../../fixtures/profile';

jest.mock('@/utils/firestore');
jest.mock('../firebase');

describe('group API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('postNewGroup', () => {
    const createdAt = '2021-11-11';

    const group: WriteFields = {
      title: 'title',
      content: 'content',
      tags: [],
      category: '',
      recruitmentEndDate: '',
      recruitmentEndSetting: 'automatic',
    };

    beforeEach(() => {
      (addDoc as jest.Mock).mockImplementationOnce(() => ({
        id: '1',
      }));

      (serverTimestamp as jest.Mock).mockReturnValueOnce(createdAt);
    });

    it('addDoc 함수가 호출되어야만 한다', async () => {
      const id = await postNewGroup(PROFILE_FIXTURE, group);

      expect(addDoc).toBeCalledWith(undefined, {
        ...group,
        writer: PROFILE_FIXTURE,
        createdAt,
      });
      expect(id).toBe('1');
    });
  });

  describe('getGroupDetail', () => {
    const mockResponse = {
      title: 'title',
      content: 'content',
    };

    context('exists가 true인 경우', () => {
      beforeEach(() => {
        (getDoc as jest.Mock).mockImplementationOnce(() => ({
          exists: jest.fn().mockReturnValueOnce(true),
          data: jest.fn().mockReturnValueOnce(mockResponse),
        }));
      });

      it('해당 detail 글 정보가 나타나야만 한다', async () => {
        const response = await getGroupDetail('id');

        expect(response).toEqual(mockResponse);
      });
    });

    context('exists가 false인 경우', () => {
      beforeEach(() => {
        (getDoc as jest.Mock).mockImplementationOnce(() => ({
          exists: jest.fn().mockReturnValueOnce(false),
          data: jest.fn().mockReturnValueOnce(mockResponse),
        }));
      });

      it('null을 반환해야만 한다', async () => {
        const response = await getGroupDetail('id');

        expect(response).toBeNull();
      });
    });
  });

  describe('getGroups', () => {
    beforeEach(() => {
      (getDocs as jest.Mock).mockImplementationOnce(() => ({
        docs: [GROUP_FIXTURE],
      }));
    });

    it('그룹 리스트가 반환되어야만 한다', async () => {
      const response = await getGroups([]);

      expect(response).toEqual([GROUP_FIXTURE]);
    });
  });
});
