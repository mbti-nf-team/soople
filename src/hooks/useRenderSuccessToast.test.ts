import { renderHook } from '@testing-library/react-hooks';

import { successToast } from '@/utils/toast';

import useRenderSuccessToast from './useRenderSuccessToast';

jest.mock('@/utils/toast');

describe('useRenderSuccessToast', () => {
  const message = '성공이에요!';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const useRenderSuccessToastHook = () => renderHook(() => useRenderSuccessToast(
    given.isSuccess,
    message,
  ));

  context('isSuccess가 true인 경우', () => {
    given('isSuccess', () => true);

    it('"successToast"가 메시지와 함꼐 호출되어야만 한다', () => {
      useRenderSuccessToastHook();

      expect(successToast).toBeCalledWith(message);
    });
  });

  context('isSuccess가 false인 경우', () => {
    given('isSuccess', () => false);

    it('"successToast"가 호출되지 않아야만 한다', () => {
      useRenderSuccessToastHook();

      expect(successToast).not.toBeCalled();
    });
  });
});
