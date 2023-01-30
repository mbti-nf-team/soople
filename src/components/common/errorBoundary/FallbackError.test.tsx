import { useRouter } from 'next/router';

import { render, screen } from '@testing-library/react';

import FallbackError from './FallbackError';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('FallbackError', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockImplementation(() => ({
      replace: mockReplace,
    }));
  });

  const renderFallbackError = () => render((
    <FallbackError isRootError={given.isRootError} size={given.size} />
  ));

  context('isRootError가 true인 경우', () => {
    given('isRootError', () => true);

    it('router.replace가 "/500"과 함께 호출되어야만 한다', () => {
      renderFallbackError();

      expect(mockReplace).toHaveBeenCalledWith('/500');
    });
  });

  context('isRootError가 false인 경우', () => {
    given('isRootError', () => false);

    it('"목록 불러오기에 실패했어요." 에러 문구가 나타나야만 한다', () => {
      const { container } = renderFallbackError();

      expect(container).toHaveTextContent('목록 불러오기에 실패했어요.');
    });

    context('size가 "small"인 경우', () => {
      given('size', () => 'small');

      it('"flex-direction" 스타일은 "row"가 되어야만 한다', () => {
        renderFallbackError();

        expect(screen.getByTestId('fallback-error')).toHaveStyle({
          flexDirection: 'row',
        });
      });
    });

    context('size가 "medium"인 경우', () => {
      given('size', () => 'medium');

      it('"flex-direction" 스타일은 "column"가 되어야만 한다', () => {
        renderFallbackError();

        expect(screen.getByTestId('fallback-error')).toHaveStyle({
          flexDirection: 'column',
        });
      });
    });
  });
});
