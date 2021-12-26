import db from '../firebase';

import { getTagsCount, updateTagCount } from './tagsCount';

describe('tagsCount API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTagsCount', () => {
    const spyOnCollection = jest.spyOn(db, 'collection');

    beforeEach(() => {
      spyOnCollection.mockClear();
    });

    it('테그 리스트가 반환되어야만 한다', async () => {
      const response = await getTagsCount();

      expect(response).toEqual([]);
      expect(spyOnCollection).toBeCalledTimes(1);
    });
  });

  describe('updateTagCount', () => {
    const mockResponse = {
      name: 'test',
      count: 1,
    };

    const handleEvent = jest.fn();

    beforeEach(() => {
      handleEvent.mockClear();
    });

    context('exists가 true인 경우', () => {
      beforeEach(() => {
        (jest.spyOn(db, 'collection') as jest.Mock).mockImplementationOnce(() => ({
          doc: jest.fn().mockImplementationOnce(() => ({
            get: jest.fn().mockReturnValue({
              exists: true,
              data: jest.fn().mockReturnValueOnce(mockResponse),
              ref: {
                update: handleEvent,
              },
            }),
          })),
        }));
      });

      it('update가 count는 1 증가와 함께 호출되어야만 한다', async () => {
        await updateTagCount(mockResponse.name);

        expect(handleEvent).toBeCalledWith({
          count: mockResponse.count + 1,
        });
      });
    });

    context('exists가 false인 경우', () => {
      beforeEach(() => {
        (jest.spyOn(db, 'collection') as jest.Mock).mockImplementationOnce(() => ({
          doc: jest.fn().mockImplementationOnce(() => ({
            get: jest.fn().mockReturnValue({
              exists: false,
              ref: {
                set: handleEvent,
              },
            }),
          })),
        }));
      });

      it('set가 count는 1과 함께 호출되어야만 한다', async () => {
        await updateTagCount(mockResponse.name);

        expect(handleEvent).toBeCalledWith({
          name: mockResponse.name,
          count: 1,
        });
      });
    });
  });
});
