import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';

import SignInModalContainer from './SignInModalContainer';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/api/auth/useFetchUserProfile');

describe('SignInModalContainer', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    mockReplace.mockClear();

    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: given.user,
    }));
    (useRouter as jest.Mock).mockImplementation(() => ({
      replace: mockReplace,
      query: given.query,
    }));
  });

  const renderSignInModalContainer = () => render((
    <InjectTestingRecoilState signInModalVisible={given.isVisible}>
      <SignInModalContainer />
    </InjectTestingRecoilState>
  ));

  context('로그인한 사용자인 경우', () => {
    given('user', () => 'user');

    it('아무것도 렌더링되지 않아야 한다', () => {
      const { container } = renderSignInModalContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('query에 error가 존재한 경우', () => {
    given('isVisible', () => true);
    given('query', () => ({
      error: 'OAuthAccountNotLinked',
    }));

    describe('모달창이 에러 문구와 함께 나타난다', () => {
      it('"이미 가입된 이메일입니다." 문구가 나타나야만 하고, replace가 호출되어야만 한다', () => {
        const { container } = renderSignInModalContainer();

        expect(mockReplace).toBeCalledWith('/', undefined, { shallow: true });
        expect(container).toHaveTextContent('이미 가입된 이메일입니다.');
      });
    });
  });

  context('SignIn 모달이 열린 경우', () => {
    given('isVisible', () => true);
    it('"소셜 계정으로 계속하기" 문구가 나타야만 한다', () => {
      const { container } = renderSignInModalContainer();

      expect(container).toHaveTextContent('소셜 계정으로 계속하기');
    });

    describe('"X" 버튼을 누른다', () => {
      it('아무것도 나타나지 않아야 한다', () => {
        const { container } = renderSignInModalContainer();

        fireEvent.click(screen.getByTestId('close-icon'));

        expect(container).toBeEmptyDOMElement();
      });
    });
  });

  context('SignIn 모달이 열린 경우', () => {
    given('isVisible', () => false);

    it('아무것도 나타나지 않아야 한다', () => {
      const { container } = renderSignInModalContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
