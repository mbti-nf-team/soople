import { render, screen } from '@testing-library/react';

import palette from '@/styles/palette';

import HelperMessage from './HelperMessage';

describe('HelperMessage', () => {
  const renderHelperMessage = () => render((
    <HelperMessage
      message={given.message}
      isError={given.isError}
    />
  ));

  context('메시지가 존재하는 경우', () => {
    given('message', () => 'message');

    context('에러가 존재하는 경우', () => {
      given('isError', () => true);

      it(`색상이 ${palette.warning}이어야만 한다`, () => {
        renderHelperMessage();

        expect(screen.getByText('message')).toHaveStyle({
          color: palette.warning,
        });
      });
    });

    context('에러가 존재하지 않는 경우', () => {
      given('isError', () => false);

      it(`색상이 ${palette.accent5}이어야만 한다`, () => {
        renderHelperMessage();

        expect(screen.getByText('message')).toHaveStyle({
          color: palette.accent5,
        });
      });
    });
  });

  context('메시지가 존재하지 않는 경우', () => {
    given('message', () => null);

    it('아무것도 보이지 않아야만 한다', () => {
      const { container } = renderHelperMessage();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
