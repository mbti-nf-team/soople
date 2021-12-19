import { CommentFields } from '@/models/group';

import PROFILE_FIXTURE from '../../../fixtures/profile';
import db, { fireStore } from '../firebase';

import { getGroupComments, postGroupComment } from './comment';

describe('postGroupComment', () => {
  const mockAdd = jest.fn().mockReturnValueOnce({ id: '1' });
  const createdAt = '2021-11-11';

  const comment: CommentFields = {
    groupId: '1',
    content: 'content',
    writer: PROFILE_FIXTURE,
  };

  beforeEach(() => {
    (jest.spyOn(db, 'collection') as jest.Mock).mockImplementationOnce(() => ({
      add: mockAdd,
    }));

    fireStore.FieldValue = {
      serverTimestamp: jest.fn().mockReturnValueOnce(createdAt),
    } as any;
  });

  it('update 함수가 호출되어야만 한다', async () => {
    const id = await postGroupComment(comment);

    expect(mockAdd).toBeCalledWith({
      ...comment,
      createdAt,
    });

    expect(id).toBe('1');
  });
});

describe('getGroupComments', () => {
  const spyOnCollection = jest.spyOn(db, 'collection');

  beforeEach(() => {
    spyOnCollection.mockClear();
  });

  it('댓글 리스트가 반환되어야만 한다', async () => {
    const response = await getGroupComments('groupId');

    expect(response).toEqual([]);
    expect(spyOnCollection).toBeCalledTimes(1);
  });
});
