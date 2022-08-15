import { fireEvent, render, screen } from '@testing-library/react';

import FilterBar from './FilterBar';

describe('FilterBar', () => {
  const handleChange = jest.fn();

  const renderFilterBar = () => render((
    <FilterBar
      filterCategory={['study', 'project']}
      onChange={handleChange}
    />
  ));

  describe('select 필터의 값을 변경한다', () => {
    it('change 이벤트가 호출되어야만 한다', () => {
      renderFilterBar();

      const input = screen.getByRole('combobox');

      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown', code: 40 });
      fireEvent.click(screen.getByText('스터디'));

      expect(handleChange).toBeCalledWith('study');
    });
  });
});
