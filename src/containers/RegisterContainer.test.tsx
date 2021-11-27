import { render } from '@testing-library/react';

import RegisterContainer from './RegisterContainer';

describe('RegisterContainer', () => {
  const renderRegisterContainer = () => render((
    <RegisterContainer />
  ));

  it('회원가입 페이지에 대한 정보 나타나야만 한다', () => {
    const { container } = renderRegisterContainer();

    expect(container).toHaveTextContent('기본 회원 정보를 등록해주세요.');
  });
});
