import { render } from '@testing-library/react';

import SignInError from './SignInError';

describe('SignInError', () => {
  const renderSignInError = () => render((
    <SignInError error={given.error} />
  ));

  context('에러가 존재하는 경우', () => {
    context('에러가 "OAuthAccountNotLinked"가 아닌 경우', () => {
      given('error', () => 'error');

      it('"로그인에 실패하였습니다." 문구가 나타나야만 한다', () => {
        const { container } = renderSignInError();

        expect(container).toHaveTextContent('로그인에 실패하였습니다.');
      });
    });

    context('에러가 "OAuthAccountNotLinked"인 경우', () => {
      given('error', () => 'OAuthAccountNotLinked');

      it('"이미 가입된 이메일입니다." 문구가 나타나야만 한다', () => {
        const { container } = renderSignInError();

        expect(container).toHaveTextContent('이미 가입된 이메일입니다.');
      });
    });
  });

  context('에려가 존재하지 않는 경우', () => {
    given('error', () => '');

    it('아무것도 렌더링되지 않아야 한다', () => {
      const { container } = renderSignInError();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
