import { render } from '@testing-library/react';

import InjectMockProviders from '@/test/InjectMockProviders';

import WritePage from './write.page';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    replace: jest.fn(),
  })),
}));
jest.mock('@remirror/react', () => ({
  useChainedCommands: jest.fn().mockImplementation(() => ({
    toggleBold: jest.fn().mockImplementation(() => ({
      focus: jest.fn().mockImplementation(() => ({
        run: jest.fn(),
      })),
    })),
  })),
  useActive: jest.fn().mockImplementation(() => ({
    bold: jest.fn(),
  })),
  useRemirrorContext: jest.fn().mockImplementation(() => ({
    getState: jest.fn(),
  })),
  useHelpers: jest.fn().mockImplementation(() => ({
    getHTML: jest.fn(),
  })),
  EditorComponent: () => <>mockComponent</>,
}));
jest.mock('@/components/write/RemirorEditorProvider', () => ({
  __esModule: true,
  default: () => <div />,
}));

describe('WritePage', () => {
  jest.useFakeTimers();

  const renderNewPage = () => render((
    <InjectMockProviders>
      <WritePage />
    </InjectMockProviders>
  ));

  it('"등록하기" 버튼이 나타나야만 한다', () => {
    const { container } = renderNewPage();

    expect(container).toHaveTextContent('등록하기');
  });
});
