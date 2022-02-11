import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

import {
  formatAlarm,
  formatApplicant, formatComment, formatGroup, timestampToString,
} from './firestore';

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

describe('formatApplicant', () => {
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
    const result = formatApplicant(settings);

    expect(result).toEqual({
      uid: '1',
      createdAt: nowString,
    });
  });
});

describe('formatAlarm', () => {
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

  it('포매팅된 알람 정보가 반환되어야만 한다', () => {
    const result = formatAlarm(settings);

    expect(result).toEqual({
      uid: '1',
      createdAt: nowString,
    });
  });
});
