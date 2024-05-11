import { useInView } from 'react-intersection-observer';

import { renderHook } from '@testing-library/react';

import useIntersectionObserver from './useIntersectionObserver';

describe('useIntersectionObserver', () => {
  const handleFetchNextPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useInView as jest.Mock).mockImplementation(() => ({
      ref: jest.fn(),
      inView: given.inView,
    }));
  });

  const useIntersectionObserverHook = () => renderHook(() => useIntersectionObserver({
    hasNextPage: given.hasNextPage,
    fetchNextPage: handleFetchNextPage,
    isRoot: true,
    intersectionOptions: {
      rootMargin: '30px',
    },
  }));

  context('inView가 true이고 hasNextPage가 true인 경우', () => {
    given('inView', () => true);
    given('hasNextPage', () => true);

    it('fetchNextPage가 호출되어야만 한다', () => {
      useIntersectionObserverHook();

      expect(handleFetchNextPage).toHaveBeenCalledTimes(1);
    });
  });

  context('inView가 false이거나 hasNextPage가 false인 경우', () => {
    given('inView', () => false);
    given('hasNextPage', () => true);

    it('fetchNextPage가 호출되어야만 한다', () => {
      useIntersectionObserverHook();

      expect(handleFetchNextPage).not.toHaveBeenCalled();
    });
  });
});
