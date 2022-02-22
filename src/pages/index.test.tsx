import { render, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';

import InjectMockProviders from '@/test/InjectMockProviders';

import HomePage from './index.page';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('HomePage', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/',
      query: {
        error: null,
      },
    }));
  });

  const renderHome = () => render((
    <InjectMockProviders>
      <HomePage />
    </InjectMockProviders>
  ));

  it('홈에 대한 정보가 보여져야만 한다', async () => {
    const { container } = renderHome();

    await waitFor(() => expect(container).toHaveTextContent('시작하기'));
  });
});
