import { ParsedUrlQuery } from 'querystring';

import { render } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useGetUser from '@/hooks/api/auth/useGetUser';
import useSignUp from '@/hooks/api/auth/useSignUp';
import firebaseAdmin from '@/services/firebase/firebaseAdmin';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';
import InjectMockProviders from '@/test/InjectMockProviders';

import SignUpPage, { getServerSideProps } from './signup.page';

jest.mock('@/hooks/api/auth/useGetUser');
jest.mock('@/hooks/api/auth/useSignUp');
jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/services/serverSideProps/authenticatedServerSideProps');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    pathName: '/signup',
  })),
}));

describe('SignUpPage', () => {
  const mutate = jest.fn();

  beforeEach(() => {
    (useGetUser as jest.Mock).mockImplementation(() => ({
      data: 'test',
    }));
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: '',
    }));
    (useSignUp as jest.Mock).mockImplementation(() => ({ mutate }));
  });

  const renderHome = () => render((
    <InjectMockProviders>
      <SignUpPage />
    </InjectMockProviders>
  ));

  it('Sign Up 페이지에 대한 정보가 보여져야만 한다', () => {
    const { container } = renderHome();

    expect(container).toHaveTextContent('시작하기');
  });
});

describe('getServerSideProps', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window.console, 'log').mockImplementation(() => null);
  });

  context('로그인하지 않은 경우', () => {
    const mockContext = {
      params: { id: '' } as ParsedUrlQuery,
    };

    beforeEach(() => {
      (authenticatedServerSideProps as jest.Mock).mockImplementationOnce(() => ({
        redirect: {
          permanent: false,
          destination: '/?error=unauthenticated',
        },
        props: {},
      }));
    });

    it('redirect를 반환해야만 한다', async () => {
      const response: any = await getServerSideProps(mockContext as GetServerSidePropsContext);

      expect(response.redirect).toEqual({
        permanent: false,
        destination: '/?error=unauthenticated',
      });
    });
  });

  context('로그인한 경우', () => {
    const mockContext = {
      params: { id: '' } as ParsedUrlQuery,
    };

    beforeEach(() => {
      (authenticatedServerSideProps as jest.Mock).mockImplementationOnce(() => ({
        props: {
          userUid: 'userUid',
        },
      }));
    });

    context('회원가입한 유저인 경우', () => {
      beforeEach(() => {
        (firebaseAdmin.firestore as unknown as jest.Mock).mockImplementation(() => ({
          collection: jest.fn().mockImplementation(() => ({
            doc: jest.fn().mockImplementation(() => ({
              get: jest.fn().mockReturnValue({
                exists: true,
              }),
            })),
          })),
        }));
      });

      it('redirect를 반환해야만 한다', async () => {
        const response: any = await getServerSideProps(mockContext as GetServerSidePropsContext);

        expect(response.redirect).toEqual({
          permanent: false,
          destination: '/?error=unauthenticated',
        });
      });
    });

    context('회원가입하지 않은 유저인 경우', () => {
      beforeEach(() => {
        (firebaseAdmin.firestore as unknown as jest.Mock).mockImplementation(() => ({
          collection: jest.fn().mockImplementation(() => ({
            doc: jest.fn().mockImplementation(() => ({
              get: jest.fn().mockReturnValue({
                exists: false,
              }),
            })),
          })),
        }));
      });

      it('빈 props를 반환해야만 한다', async () => {
        const response: any = await getServerSideProps(mockContext as GetServerSidePropsContext);

        expect(response).toEqual({
          props: {},
        });
      });
    });
  });

  context('에러가 발생하는 경우', () => {
    const mockContext = {
      params: { id: '' } as ParsedUrlQuery,
    };

    beforeEach(() => {
      (authenticatedServerSideProps as jest.Mock).mockImplementationOnce(() => ({
        props: {
          userUid: 'userUid',
        },
      }));

      (firebaseAdmin.firestore as unknown as jest.Mock).mockImplementation(() => new Error('Error'));
    });

    it('redirect를 반환해야만 한다', async () => {
      const response: any = await getServerSideProps(mockContext as GetServerSidePropsContext);

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
