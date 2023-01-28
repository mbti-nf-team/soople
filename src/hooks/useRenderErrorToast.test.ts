import { useRouter } from 'next/router';

import { renderHook } from '@testing-library/react';

import { errorToast } from '@/utils/toast';

import useRenderErrorToast from './useRenderErrorToast';

jest.mock('@/utils/toast');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useRenderErrorToast', () => {
  const errorMessage = '에러가 발생했어요!';
  const errorStatus = 'unauthenticated';
  const replaceUrl = '/';

  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockImplementation(() => ({
      replace: mockReplace,
      query: given.query,
    }));
  });

  const useRenderErrorToastHook = () => renderHook(() => useRenderErrorToast({
    errorMessage,
    errorStatus,
    replaceUrl: '/',
  }));

  context('query.error가 errorStatus와 일치하는 경우', () => {
    given('query', () => ({
      error: errorStatus,
    }));

    it('"errorToast"가 메시지와 함꼐 호출되어야하고 replace가 url과 함께 호출되어야만 한다', () => {
      useRenderErrorToastHook();

      expect(errorToast).toHaveBeenCalledWith(errorMessage);
      expect(mockReplace).toHaveBeenCalledWith(replaceUrl, undefined, { shallow: true });
    });
  });

  context('query.error가 errorStatus와 일치하지 않는 경우', () => {
    given('query', () => ({
      error: 'already-completed',
    }));

    it('"errorToast"가 호출되지 않아야만 한다', () => {
      useRenderErrorToastHook();

      expect(errorToast).not.toHaveBeenCalled();
    });
  });
});
