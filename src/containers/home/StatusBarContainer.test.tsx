import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';

import StatusBarContainer from './StatusBarContainer';

describe('StatusBarContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      groupReducer: {
        tagsCount: [],
      },
    }));
  });

  const renderStatusBarContainer = () => render((
    <StatusBarContainer />
  ));

  it('초기 렌더링에 dispatch 액션이 호출되어야만 한다', () => {
    renderStatusBarContainer();

    expect(dispatch).toBeCalledTimes(1);
  });

  context('filter가 존재하지 않는 경우', () => {
    it('dispatch 액션이 호출되야만 한다', () => {
      renderStatusBarContainer();

      fireEvent.change(screen.getByDisplayValue('전체'), {
        target: { value: '' },
      });

      expect(dispatch).toBeCalled();
    });
  });

  context('filter가 존재하는 경우', () => {
    it('dispatch 액션이 호출되야만 한다', () => {
      renderStatusBarContainer();

      fireEvent.change(screen.getByDisplayValue('전체'), {
        target: { value: 'study' },
      });

      expect(dispatch).toBeCalled();
    });
  });
});
