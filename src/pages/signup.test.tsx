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
