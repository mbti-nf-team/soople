import { ParsedUrlQuery } from 'querystring';

import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/client';

import GROUP_FIXTURE from '../../fixtures/group';
import INITIAL_STORE_FIXTURE from '../../fixtures/initialStore';

import HomePage, { getServerSideProps } from './index.page';

describe('HomePage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (useSession as jest.Mock).mockImplementationOnce(() => ([null]));
    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      groupReducer: {
        groups: [GROUP_FIXTURE],
      },
    }));
  });

  const renderHome = () => render((
    <HomePage />
  ));

  it('홈에 대한 정보가 보여져야만 한다', () => {
    const { container } = renderHome();

    expect(container).toHaveTextContent('시작하기');
  });
});

describe('getServerSideProps', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window.console, 'log').mockImplementation(() => null);
  });

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
          ...INITIAL_STORE_FIXTURE,
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
          ...INITIAL_STORE_FIXTURE,
          session: null,
        },
      });
    });
  });
});
