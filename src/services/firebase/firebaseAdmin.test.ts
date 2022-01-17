import firebaseAdmin from '@/services/firebase/firebaseAdmin';

jest.mock('firebase-admin', () => ({
  apps: {
    length: 2,
  },
  initializeApp: jest.fn(),
}));

describe('firebaseAdmin', () => {
  context('apps의 길이가 0보다 클 때', () => {
    it('"initializeApp"은 호출되지 않아야만 한다', () => {
      expect(firebaseAdmin.initializeApp).not.toBeCalled();
    });
  });
});
