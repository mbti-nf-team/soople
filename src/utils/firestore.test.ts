import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

import { getUserProfile } from '@/services/api/auth';
import { getGroupDetail } from '@/services/api/group';

import GROUP_FIXTURE from '../../fixtures/group';
import PROFILE_FIXTURE from '../../fixtures/profile';

import {
  formatAlarm,
  formatComment, formatCreatedAt, formatGroup, timestampToString,
} from './firestore';

jest.mock('@/services/api/group');
jest.mock('@/services/api/auth');

describe('timestampToString', () => {
  const timestamp = {
    toDate: jest.fn().mockImplementationOnce(() => ({
      toString: jest.fn().mockReturnValueOnce('2021-11-11'),
    })),
  };

  it('날짜 형식으로 변경되어야만 한다', () => {
    const result = timestampToString(timestamp);

    expect(result).toBe('2021-11-11');
  });
});

describe('formatGroup', () => {
  const nowString = new Date().toString();

  const date = {
    toDate: () => new Date(),
  };

  const settings = {
    id: '1',
    data: () => ({
      createdAt: date,
    }),
  } as unknown as QueryDocumentSnapshot<DocumentData>;

  it('포매팅된 그룹 정보가 반환되어야만 한다', () => {
    const result = formatGroup(settings);

    expect(result).toEqual({
      groupId: '1',
      createdAt: nowString,
    });
  });
});

describe('formatComment', () => {
  const nowString = new Date().toString();

  const date = {
    toDate: () => new Date(),
  };

  const settings = {
    id: '1',
    data: () => ({
      createdAt: date,
    }),
  } as unknown as QueryDocumentSnapshot<DocumentData>;

  it('포매팅된 댓글 정보가 반환되어야만 한다', () => {
    const result = formatComment(settings);

    expect(result).toEqual({
      commentId: '1',
      createdAt: nowString,
    });
  });
});

describe('formatCreatedAt', () => {
  const nowString = new Date().toString();

  const date = {
    toDate: () => new Date(),
  };

  const settings = {
    id: '1',
    data: () => ({
      createdAt: date,
    }),
  } as unknown as QueryDocumentSnapshot<DocumentData>;

  it('포매팅된 신청자 정보가 반환되어야만 한다', () => {
    const result = formatCreatedAt(settings);

    expect(result).toEqual({
      uid: '1',
      createdAt: nowString,
    });
  });
});

describe('formatAlarm', () => {
  beforeEach(() => {
    (getGroupDetail as jest.Mock).mockImplementation(() => (GROUP_FIXTURE));
    (getUserProfile as jest.Mock).mockImplementation(() => (PROFILE_FIXTURE));
  });

  const nowString = new Date().toString();

  const date = {
    toDate: () => new Date(),
  };

  context('applicantUid가 null이 아닌 경우', () => {
    const settings = {
      id: '1',
      data: () => ({
        groupId: '1',
        userUid: '2',
        isViewed: false,
        type: 'confirmed',
        createdAt: date,
        applicantUid: '3',
      }),
    } as unknown as QueryDocumentSnapshot<DocumentData>;

    it('포매팅된 알람 정보가 반환되어야만 한다', async () => {
      const result = await formatAlarm(settings);

      expect(result).toEqual({
        uid: '1',
        createdAt: nowString,
        isViewed: false,
        type: 'confirmed',
        group: GROUP_FIXTURE,
        userUid: '2',
        applicant: PROFILE_FIXTURE,
      });
    });
  });

  context('applicantUid가 null인 경우', () => {
    const settings = {
      id: '1',
      data: () => ({
        groupId: '1',
        userUid: '2',
        isViewed: false,
        type: 'confirmed',
        createdAt: date,
        applicantUid: null,
      }),
    } as unknown as QueryDocumentSnapshot<DocumentData>;

    it('포매팅된 알람 정보가 반환되어야만 한다', async () => {
      const result = await formatAlarm(settings);

      expect(result).toEqual({
        uid: '1',
        createdAt: nowString,
        isViewed: false,
        type: 'confirmed',
        group: GROUP_FIXTURE,
        userUid: '2',
        applicant: null,
      });
    });
  });
});
