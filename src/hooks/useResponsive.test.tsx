import { renderHook } from '@testing-library/react';

import InjectResponsiveContext from '@/test/InjectResponsiveContext';

import useResponsive from './useResponsive';

describe('useResponsive', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const useResponsiveHook = () => renderHook(() => useResponsive(), {
    wrapper: ({ children }) => (
      <InjectResponsiveContext width={given.width}>{children}</InjectResponsiveContext>
    ),
  });

  context('화면 크기가 500px보다 작은 경우', () => {
    given('width', () => 400);

    it('isMobile은 true이여야만 한다', () => {
      const { result: { current } } = useResponsiveHook();

      expect(current).toEqual({
        isClient: true,
        isDesktop: false,
        isTablet: false,
        isMobile: true,
      });
    });
  });

  context('화면 크기가 500px보다 크고 650px보다 작은 경우', () => {
    given('width', () => 600);

    it('isTablet은 true이여야만 한다', () => {
      const { result: { current } } = useResponsiveHook();

      expect(current).toEqual({
        isClient: true,
        isDesktop: false,
        isTablet: true,
        isMobile: false,
      });
    });
  });

  context('화면 크기가 650px보다 큰 경우', () => {
    given('width', () => 700);

    it('isTablet은 true이여야만 한다', () => {
      const { result: { current } } = useResponsiveHook();

      expect(current).toEqual({
        isClient: true,
        isDesktop: true,
        isTablet: false,
        isMobile: false,
      });
    });
  });
});
