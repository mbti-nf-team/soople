import { act } from 'react-dom/test-utils';
import { useDispatch } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import SESSION_FIXTURE from '../../../fixtures/session';

import SignUpContainer from './SignUpContainer';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SignUpContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
    (useSession as jest.Mock).mockImplementation(() => ([given.session]));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderSignUpContainer = () => render((
    <SignUpContainer />
  ));

  context('세션 정보가 존재하는 경우', () => {
    given('session', () => (SESSION_FIXTURE));

    it('회원가입 페이지에 대한 정보 나타나야만 한다', () => {
      const { container } = renderSignUpContainer();

      expect(container).toHaveTextContent('시작하기');
    });

    describe('"확인" 버튼을 클릭한다', () => {
      const mockReplace = jest.fn();

      beforeEach(() => {
        (useRouter as jest.Mock).mockImplementationOnce(() => ({
          replace: mockReplace,
        }));
      });

      it('dispatch 액션이 호출되어야만 한다', async () => {
        renderSignUpContainer();

        await act(async () => {
          await fireEvent.submit(screen.getByText('확인'));
        });

        expect(dispatch).toBeCalled();
        expect(mockReplace).toBeCalledWith('/');
      });
    });
  });

  context('세션 정보가 존재하지 않는 경우', () => {
    given('session', () => (null));

    it('"로그인부터 진행해주세요!" 메시지가 나타나야만 한다', () => {
      const { container } = renderSignUpContainer();

      expect(container).toHaveTextContent('로그인부터 진행해주세요!');
    });
  });
});
