import { useRouter } from 'next/router';

import { render, screen } from '@testing-library/react';

import InjectMockProviders from '@/test/InjectMockProviders';

import ApplicationStatusContainer from './ApplicationStatusContainer';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ApplicationStatusContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockImplementation(() => ({
      back: jest.fn(),
      query: {
        applicant: given.query,
      },
    }));
  });

  const renderApplicationStatusContainer = () => render((
    <InjectMockProviders width={given.width}>
      <ApplicationStatusContainer />
    </InjectMockProviders>
  ));

  context('모바일인 경우', () => {
    given('width', () => 400);

    it('gradient block이 나타나야만 한다', () => {
      renderApplicationStatusContainer();

      expect(screen.getByTestId('gradient-block')).toBeInTheDocument();
    });
  });

  context('모바일이 아닌 경우', () => {
    given('width', () => 800);

    it('gradient block이 안보여야만 한다', () => {
      renderApplicationStatusContainer();

      expect(screen.queryByTestId('gradient-block')).not.toBeInTheDocument();
    });
  });
});
