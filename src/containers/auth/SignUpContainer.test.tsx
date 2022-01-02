import { act } from 'react-dom/test-utils';
import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import PROFILE_FIXTURE from '../../../fixtures/profile';

import SignUpContainer from './SignUpContainer';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SignUpContainer', () => {
  const dispatch = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    mockReplace.mockClear();

    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        user: given.user,
        auth: given.auth,
      },
    }));
    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
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
      given('auth', () => (PROFILE_FIXTURE));

      it('회원가입 페이지에 대한 정보 나타나야만 한다', () => {
        const { container } = renderSignUpContainer();

        expect(container).toHaveTextContent('시작하기');
      });

      describe('"확인" 버튼을 클릭한다', () => {
        beforeEach(() => {
          (useRouter as jest.Mock).mockImplementationOnce(() => ({
            replace: mockReplace,
          }));
        });

        it('dispatch 액션이 호출되어야만 한다', async () => {
          renderSignUpContainer();

          await act(async () => {
            await fireEvent.change(screen.getByDisplayValue(/포지션을 션택하세요/), {
              target: { value: 'frontEnd' },
            });
            await fireEvent.submit(screen.getByText('확인'));
          });

          expect(dispatch).toBeCalled();
          expect(mockReplace).toBeCalledWith('/');
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
