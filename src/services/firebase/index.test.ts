import { signInWithRedirect } from 'firebase/auth';
import { collection, doc } from 'firebase/firestore';
import { ref } from 'firebase/storage';

import {
  collectionRef, docRef, googleProvider, signInRedirectOAuth, storageRef,
} from '.';

describe('firebase', () => {
  describe('collectionRef', () => {
    it('collection이 호출되어야만 한다', () => {
      collectionRef('id');

      expect(collection).toHaveBeenCalledWith(undefined, 'id');
    });
  });

  describe('docRef', () => {
    it('doc이 호출되어야만 한다', () => {
      docRef('collectionId', 'id');

      expect(doc).toHaveBeenCalledWith(undefined, 'collectionId', 'id');
    });
  });

  describe('signInRedirectOAuth', () => {
    it('signInWithRedirect가 호출되어야만 한다', () => {
      signInRedirectOAuth(googleProvider);

      expect(signInWithRedirect).toHaveBeenCalledWith({ languageCode: 'ko' }, googleProvider);
    });
  });

  describe('storageRef', () => {
    const url = 'www.test.com';

    it('ref가 호출되어야만 한다', () => {
      storageRef(url);

      expect(ref).toHaveBeenCalledWith(undefined, url);
    });
  });
});
