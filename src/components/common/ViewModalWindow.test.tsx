import { act, fireEvent, screen } from '@testing-library/react';

import InjectMockProviders from '@/test/InjectMockProviders';
import renderWithPortal from '@/test/renderWithPortal';

import ViewModalWindow from './ViewModalWindow';

describe('ViewModalWindow', () => {
  const handleClose = jest.fn();
  const MockComponent = () => <>Test</>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  const renderViewModalWindow = () => renderWithPortal((
    <InjectMockProviders>
      <ViewModalWindow
        isVisible={given.isVisible}
        title="제목"
        onClose={handleClose}
      >
        <MockComponent />
      </ViewModalWindow>
    </InjectMockProviders>
  ));

  context('isVisible이 true인 경우', () => {
    given('isVisible', () => true);

    describe('"x" 아이콘을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderViewModalWindow();

        fireEvent.click(screen.getByTestId('close-icon'));

        expect(handleClose).toBeCalledTimes(1);
      });
    });
  });

  context('isVisible이 false인 경우', () => {
    given('isVisible', () => false);

    it('아무것도 나타나지 않아야만 한다', async () => {
      const { container } = renderViewModalWindow();

      await act(async () => {
        jest.advanceTimersByTime(400);
      });

      expect(container).toBeEmptyDOMElement();
    });
  });
});
