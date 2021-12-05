import db, { fireStore } from '../firebase';

import { postNewGroup } from './group';

describe('group API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('updateUserProfile', () => {
    const mockAdd = jest.fn().mockReturnValueOnce({ id: '1' });
    const createAt = '2021-11-11';
    const group = {
      title: 'title',
      contents: 'contents',
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
      const id = await postNewGroup(group);

      expect(mockAdd).toBeCalledWith({
        ...group,
        createAt,
      });
      expect(id).toBe('1');
    });
  });
});
