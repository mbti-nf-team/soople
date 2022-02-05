import { render } from '@testing-library/react';

import InjectMockProviders from '@/test/InjectMockProviders';

import NewPage from './write.page';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    replace: jest.fn(),
  })),
}));

describe('WritePage', () => {
  const renderNewPage = () => render((
    <InjectMockProviders>
      <NewPage />
    </InjectMockProviders>
  ));

  it('"등록하기" 버튼이 나타나야만 한다', () => {
    const { container } = renderNewPage();

    expect(container).toHaveTextContent('등록하기');
  });
});
