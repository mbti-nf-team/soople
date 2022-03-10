import { deleteObject, getDownloadURL, uploadBytes } from 'firebase/storage';

import { storageRef } from '../firebase';

import { deleteGroupThumbnail, uploadGroupThumbnail } from './storage';

jest.mock('../firebase');
jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => '12345'),
}));

describe('storage API', () => {
  const thumbnailUrl = 'www.test.com';

  describe('uploadGroupThumbnail', () => {
    beforeEach(() => {
      (storageRef as jest.Mock).mockImplementationOnce(() => ('thumbnail'));
      (uploadBytes as jest.Mock).mockImplementation(() => ({
        ref: jest.fn(),
      }));
      (getDownloadURL as jest.Mock).mockImplementation(() => thumbnailUrl);
    });

    it('썸네일 URL 주소가 반환되어야만 한다', async () => {
      const response = await uploadGroupThumbnail({
        userUid: 'userUid',
        thumbnail: { name: 'thumbnail' } as File,
      });

      expect(response).toBe(thumbnailUrl);
    });
  });

  describe('deleteGroupThumbnail', () => {
    beforeEach(() => {
      (storageRef as jest.Mock).mockImplementationOnce(() => (thumbnailUrl));
    });

    it('deleteObject가 호출되어야만 한다', async () => {
      await deleteGroupThumbnail(thumbnailUrl);

      expect(deleteObject).toBeCalledWith(thumbnailUrl);
    });
  });
});
