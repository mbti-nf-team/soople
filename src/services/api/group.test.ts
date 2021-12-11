import { WriteFields } from '@/models/group';

import db, { fireStore } from '../firebase';

import { postNewGroup } from './group';

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
});
