import {
  addDoc, DocumentData, getDocs, QueryDocumentSnapshot, serverTimestamp, updateDoc,
} from 'firebase/firestore';

import { ApplicantFields } from '@/models/group';
import { formatCreatedAt, isLessThanPerPage } from '@/utils/firestore';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';
import GROUP_FIXTURE from '../../../fixtures/group';
import PROFILE_FIXTURE from '../../../fixtures/profile';
import { collectionRef } from '../firebase';

import {
  deleteApplicant,
  getApplicants,
  getAppliedGroups,
  getUserAppliedGroupCount,
  getUserAppliedGroups,
  postAddApplicant,
  putApplicant,
} from './applicants';
import { getGroupDetail, patchNumberApplicants } from './group';

jest.mock('../firebase');
jest.mock('./group');
jest.mock('@/utils/firestore');

describe('applicants API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('postAddApplicant', () => {
    const collection = 'collectionRef';
    const createdAt = '2021-11-11';

    const applicant: ApplicantFields = {
      groupId: 'groupId',
      introduce: 'introduce',
      portfolioUrl: 'https://test.test',
      applicant: PROFILE_FIXTURE,
    };

    beforeEach(() => {
      (collectionRef as jest.Mock).mockReturnValueOnce(collection);
      (addDoc as jest.Mock).mockImplementation(() => ({
        id: '1',
      }));
      (patchNumberApplicants as jest.Mock).mockResolvedValue(5);
      (serverTimestamp as jest.Mock).mockReturnValueOnce(createdAt);
    });

    it('addDoc 함수가 호출되어야만 한다', async () => {
      const response = await postAddApplicant(applicant);

      expect(addDoc).toBeCalledWith(collection, {
        ...applicant,
        isConfirm: false,
        createdAt,
      });

      expect(response).toEqual({
        uid: '1',
        numberApplicants: 5,
      });
    });
  });

  describe('getApplicants', () => {
    beforeEach(() => {
      (getDocs as jest.Mock).mockImplementationOnce(() => ({
        docs: [APPLICANT_FIXTURE],
      }));
      (formatCreatedAt as jest.Mock).mockReturnValueOnce(APPLICANT_FIXTURE);
    });

    it('신청자 리스트가 반환되어야만 한다', async () => {
      const response = await getApplicants('groupId');

      expect(response).toEqual([APPLICANT_FIXTURE]);
      expect(getDocs).toBeCalledTimes(1);
    });
  });

  describe('getUserAppliedGroupCount', () => {
    const groupId = '1';

    const doc = {
      data: () => ({
        groupId,
      }),
    } as unknown as QueryDocumentSnapshot<DocumentData>;

    beforeEach(() => {
      (getGroupDetail as jest.Mock).mockResolvedValue(GROUP_FIXTURE);
      (getDocs as jest.Mock).mockImplementationOnce(() => ({
        docs: [doc],
        size: 1,
      }));
    });

    it('그룹 리스트 개수를 반환해야만 한다', async () => {
      const response = await getUserAppliedGroupCount('userUid');

      expect(response).toBe(1);
    });
  });

  describe('getUserAppliedGroups', () => {
    const lastVisibleId = 'lastVisibleId';
    const groupId = '1';

    const doc = {
      data: () => ({
        groupId,
      }),
    } as unknown as QueryDocumentSnapshot<DocumentData>;

    context('"lastUid"가 존재하지 않는 경우', () => {
      beforeEach(() => {
        (getDocs as jest.Mock).mockImplementationOnce(() => ({
          docs: [{
            ...GROUP_FIXTURE,
            ...doc,
            id: lastVisibleId,
          }],
        }));
        (getGroupDetail as jest.Mock).mockResolvedValue(GROUP_FIXTURE);
      });

      it('그룹 리스트가 반환되어야만 한다', async () => {
        const response = await getUserAppliedGroups('userUid', {
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
              ...doc,
              id: lastVisibleId,
            }],
          }));
          (getGroupDetail as jest.Mock).mockResolvedValue(GROUP_FIXTURE);
          (isLessThanPerPage as jest.Mock).mockImplementationOnce(
            () => jest.fn().mockReturnValueOnce(true),
          );
        });

        it('그룹 리스트가 반환되어야만 한다', async () => {
          const response = await getUserAppliedGroups('userUid', {
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
              ...doc,
              id: lastVisibleId,
            }],
          }));
          (getGroupDetail as jest.Mock).mockResolvedValue(GROUP_FIXTURE);
        });

        it('그룹 리스트가 반환되어야만 한다', async () => {
          const response = await getUserAppliedGroups('userUid', {
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

  describe('putApplicant', () => {
    it('"updateDoc"이 호출되어야만 한다', async () => {
      await putApplicant(APPLICANT_FIXTURE);

      expect(updateDoc).toBeCalledTimes(1);
    });
  });

  describe('deleteApplicant', () => {
    beforeEach(() => {
      (patchNumberApplicants as jest.Mock).mockResolvedValue(5);
    });

    it('"patchNumberApplicants"이 호출되어야만 한다', async () => {
      const response = await deleteApplicant({
        applicantId: 'applicantId',
        groupId: '1',
      });

      expect(patchNumberApplicants).toBeCalledWith({
        groupId: '1',
        isApply: false,
      });
      expect(response).toBe(5);
    });
  });

  describe('getAppliedGroups', () => {
    const groupId = '1';

    const doc = {
      data: () => ({
        groupId,
      }),
    } as unknown as QueryDocumentSnapshot<DocumentData>;

    beforeEach(() => {
      (getGroupDetail as jest.Mock).mockResolvedValue(GROUP_FIXTURE);
    });

    it('그룹을 반환되어야만 한다', async () => {
      const response = await getAppliedGroups(doc);

      expect(response).toEqual(GROUP_FIXTURE);
      expect(getGroupDetail).toBeCalledWith(groupId);
    });
  });
});
