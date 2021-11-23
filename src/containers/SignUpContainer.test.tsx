import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import SignUp from './SignUpContainer';

describe('SignUp', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        auth: 'test',
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderSignUp = () => render((
    <SignUp />
  ));

  it('SignUp 내용이 나타나야만 한다', () => {
    const { container } = renderSignUp();

    expect(container).toHaveTextContent('test');
  });
});
