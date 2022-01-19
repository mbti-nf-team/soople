import { fireEvent, render, screen } from '@testing-library/react';

import SubHeader from './SubHeader';

describe('SubHeader', () => {
  const handleGoBack = jest.fn();
  const MockComponent = () => <>Mock</>;

  const renderSubHeader = () => render((
    <SubHeader
      previousText="Test"
      goBack={handleGoBack}
    >
      <MockComponent />
    </SubHeader>
  ));

  describe('"previousText"를 클릭한다', () => {
    it('클릭 이벤트가 호출되어야만 한다', () => {
      renderSubHeader();

      fireEvent.click(screen.getByText('Test'));

      expect(handleGoBack).toBeCalledTimes(1);
    });
  });
});
