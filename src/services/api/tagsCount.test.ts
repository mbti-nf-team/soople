import {
  getDoc, getDocs, setDoc, updateDoc,
} from 'firebase/firestore';

import { getTagsCount, updateTagCount } from './tagsCount';

jest.mock('../firebase');

describe('tagsCount API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTagsCount', () => {
    const tagsCount = [
      { name: 'test', count: 1 },
    ];

    beforeEach(() => {
      (getDocs as jest.Mock).mockImplementationOnce(() => ({
        docs: tagsCount,
      }));
    });

    it('테그 리스트가 반환되어야만 한다', async () => {
      const response = await getTagsCount();

      expect(response).toEqual(tagsCount);
    });
  });

  describe('updateTagCount', () => {
    const mockResponse = {
      name: 'test',
      count: 1,
    };
    const ref = 'ref';

    context('exists가 true인 경우', () => {
      beforeEach(() => {
        (getDoc as jest.Mock).mockImplementationOnce(() => ({
          exists: jest.fn().mockReturnValueOnce(true),
          data: jest.fn().mockReturnValueOnce(mockResponse),
          ref,
        }));
      });

      it('update가 count는 1 증가와 함께 호출되어야만 한다', async () => {
        await updateTagCount(mockResponse.name);

        expect(updateDoc).toBeCalledWith(ref, {
          count: mockResponse.count + 1,
        });
      });
    });

    context('exists가 false인 경우', () => {
      beforeEach(() => {
        (getDoc as jest.Mock).mockImplementationOnce(() => ({
          exists: jest.fn().mockReturnValueOnce(false),
          data: jest.fn().mockReturnValueOnce(mockResponse),
          ref,
        }));
      });

      it('set가 count는 1과 함께 호출되어야만 한다', async () => {
        await updateTagCount(mockResponse.name);

        expect(setDoc).toBeCalledWith(ref, {
          name: mockResponse.name,
          count: 1,
        });
      });
    });
  });
});
