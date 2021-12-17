import { useDispatch } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';

import FilterBarContainer from './FilterBarContainer';

describe('FilterBarContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
  });

  const renderFilterBarContainer = () => render((
    <FilterBarContainer />
  ));

  context('filter가 존재하지 않는 경우', () => {
    it('dispatch 액션이 호출되야만 한다', () => {
      renderFilterBarContainer();

      fireEvent.change(screen.getByDisplayValue('전체'), {
        target: { value: '' },
      });

      expect(dispatch).toBeCalled();
    });
  });

  context('filter가 존재하는 경우', () => {
    it('dispatch 액션이 호출되야만 한다', () => {
      renderFilterBarContainer();

      fireEvent.change(screen.getByDisplayValue('전체'), {
        target: { value: 'study' },
      });

      expect(dispatch).toBeCalled();
    });
  });
});
