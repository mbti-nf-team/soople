import { ParsedUrlQuery } from 'querystring';

import { GetServerSidePropsContext } from 'next';

import firebaseAdmin from '../firebase/firebaseAdmin';

import authenticatedServerSideProps from './authenticatedServerSideProps';

describe('authenticatedServerSideProps', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockContext = {
    params: { id: 'id' } as ParsedUrlQuery,
  };

  context('token이 존재하는 경우', () => {
    const token = {
      uid: '1',
    };

    beforeEach(() => {
      (firebaseAdmin.auth as jest.Mock).mockImplementation(() => ({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      }));
    });

    it('정상적으로 props가 반환되어야만 한다', async () => {
      const response: any = await authenticatedServerSideProps(
        mockContext as GetServerSidePropsContext,
      );

      expect(response).toEqual({
        props: {
          userUid: token.uid,
        },
      });
    });
  });

  context('token이 존재하지 않는 경우', () => {
    const token = null;

    beforeEach(() => {
      (firebaseAdmin.auth as jest.Mock).mockImplementation(() => ({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      }));
    });

    it('redirect를 반환해야만 한다', async () => {
      const response: any = await authenticatedServerSideProps(
        mockContext as GetServerSidePropsContext,
      );

      expect(response).toEqual({
        redirect: {
          permanent: false,
          destination: '/?error=unauthenticated',
        },
        props: {},
      });
    });
  });

  context('에러가 발생하는 경우', () => {
    beforeEach(() => {
      (firebaseAdmin.auth as jest.Mock).mockImplementation(() => (new Error('Error')));
    });

    it('redirect를 반환해야만 한다', async () => {
      const response: any = await authenticatedServerSideProps(
        mockContext as GetServerSidePropsContext,
      );

      expect(response).toEqual({
        redirect: {
          permanent: false,
          destination: '/?error=unauthenticated',
        },
        props: {},
      });
    });
  });
});
