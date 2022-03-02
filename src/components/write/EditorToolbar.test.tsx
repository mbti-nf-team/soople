import { useActive, useChainedCommands } from '@remirror/react';
import { fireEvent, render, screen } from '@testing-library/react';

import EditorToolbar from './EditorToolbar';

jest.mock('@remirror/react', () => ({
  useChainedCommands: jest.fn().mockImplementation(() => ({
    toggleBold: jest.fn().mockImplementation(() => ({
      focus: jest.fn().mockImplementation(() => ({
        run: jest.fn(),
      })),
    })),
  })),
  useActive: jest.fn(),
}));

describe('EditorToolbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useActive as jest.Mock).mockImplementation(() => ({
      bold: jest.fn().mockImplementation(() => (given.isBold)),
    }));
  });

  const renderEditorToolbar = () => render((
    <EditorToolbar />
  ));

  describe('bold 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('bold-button'));

      expect(useChainedCommands).toBeCalledTimes(1);
    });
  });

  context('active.bold가 true인 경우', () => {
    given('isBold', () => true);

    it('bold 버튼의 배경색이 "rgba(0, 0, 0, 0.1)"가 되어야만 한다', () => {
      renderEditorToolbar();

      expect(screen.getByTestId('bold-button')).toHaveStyle({
        background: 'rgba(0, 0, 0, 0.1)',
      });
    });
  });
});
