import { deleteObject, getDownloadURL, uploadBytes } from 'firebase/storage';

import { storageRef } from '../firebase';

import { deleteStorageFile, uploadStorageFile } from './storage';

jest.mock('../firebase');
jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => '12345'),
}));

describe('storage API', () => {
  const fileUrl = 'www.test.com';

  describe('uploadStorageFile', () => {
    beforeEach(() => {
      (storageRef as jest.Mock).mockImplementationOnce(() => ('thumbnail'));
      (uploadBytes as jest.Mock).mockImplementation(() => ({
        ref: jest.fn(),
      }));
      (getDownloadURL as jest.Mock).mockImplementation(() => fileUrl);
    });

    it('썸네일 URL 주소가 반환되어야만 한다', async () => {
      const response = await uploadStorageFile({
        storagePath: '/test/1',
        file: { name: 'thumbnail' } as File,
      });

      expect(response).toBe(fileUrl);
    });
  });

  describe('deleteStorageFile', () => {
    beforeEach(() => {
      (storageRef as jest.Mock).mockImplementationOnce(() => (fileUrl));
    });

    it('deleteObject가 호출되어야만 한다', async () => {
      await deleteStorageFile(fileUrl);

      expect(deleteObject).toBeCalledWith(fileUrl);
    });
  });
});
