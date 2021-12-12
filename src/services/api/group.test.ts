import { WriteFields } from '@/models/group';
import { getGroupDetail, postNewGroup } from '@/services/api/group';

import db, { fireStore } from '../firebase';

jest.mock('@/utils/utils');

describe('group API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('updateUserProfile', () => {
    const mockAdd = jest.fn().mockReturnValueOnce({ id: '1' });
    const createAt = '2021-11-11';
    const userUid = 'userUid';

    const group: WriteFields = {
      title: 'title',
      contents: 'contents',
      tags: [],
      category: '',
      recruitmentEndDate: '',
      recruitmentEndSetting: 'automatic',
      recruitmentNumber: 1,
    };

    beforeEach(() => {
      (jest.spyOn(db, 'collection') as jest.Mock).mockImplementationOnce(() => ({
        add: mockAdd,
      }));

      fireStore.FieldValue = {
        serverTimestamp: jest.fn().mockReturnValueOnce(createAt),
      } as any;
    });

    it('update 함수가 호출되어야만 한다', async () => {
      const id = await postNewGroup(userUid, group);

      expect(mockAdd).toBeCalledWith({
        ...group,
        writerUid: userUid,
        createAt,
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
        (jest.spyOn(db, 'collection') as jest.Mock).mockImplementationOnce(() => ({
          doc: jest.fn().mockImplementationOnce(() => ({
            get: jest.fn().mockReturnValue({
              exists: true,
              data: jest.fn().mockReturnValueOnce(mockResponse),
            }),
          })),
        }));
      });

      it('해당 detail 글 정보가 나타나야만 한다', async () => {
        const response = await getGroupDetail('id');

        expect(response).toEqual(mockResponse);
      });
    });

    context('exists가 false인 경우', () => {
      beforeEach(() => {
        (jest.spyOn(db, 'collection') as jest.Mock).mockImplementationOnce(() => ({
          doc: jest.fn().mockImplementationOnce(() => ({
            get: jest.fn().mockReturnValue({
              exists: false,
            }),
          })),
        }));
      });

      it('null을 반환해야만 한다', async () => {
        const response = await getGroupDetail('id');

        expect(response).toBeNull();
      });
    });
  });
});
