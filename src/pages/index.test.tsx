import { ParsedUrlQuery } from 'querystring';

import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/client';

import { getServerSideProps } from './index.page';

describe('Home', () => {
  const initialStore = {
    initialState: {
      authReducer: {
        auth: null,
        authError: null,
        user: 'user',
      },
      groupReducer: {
        groupError: null,
        groupId: null,
        writeFields: {
          contents: '',
          title: '',
        },
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window.console, 'log').mockImplementation(() => null);
  });

  describe('getServerSideProps', () => {
    const mockContext = {
      params: { id: 'test' } as ParsedUrlQuery,
    };

    context('세션이 존재할 경우', () => {
      beforeEach(() => {
        (getSession as jest.Mock).mockReturnValueOnce({
          user: 'user',
        });
      });

      it('세션 정보와 store 정보가 반환되어야 한다', async () => {
        const result = await getServerSideProps(mockContext as GetServerSidePropsContext);

        expect(result).toEqual({
          props: {
            ...initialStore,
            session: {
              user: 'user',
            },
          },
        });
      });
    });

    context('세션이 존재하지 않은 경우', () => {
      beforeEach(() => {
        (getSession as jest.Mock).mockReturnValueOnce(null);
      });

      it('세션 정보가 undefined를 반환해야만 한다', async () => {
        const result = await getServerSideProps(mockContext as GetServerSidePropsContext);

        expect(result).toEqual({
          props: {
            ...initialStore,
            session: null,
          },
        });
      });
    });
  });
});
