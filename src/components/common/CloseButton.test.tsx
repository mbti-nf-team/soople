import { fireEvent, render, screen } from '@testing-library/react';

import CloseButton from './CloseButton';

describe('CloseButton', () => {
  const handleClick = jest.fn();

  const renderCloseButton = () => render((
    <CloseButton
      closeToast={handleClick}
    />
  ));

  describe('닫기 아이콘을 클릭한다', () => {
    it('클릭 이벤트가 발생해야만 한다', () => {
      renderCloseButton();

      fireEvent.click(screen.getByTestId('close-icon'));

      expect(handleClick).toBeCalledTimes(1);
    });
  });
});
