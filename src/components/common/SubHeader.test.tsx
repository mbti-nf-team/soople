import { fireEvent, render, screen } from '@testing-library/react';

import SubHeader from './SubHeader';

describe('SubHeader', () => {
  const handleGoBack = jest.fn();
  const MockComponent = () => <>Mock</>;

  const renderSubHeader = () => render((
    <SubHeader
      previousText={given.previousText}
      goBack={handleGoBack}
    >
      <MockComponent />
    </SubHeader>
  ));

  context('previousText가 존재하는 경우', () => {
    given('previousText', () => 'Test');

    describe('"previousText"를 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderSubHeader();

        fireEvent.click(screen.getByTestId('go-back-title'));

        expect(handleGoBack).toHaveBeenCalledTimes(1);
      });
    });
  });

  context('previousText가 존재하지 않는 경우', () => {
    given('previousText', () => undefined);

    it('opacity값은 0이어만 한다', () => {
      renderSubHeader();

      expect(screen.getByTestId('go-back-title')).toHaveStyle({
        opacity: 0,
      });
    });
  });
});
