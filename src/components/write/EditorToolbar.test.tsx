import { useActive, useChainedCommands } from '@remirror/react';
import { fireEvent, render, screen } from '@testing-library/react';

import EditorToolbar from './EditorToolbar';

jest.mock('@remirror/react');

describe('EditorToolbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useActive as jest.Mock).mockImplementation(() => ({
      bold: jest.fn().mockImplementation(() => (given.isBold)),
      heading: jest.fn(),
      italic: jest.fn(),
      underline: jest.fn(),
      strike: jest.fn(),
      codeBlock: jest.fn(),
      bulletList: jest.fn(),
      orderedList: jest.fn(),
      link: jest.fn(),
      image: jest.fn(),
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

  describe('header1 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('h1-button'));

      expect(useChainedCommands).toBeCalledTimes(1);
    });
  });

  describe('header2 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('h2-button'));

      expect(useChainedCommands).toBeCalledTimes(1);
    });
  });

  describe('header3 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('h3-button'));

      expect(useChainedCommands).toBeCalledTimes(1);
    });
  });

  describe('italic 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('italic-button'));

      expect(useChainedCommands).toBeCalledTimes(1);
    });
  });

  describe('underline 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('underline-button'));

      expect(useChainedCommands).toBeCalledTimes(1);
    });
  });

  describe('strike 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('strike-button'));

      expect(useChainedCommands).toBeCalledTimes(1);
    });
  });

  describe('코드 블록 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('code-block-button'));

      expect(useChainedCommands).toBeCalledTimes(1);
    });
  });

  describe('bullet list 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('bullet-list-button'));

      expect(useChainedCommands).toBeCalledTimes(1);
    });
  });

  describe('ordered list 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('ordered-list-button'));

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
