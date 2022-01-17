import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';
import { useRouter } from 'next/router';

import GROUP_FIXTURE from '../../fixtures/group';

import HomePage from './index.page';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('HomePage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        user: null,
      },
      groupReducer: {
        groups: [GROUP_FIXTURE],
        tagsCount: [],
      },
    }));
    (useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/',
      query: {
        error: null,
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

// describe('getServerSideProps', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//     jest.spyOn(window.console, 'log').mockImplementation(() => null);
//   });

//   const mockContext = {
//     params: { id: 'test' } as ParsedUrlQuery,
//   };

//   context('세션이 존재할 경우', () => {
//     beforeEach(() => {
//       (getSession as jest.Mock).mockReturnValueOnce({
//         user: 'user',
//       });
//     });

//     it('세션 정보와 store 정보가 반환되어야 한다', async () => {
//       const result = await getServerSideProps(mockContext as GetServerSidePropsContext);

//       expect(result).toEqual({
//         props: {
//           ...INITIAL_STORE_FIXTURE,
//           session: {
//             user: 'user',
//           },
//         },
//       });
//     });
//   });

//   context('세션이 존재하지 않은 경우', () => {
//     beforeEach(() => {
//       (getSession as jest.Mock).mockReturnValueOnce(null);
//     });

//     it('세션 정보가 undefined를 반환해야만 한다', async () => {
//       const result = await getServerSideProps(mockContext as GetServerSidePropsContext);

//       expect(result).toEqual({
//         props: {
//           ...INITIAL_STORE_FIXTURE,
//           session: null,
//         },
//       });
//     });
//   });
// });
