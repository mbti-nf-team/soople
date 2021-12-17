import { fireEvent, render, screen } from '@testing-library/react';

import FilterBar from './FilterBar';

describe('FilterBar', () => {
  const handleChange = jest.fn();

  const renderFilterBar = () => render((
    <FilterBar
      onChange={handleChange}
    />
  ));

  describe('select 필터의 값을 변경한다', () => {
    it('change 이벤트가 호출되어야만 한다', () => {
      renderFilterBar();

      fireEvent.change(screen.getByDisplayValue('전체'), {
        target: { value: 'study' },
      });

      expect(handleChange).toBeCalledWith('study');
    });
  });
});
