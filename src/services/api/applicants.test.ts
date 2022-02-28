import {
  addDoc, DocumentData, getDocs, QueryDocumentSnapshot, serverTimestamp, updateDoc,
} from 'firebase/firestore';

import { ApplicantFields } from '@/models/group';
import { formatCreatedAt } from '@/utils/firestore';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';
import GROUP_FIXTURE from '../../../fixtures/group';
import PROFILE_FIXTURE from '../../../fixtures/profile';
import { collectionRef } from '../firebase';

import {
  deleteApplicant,
  getApplicants,
  getAppliedGroups,
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
      groupId: '1',
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

  describe('getUserAppliedGroups', () => {
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
      }));
    });

    it('그룹 리스트가 반환되어야만 한다', async () => {
      const response = await getUserAppliedGroups('userUid');

      expect(response).toEqual([GROUP_FIXTURE]);
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
