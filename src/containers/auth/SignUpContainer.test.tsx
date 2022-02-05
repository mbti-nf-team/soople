import { act } from 'react-dom/test-utils';

import { fireEvent, render, screen } from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useGetUser from '@/hooks/api/auth/useGetUser';
import useSignUp from '@/hooks/api/auth/useSignUp';

import PROFILE_FIXTURE from '../../../fixtures/profile';

import SignUpContainer from './SignUpContainer';

jest.mock('@/hooks/api/auth/useGetUser');
jest.mock('@/hooks/api/auth/useSignUp');
jest.mock('@/hooks/api/auth/useFetchUserProfile');

describe('SignUpContainer', () => {
  const mutate = jest.fn();

  beforeEach(() => {
    mutate.mockClear();

    (useGetUser as jest.Mock).mockImplementation(() => ({
      data: given.auth,
    }));
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: given.user,
    }));
    (useSignUp as jest.Mock).mockImplementation(() => ({ mutate }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderSignUpContainer = () => render((
    <SignUpContainer />
  ));

  context('로그인한 사용자인 경우', () => {
    given('user', () => (PROFILE_FIXTURE));

    it('"이미 가입이 완료되었어요!" 문구가 나타나야 한다', () => {
      const { container } = renderSignUpContainer();

      expect(container).toHaveTextContent('이미 가입이 완료되었어요!');
    });
  });

  context('처음 가입한 사용자인 경우', () => {
    context('auth 정보가 존재하는 경우', () => {
      given('auth', () => ({
        ...PROFILE_FIXTURE,
        displayName: PROFILE_FIXTURE.name,
        photoURL: PROFILE_FIXTURE.image,
      }));

      it('회원가입 페이지에 대한 정보 나타나야만 한다', () => {
        const { container } = renderSignUpContainer();

        expect(container).toHaveTextContent('시작하기');
      });

      describe('"확인" 버튼을 클릭한다', () => {
        it('submit 액션이 호출되어야만 한다', async () => {
          renderSignUpContainer();

          await act(async () => {
            await fireEvent.change(screen.getByDisplayValue(/포지션을 션택하세요/), {
              target: { value: 'frontEnd' },
            });
            await fireEvent.submit(screen.getByText('확인'));
          });

          expect(mutate).toBeCalledWith({
            ...PROFILE_FIXTURE,
            portfolioUrl: '',
            position: 'frontEnd',
          });
        });
      });
    });
  });

  context('로그인하지 않은 사용자인 경우', () => {
    given('user', () => (null));

    it('"로그인부터 진행해주세요!" 메시지가 나타나야만 한다', () => {
      const { container } = renderSignUpContainer();

      expect(container).toHaveTextContent('로그인부터 진행해주세요!');
    });
  });
});
