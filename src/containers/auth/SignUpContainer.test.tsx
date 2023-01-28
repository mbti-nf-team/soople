import { act } from 'react-dom/test-utils';

import { fireEvent, render, screen } from '@testing-library/react';

import useGetUser from '@/hooks/api/auth/useGetUser';
import useSignUp from '@/hooks/api/auth/useSignUp';

import PROFILE_FIXTURE from '../../../fixtures/profile';

import SignUpContainer from './SignUpContainer';

jest.mock('@/hooks/api/auth/useGetUser');
jest.mock('@/hooks/api/auth/useSignUp');

describe('SignUpContainer', () => {
  const mutate = jest.fn();

  beforeEach(() => {
    mutate.mockClear();

    (useGetUser as jest.Mock).mockImplementation(() => ({
      data: given.auth,
      isSuccess: given.isSuccess,
    }));
    (useSignUp as jest.Mock).mockImplementation(() => ({ mutate }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderSignUpContainer = () => render((
    <SignUpContainer />
  ));

  context('isSuccess가 false인 경우', () => {
    given('isSuccess', () => false);

    it('아무것도 나타나지 않아야만 한다', () => {
      const { container } = renderSignUpContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('isSuccess가 true인 경우', () => {
    given('isSuccess', () => true);
    given('auth', () => ({
      ...PROFILE_FIXTURE,
      displayName: PROFILE_FIXTURE.name,
      photoURL: PROFILE_FIXTURE.image,
    }));

    it('회원가입 페이지에 대한 정보 나타나야만 한다', async () => {
      const { container } = renderSignUpContainer();

      await act(() => expect(container).toHaveTextContent('시작하기'));
    });

    describe('"확인" 버튼을 클릭한다', () => {
      it('submit 액션이 호출되어야만 한다', async () => {
        renderSignUpContainer();

        const input = screen.getByRole('combobox');

        fireEvent.focus(input);
        fireEvent.keyDown(input, { key: 'ArrowDown', code: 40 });
        fireEvent.click(screen.getByText('프론트엔드'));

        await act(async () => {
          await fireEvent.submit(screen.getByText('확인'));
        });

        expect(mutate).toHaveBeenCalledWith({
          ...PROFILE_FIXTURE,
          portfolioUrl: '',
          position: '프론트엔드',
        });
      });
    });
  });
});
