import { render } from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useGetUser from '@/hooks/api/auth/useGetUser';
import useSignUp from '@/hooks/api/auth/useSignUp';
import InjectMockProviders from '@/test/InjectMockProviders';

import SignUpPage from './signup.page';

jest.mock('@/hooks/api/auth/useGetUser');
jest.mock('@/hooks/api/auth/useSignUp');
jest.mock('@/hooks/api/auth/useFetchUserProfile');

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
