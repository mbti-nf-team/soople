import {
  addDoc,
  deleteDoc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

import { FilterGroupsCondition, WriteFields } from '@/models/group';
import {
  deleteGroup,
  fetchGroups,
  getGroupDetail,
  getGroups,
  getPaginationGroups,
  getUserRecruitedGroupCount,
  getUserRecruitedGroups,
  patchCompletedGroup,
  patchEditGroup,
  patchIncreaseView,
  patchNumberApplicants,
  postNewGroup,
} from '@/services/api/group';
import { filterGroups, formatGroup, isLessThanPerPage } from '@/utils/firestore';

import GROUP_FIXTURE from '../../../fixtures/group';
import PROFILE_FIXTURE from '../../../fixtures/profile';

import { paramsSerializer } from '.';

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
      shortDescription: '',
      thumbnail: '',
    };

    beforeEach(() => {
      (addDoc as jest.Mock).mockImplementationOnce(() => ({
        id: '1',
      }));

      (serverTimestamp as jest.Mock).mockReturnValueOnce(createdAt);
    });

    it('addDoc 함수가 호출되어야만 한다', async () => {
      const id = await postNewGroup(PROFILE_FIXTURE, group);

      expect(addDoc).toHaveBeenCalledWith(undefined, {
        ...group,
        isCompleted: false,
        views: 0,
        numberApplicants: 0,
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

  describe('fetchGroups', () => {
    const params: FilterGroupsCondition = {
      category: ['project'],
      isFilterCompleted: false,
      tag: 'test',
    };

    beforeEach(() => {
      (global.fetch as unknown as any) = jest.fn().mockImplementation(() => ({
        json: jest.fn().mockResolvedValue([GROUP_FIXTURE]),
      }));
    });

    it('그룹 리스트가 반환되어야만 한다', async () => {
      const perPage = 20;

      const response = await fetchGroups(params, {
        perPage,
      });

      expect(fetch).toHaveBeenCalledWith(`/api/groups?perPage=${perPage}&${paramsSerializer(params)}`, {
        method: 'GET',
      });
      expect(response).toEqual([GROUP_FIXTURE]);
    });
  });

  describe('getGroups', () => {
    beforeEach(() => {
      (getDocs as jest.Mock).mockImplementationOnce(() => ({
        docs: [GROUP_FIXTURE],
      }));
    });

    it('그룹 리스트가 반환되어야만 한다', async () => {
      const response = await getGroups({
        category: [],
        isFilterCompleted: false,
        tag: 'test',
      });

      expect(response).toEqual([GROUP_FIXTURE]);
    });
  });

  describe('getPaginationGroups', () => {
    const lastVisibleId = 'lastVisibleId';
    const condition: FilterGroupsCondition = {
      category: [],
      isFilterCompleted: false,
      tag: '',
    };

    context('"lastUid"가 존재하지 않는 경우', () => {
      beforeEach(() => {
        (getDocs as jest.Mock).mockImplementationOnce(() => ({
          docs: [{
            ...GROUP_FIXTURE,
            id: lastVisibleId,
          }],
        }));
        (filterGroups as jest.Mock).mockReturnValueOnce([GROUP_FIXTURE]);
      });

      it('그룹 리스트가 반환되어야만 한다', async () => {
        const response = await getPaginationGroups(condition, {
          perPage: 10,
        });

        expect(response).toEqual({
          items: [GROUP_FIXTURE],
          lastUid: lastVisibleId,
        });
      });
    });

    context('"lastUid"가 존재하는 경우', () => {
      context('empty가 true이거나 docs 길이가 perPage보다 작을 경우', () => {
        beforeEach(() => {
          (getDocs as jest.Mock).mockImplementationOnce(() => ({
            empty: true,
            docs: [{
              ...GROUP_FIXTURE,
              id: lastVisibleId,
            }],
          }));
          (filterGroups as jest.Mock).mockReturnValueOnce([GROUP_FIXTURE]);
          (isLessThanPerPage as jest.Mock).mockImplementationOnce(
            () => jest.fn().mockReturnValueOnce(true),
          );
        });

        it('그룹 리스트가 반환되어야만 한다', async () => {
          const response = await getPaginationGroups(condition, {
            lastUid: lastVisibleId,
          });

          expect(response).toEqual({
            items: [GROUP_FIXTURE],
          });
        });
      });

      context('empty가 false이고 docs 길이가 perPage보다 클 경우', () => {
        beforeEach(() => {
          (getDocs as jest.Mock).mockImplementationOnce(() => ({
            empty: false,
            docs: [{
              ...GROUP_FIXTURE,
              id: lastVisibleId,
            }],
          }));
          (filterGroups as jest.Mock).mockReturnValueOnce([GROUP_FIXTURE]);
        });

        it('그룹 리스트가 반환되어야만 한다', async () => {
          const response = await getPaginationGroups(condition, {
            perPage: 0,
            lastUid: lastVisibleId,
          });

          expect(response).toEqual({
            items: [GROUP_FIXTURE],
            lastUid: lastVisibleId,
          });
        });
      });
    });
  });

  describe('getUserRecruitedGroupCount', () => {
    beforeEach(() => {
      (getDocs as jest.Mock).mockImplementationOnce(() => ({
        docs: [GROUP_FIXTURE],
        size: 1,
      }));
      (formatGroup as jest.Mock).mockReturnValueOnce(GROUP_FIXTURE);
    });

    it('그룹 리스트의 개수를 반환되어야만 한다', async () => {
      const response = await getUserRecruitedGroupCount('userUid');

      expect(response).toBe(1);
    });
  });

  describe('getUserRecruitedGroups', () => {
    const lastVisibleId = 'lastVisibleId';

    context('"lastUid"가 존재하지 않는 경우', () => {
      beforeEach(() => {
        (getDocs as jest.Mock).mockImplementationOnce(() => ({
          docs: [{
            ...GROUP_FIXTURE,
            id: lastVisibleId,
          }],
        }));
        (formatGroup as jest.Mock).mockReturnValueOnce(GROUP_FIXTURE);
      });

      it('그룹 리스트가 반환되어야만 한다', async () => {
        const response = await getUserRecruitedGroups('userUid', {
          perPage: 10,
        });

        expect(response).toEqual({
          items: [GROUP_FIXTURE],
          lastUid: lastVisibleId,
        });
      });
    });

    context('"lastUid"가 존재하는 경우', () => {
      context('empty가 true이거나 docs 길이가 perPage보다 작을 경우', () => {
        beforeEach(() => {
          (getDocs as jest.Mock).mockImplementationOnce(() => ({
            empty: true,
            docs: [{
              ...GROUP_FIXTURE,
              id: lastVisibleId,
            }],
          }));
          (formatGroup as jest.Mock).mockReturnValueOnce(GROUP_FIXTURE);
          (isLessThanPerPage as jest.Mock).mockImplementationOnce(
            () => jest.fn().mockReturnValueOnce(true),
          );
        });

        it('그룹 리스트가 반환되어야만 한다', async () => {
          const response = await getUserRecruitedGroups('userUid', {
            lastUid: lastVisibleId,
          });

          expect(response).toEqual({
            items: [GROUP_FIXTURE],
          });
        });
      });

      context('empty가 false이고 docs 길이가 perPage보다 클 경우', () => {
        beforeEach(() => {
          (getDocs as jest.Mock).mockImplementationOnce(() => ({
            empty: false,
            docs: [{
              ...GROUP_FIXTURE,
              id: lastVisibleId,
            }],
          }));
          (formatGroup as jest.Mock).mockReturnValueOnce(GROUP_FIXTURE);
        });

        it('그룹 리스트가 반환되어야만 한다', async () => {
          const response = await getUserRecruitedGroups('userUid', {
            perPage: 0,
            lastUid: lastVisibleId,
          });

          expect(response).toEqual({
            items: [GROUP_FIXTURE],
            lastUid: lastVisibleId,
          });
        });
      });
    });
  });

  describe('patchNumberApplicants', () => {
    beforeEach(() => {
      (getDoc as jest.Mock).mockImplementationOnce(() => ({
        ref: 'ref',
        data: jest.fn().mockReturnValueOnce({
          numberApplicants: 1,
        }),
      }));
    });

    context('isApply가 true인 경우', () => {
      it('"updateDoc"이 numberApplicants 1증가된 상태로 호출되어야만 한다', async () => {
        const response = await patchNumberApplicants({
          groupId: 'groupId',
          isApply: true,
        });

        expect(updateDoc).toHaveBeenCalledWith('ref', {
          numberApplicants: 2,
        });
        expect(response).toBe(2);
      });
    });

    context('isApply가 false인 경우', () => {
      it('"updateDoc"이 numberApplicants 1 감소된 상태로 호출되어야만 한다', async () => {
        const response = await patchNumberApplicants({
          groupId: 'groupId',
          isApply: false,
        });

        expect(updateDoc).toHaveBeenCalledWith('ref', {
          numberApplicants: 0,
        });
        expect(response).toBe(0);
      });
    });
  });

  describe('patchCompletedGroup', () => {
    it('"updateDoc"이 호출되어야만 한다', async () => {
      await patchCompletedGroup('groupId', { message: 'test', numberConfirmApplicants: 3 });

      expect(updateDoc).toHaveBeenCalledTimes(1);
    });
  });

  describe('patchEditGroup', () => {
    const writeFields: WriteFields = {
      title: 'title',
      content: 'content',
      tags: [],
      category: '',
      recruitmentEndDate: '',
      recruitmentEndSetting: 'automatic',
      shortDescription: '',
      thumbnail: '',
    };

    it('"updateDoc"이 호출되어야만 한다', async () => {
      await patchEditGroup('groupId', writeFields);

      expect(updateDoc).toHaveBeenCalledWith(undefined, writeFields);
    });
  });

  describe('patchIncreaseView', () => {
    const groupId = 'groupId';
    const views = 1;

    context('viewedIds가 존재하지 않는 경우', () => {
      it('"updateDoc"이 호출되어야만 한다', async () => {
        const result = await patchIncreaseView({
          groupId,
          views,
        });

        expect(updateDoc).toHaveBeenCalledWith(undefined, {
          views: views + 1,
        });
        expect(result).toEqual({
          viewedIds: groupId,
          isAlreadyRead: false,
        });
      });
    });

    context('viewedIds에 groupId가 존재하지 않는 경우', () => {
      const viewedIds = 'test';

      it('"updateDoc"이 호출되어야만 한다', async () => {
        const result = await patchIncreaseView({
          groupId,
          views,
        }, viewedIds);

        expect(updateDoc).toHaveBeenCalledWith(undefined, {
          views: views + 1,
        });
        expect(result).toEqual({
          viewedIds: `${viewedIds}|${groupId}`,
          isAlreadyRead: false,
        });
      });
    });

    context('viewedIds에 groupId가 존재하는 경우', () => {
      const viewedIds = 'groupId';

      it('"updateDoc"이 호출되지 않아야만 한다', async () => {
        const result = await patchIncreaseView({
          groupId,
          views,
        }, viewedIds);

        expect(updateDoc).not.toHaveBeenCalled();
        expect(result).toEqual({
          viewedIds,
          isAlreadyRead: true,
        });
      });
    });
  });

  describe('deleteGroup', () => {
    (getDocs as jest.Mock).mockImplementation(() => ({
      docs: [{
        ref: 'ref',
      }],
    }));

    it('"deleteDoc"이 호출되어야만 한다', async () => {
      await deleteGroup('groupId');

      expect(deleteDoc).toHaveBeenCalledTimes(3);
    });
  });
});
