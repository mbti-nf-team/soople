import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';

import Home from './HomeContainer';

describe('Home', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        auth: '',
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderHome = () => render((
    <Home />
  ));

  describe('버튼을 클릭한다', () => {
    it('디스패치 액션이 호출되야만 한다', () => {
      renderHome();

      fireEvent.click(screen.getByText('버튼'));

      expect(dispatch).toBeCalledWith({ payload: 'test', type: 'auth/setAuth' });
    });
  });
});
