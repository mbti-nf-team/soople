import { fireEvent, render, screen } from '@testing-library/react';

import SwitchButton from './SwitchButton';

describe('SwitchButton', () => {
  const handleChange = jest.fn();

  const renderSwitchButton = () => render((
    <SwitchButton
      onChange={handleChange}
      defaultChecked
    />
  ));

  describe('버튼을 클릭한다', () => {
    it('change 이벤트가 발생해야만 한다', () => {
      renderSwitchButton();

      fireEvent.click(screen.getByTestId('switch-button'));

      expect(handleChange).toBeCalledTimes(1);
    });
  });
});
