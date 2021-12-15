import { formatGroup, timestampToString } from './firestore';

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
      createAt: date,
    }),
  };

  it('포매팅된 그룹 정보가 반환되어야만 한다', () => {
    const result = formatGroup(settings);

    expect(result).toEqual({
      groupId: '1',
      createAt: nowString,
    });
  });
});
