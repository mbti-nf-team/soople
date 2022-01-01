import { collection, doc } from 'firebase/firestore';

import { collectionRef, docRef } from '.';

describe('firebase', () => {
  describe('collectionRef', () => {
    it('collection이 호출되어야만 한다', () => {
      collectionRef('id');

      expect(collection).toBeCalledWith(undefined, 'id');
    });
  });

  describe('docRef', () => {
    it('doc이 호출되어야만 한다', () => {
      docRef('collectionId', 'id');

      expect(doc).toBeCalledWith(undefined, 'collectionId', 'id');
    });
  });
});
