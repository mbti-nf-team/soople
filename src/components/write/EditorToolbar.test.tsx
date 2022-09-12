import { useActive, useChainedCommands } from '@remirror/react';
import {
  act, fireEvent, render, screen,
} from '@testing-library/react';

import { lightTheme } from '@/styles/theme';
import InjectResponsiveContext from '@/test/InjectResponsiveContext';
import MockTheme from '@/test/MockTheme';

import EditorToolbar from './EditorToolbar';

jest.mock('@remirror/react');

describe('EditorToolbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

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
      blockquote: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  const renderEditorToolbar = () => render((
    <InjectResponsiveContext width={given.width}>
      <MockTheme>
        <EditorToolbar />
      </MockTheme>
    </InjectResponsiveContext>
  ));

  context('모바일 환경인 경우', () => {
    given('width', () => 400);

    describe('스크롤 위치에 따라 툴바 스타일이 변경된다', () => {
      context('스크롤 높이가 56이하인 경우', () => {
        it('box-shadow가 "transparent"가 되어야 한다', () => {
          renderEditorToolbar();

          expect(screen.getByTestId('editor-toolbar-wrapper')).toHaveStyle({
            'box-shadow': '0 1px 0 0 transparent',
          });
        });
      });

      context('스크롤 높이가 56보다 큰 경우', () => {
        it(`box-shadow 속성이 ${lightTheme.accent2} 이어야 한다`, async () => {
          renderEditorToolbar();

          await act(async () => {
            fireEvent.scroll(window, { target: { scrollY: 200 } });
            await jest.advanceTimersByTime(200);
          });

          expect(screen.getByTestId('editor-toolbar-wrapper')).toHaveStyle({
            'box-shadow': `0 1px 0 0 ${lightTheme.accent2}`,
          });
        });
      });

      context('스크롤 left값이 0인 경우', () => {
        it('"left-shadow-block"의 opacity값은 0이여만 한다', () => {
          renderEditorToolbar();

          fireEvent.scroll(screen.getByTestId('editor-toolbar-wrapper'), { target: { scrollLeft: 0 } });

          expect(screen.getByTestId('left-shadow-block')).toHaveStyle({
            opacity: 0,
          });
        });
      });

      context('스크롤 left값이 툴바 최대 수평 길이와 같은 경우', () => {
        it('"right-shadow-block"의 opacity값은 0이여만 한다', () => {
          renderEditorToolbar();

          fireEvent.scroll(screen.getByTestId('editor-toolbar-wrapper'), { target: { scrollLeft: 0 } });

          expect(screen.getByTestId('right-shadow-block')).toHaveStyle({
            opacity: 0,
          });
        });
      });
    });
  });

  describe('bold 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('bold-button'));

      expect(useChainedCommands).toBeCalled();
    });
  });

  describe('header1 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('h1-button'));

      expect(useChainedCommands).toBeCalled();
    });
  });

  describe('header2 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('h2-button'));

      expect(useChainedCommands).toBeCalled();
    });
  });

  describe('header3 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('h3-button'));

      expect(useChainedCommands).toBeCalled();
    });
  });

  describe('italic 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('italic-button'));

      expect(useChainedCommands).toBeCalled();
    });
  });

  describe('underline 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('underline-button'));

      expect(useChainedCommands).toBeCalled();
    });
  });

  describe('strike 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('strike-button'));

      expect(useChainedCommands).toBeCalled();
    });
  });

  describe('blockquote 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('blockquote-button'));

      expect(useChainedCommands).toBeCalled();
    });
  });

  describe('코드 블록 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('code-block-button'));

      expect(useChainedCommands).toBeCalled();
    });
  });

  describe('bullet list 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('bullet-list-button'));

      expect(useChainedCommands).toBeCalled();
    });
  });

  describe('ordered list 버튼을 클릭한다', () => {
    it('클릭이벤트가 발생해야만 한다', () => {
      renderEditorToolbar();

      fireEvent.click(screen.getByTestId('ordered-list-button'));

      expect(useChainedCommands).toBeCalled();
    });
  });

  context('active.bold가 true인 경우', () => {
    given('isBold', () => true);

    it(`bold 버튼의 배경색이 ${lightTheme.background}가 되어야만 한다`, () => {
      renderEditorToolbar();

      expect(screen.getByTestId('bold-button')).toHaveStyle({
        background: lightTheme.background,
      });
    });
  });
});
