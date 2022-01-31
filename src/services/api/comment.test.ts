import {
  addDoc, deleteDoc, getDocs, serverTimestamp,
} from 'firebase/firestore';

import { CommentFields } from '@/models/group';
import { formatComment } from '@/utils/firestore';

import COMMENT_FIXTURE from '../../../fixtures/comment';
import PROFILE_FIXTURE from '../../../fixtures/profile';
import { collectionRef } from '../firebase';

import { deleteGroupComment, getGroupComments, postGroupComment } from './comment';

jest.mock('../firebase');
jest.mock('@/utils/firestore');

describe('comment API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('postGroupComment', () => {
    const collection = 'collectionRef';
    const createdAt = '2021-11-11';

    const comment: CommentFields = {
      groupId: '1',
      content: 'content',
      writer: PROFILE_FIXTURE,
    };

    beforeEach(() => {
      (collectionRef as jest.Mock).mockReturnValueOnce(collection);
      (addDoc as jest.Mock).mockImplementation(() => ({
        id: '1',
      }));

      (serverTimestamp as jest.Mock).mockReturnValueOnce(createdAt);
    });

    it('addDoc 함수가 호출되어야만 한다', async () => {
      const id = await postGroupComment(comment);

      expect(addDoc).toBeCalledWith(collection, {
        ...comment,
        createdAt,
      });

      expect(id).toBe('1');
    });
  });

  describe('getGroupComments', () => {
    beforeEach(() => {
      (getDocs as jest.Mock).mockImplementationOnce(() => ({
        docs: [COMMENT_FIXTURE],
      }));
      (formatComment as jest.Mock).mockReturnValueOnce(COMMENT_FIXTURE);
    });

    it('댓글 리스트가 반환되어야만 한다', async () => {
      const response = await getGroupComments('groupId');

      expect(response).toEqual([COMMENT_FIXTURE]);
      expect(getDocs).toBeCalledTimes(1);
    });
  });

  describe('deleteGroupComment', () => {
    it('"deleteDoc"이 호출되어야만 한다', async () => {
      await deleteGroupComment('commentId');

      expect(deleteDoc).toBeCalledTimes(1);
    });
  });
});
