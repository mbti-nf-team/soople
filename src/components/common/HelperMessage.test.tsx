import { render, screen } from '@testing-library/react';

import { lightTheme } from '@/styles/theme';
import MockTheme from '@/test/MockTheme';

import HelperMessage from './HelperMessage';

describe('HelperMessage', () => {
  const renderHelperMessage = () => render((
    <MockTheme>
      <HelperMessage
        message={given.message}
        isError={given.isError}
      />
    </MockTheme>
  ));

  context('메시지가 존재하는 경우', () => {
    given('message', () => 'message');

    context('에러가 존재하는 경우', () => {
      given('isError', () => true);

      it(`색상이 ${lightTheme.warning}이어야만 한다`, () => {
        renderHelperMessage();

        expect(screen.getByText('message')).toHaveStyle({
          color: lightTheme.warning,
        });
      });
    });

    context('에러가 존재하지 않는 경우', () => {
      given('isError', () => false);

      it(`색상이 ${lightTheme.accent5}이어야만 한다`, () => {
        renderHelperMessage();

        expect(screen.getByText('message')).toHaveStyle({
          color: lightTheme.accent5,
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
