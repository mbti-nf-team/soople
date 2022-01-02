import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import SignUpPage from './signup.page';

describe('SignUpPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        user: '',
        auth: 'test',
      },
    }));
  });

  const renderHome = () => render((
    <SignUpPage />
  ));

  it('Sign Up 페이지에 대한 정보가 보여져야만 한다', () => {
    const { container } = renderHome();

    expect(container).toHaveTextContent('시작하기');
  });
});

// TODO - 추후 작업을 위해 주석을 삭제하지 않음
// describe('getServerSideProps', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//     jest.spyOn(window.console, 'log').mockImplementation(() => null);
//   });

//   const mockContext = (callbackUrl: string | null) => ({
//     query: { callbackUrl } as ParsedUrlQuery,
//   });

//   context('callbackUrl이 존재하지 않고 세션이 존재하는 경우', () => {
//     const user = {
//       user: 'user',
//     };

//     beforeEach(() => {
//       (getSession as jest.Mock).mockReturnValueOnce(user);
//     });

//     it('세션 정보가 반환되어야 한다', async () => {
//       const result = await getServerSideProps(mockContext(null) as GetServerSidePropsContext);

//       expect(result).toEqual({
//         props: {
//           ...INITIAL_STORE_FIXTURE,
//           session: user,
//         },
//       });
//     });
//   });

//   context('callbackUrl이 존재하거나 세션이 존재하지 않는 경우', () => {
//     beforeEach(() => {
//       (getSession as jest.Mock).mockReturnValueOnce(null);
//     });

//     it('세션 정보가 null이 반환되어야 한다', async () => {
//       const result = await getServerSideProps(mockContext('?go=1') as GetServerSidePropsContext);

//       expect(result).toEqual({
//         props: {
//           ...INITIAL_STORE_FIXTURE,
//           session: null,
//         },
//       });
//     });
//   });
// });
