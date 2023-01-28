import {
  addDoc, deleteDoc, getDocs, serverTimestamp,
} from 'firebase/firestore';

import { CommentFields } from '@/models/group';
import { formatComment, isLessThanPerPage } from '@/utils/firestore';

import COMMENT_FIXTURE from '../../../fixtures/comment';
import PROFILE_FIXTURE from '../../../fixtures/profile';
import { collectionRef } from '../firebase';

import {
  deleteGroupComment, getGroupCommentCount, getGroupComments, postGroupComment,
} from './comment';

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

      expect(addDoc).toHaveBeenCalledWith(collection, {
        ...comment,
        createdAt,
      });

      expect(id).toBe('1');
    });
  });

  describe('getGroupCommentCount', () => {
    beforeEach(() => {
      (getDocs as jest.Mock).mockImplementationOnce(() => ({
        docs: [COMMENT_FIXTURE],
        size: 1,
      }));
      (formatComment as jest.Mock).mockReturnValueOnce(COMMENT_FIXTURE);
    });

    it('댓글 개수를 반환되어야만 한다', async () => {
      const response = await getGroupCommentCount('groupId');

      expect(response).toBe(1);
    });
  });

  describe('getGroupComments', () => {
    const lastVisibleId = 'lastVisibleId';

    context('"lastUid"가 존재하지 않는 경우', () => {
      beforeEach(() => {
        (getDocs as jest.Mock).mockImplementationOnce(() => ({
          docs: [{
            ...COMMENT_FIXTURE,
            id: lastVisibleId,
          }],
        }));
        (formatComment as jest.Mock).mockReturnValueOnce(COMMENT_FIXTURE);
      });

      it('댓글 리스트가 반환되어야만 한다', async () => {
        const response = await getGroupComments('groupId', {
          perPage: 10,
        });

        expect(response).toEqual({
          items: [COMMENT_FIXTURE],
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
              ...COMMENT_FIXTURE,
              id: lastVisibleId,
            }],
          }));
          (formatComment as jest.Mock).mockReturnValueOnce(COMMENT_FIXTURE);
          (isLessThanPerPage as jest.Mock).mockImplementationOnce(
            () => jest.fn().mockReturnValueOnce(true),
          );
        });

        it('댓글 리스트가 반환되어야만 한다', async () => {
          const response = await getGroupComments('groupId', {
            lastUid: lastVisibleId,
          });

          expect(response).toEqual({
            items: [COMMENT_FIXTURE],
          });
        });
      });

      context('empty가 false이고 docs 길이가 perPage보다 클 경우', () => {
        beforeEach(() => {
          (getDocs as jest.Mock).mockImplementationOnce(() => ({
            empty: false,
            docs: [{
              ...COMMENT_FIXTURE,
              id: lastVisibleId,
            }],
          }));
          (formatComment as jest.Mock).mockReturnValueOnce(COMMENT_FIXTURE);
        });

        it('댓글 리스트가 반환되어야만 한다', async () => {
          const response = await getGroupComments('groupId', {
            perPage: 0,
            lastUid: lastVisibleId,
          });

          expect(response).toEqual({
            items: [COMMENT_FIXTURE],
            lastUid: lastVisibleId,
          });
        });
      });
    });
  });

  describe('deleteGroupComment', () => {
    it('"deleteDoc"이 호출되어야만 한다', async () => {
      await deleteGroupComment('commentId');

      expect(deleteDoc).toHaveBeenCalledTimes(1);
    });
  });
});
