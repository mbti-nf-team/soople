import { ParsedUrlQuery } from 'querystring';

import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/client';

import { getServerSideProps } from './signup.page';

describe('SignUpPage', () => {
  const initialStore = {
    initialState: {
      authReducer: {
        auth: null,
        authError: null,
        user: 'user',
        isVisible: false,
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

  describe('getServerSideProps', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.spyOn(window.console, 'log').mockImplementation(() => null);
    });

    const mockContext = (callbackUrl: string | null) => ({
      query: { callbackUrl } as ParsedUrlQuery,
    });

    context('callbackUrl이 존재하지 않고 세션이 존재하는 경우', () => {
      const user = {
        user: 'user',
      };

      beforeEach(() => {
        (getSession as jest.Mock).mockReturnValueOnce(user);
      });

      it('세션 정보가 반환되어야 한다', async () => {
        const result = await getServerSideProps(mockContext(null) as GetServerSidePropsContext);

        expect(result).toEqual({
          props: {
            ...initialStore,
            session: user,
          },
        });
      });
    });

    context('callbackUrl이 존재하거나 세션이 존재하지 않는 경우', () => {
      beforeEach(() => {
        (getSession as jest.Mock).mockReturnValueOnce(null);
      });

      it('세션 정보가 null이 반환되어야 한다', async () => {
        const result = await getServerSideProps(mockContext('?go=1') as GetServerSidePropsContext);

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
