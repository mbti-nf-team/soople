import { toast } from 'react-toastify';

import { renderHook } from '@testing-library/react-hooks';

import useCatchErrorWithToast from './useCatchErrorWithToast';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('useCatchErrorWithToast', () => {
  const defaultErrorMessage = 'defaultErrorMessage';

  const useCatchErrorWithToastHook = () => renderHook(() => useCatchErrorWithToast({
    error: given.error,
    isError: given.isError,
    defaultErrorMessage,
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('isError가 false이고 error가 존재하지 않을 경우', () => {
    given('isError', () => false);
    given('error', () => null);

    it('toast.error는 호출되지 않아야만 한다', () => {
      useCatchErrorWithToastHook();

      expect(toast.error).not.toBeCalled();
    });
  });

  context('isError가 true이고 error가 존재하지 않을 경우', () => {
    given('isError', () => true);
    given('error', () => null);

    it('toast.error는 기본 에러 메시지와 함께 호출되어야만 한다', () => {
      useCatchErrorWithToastHook();

      expect(toast.error).toBeCalledWith(defaultErrorMessage);
    });
  });

  context('isError가 true이고 error가 존재하는 경우', () => {
    given('isError', () => true);

    context('error의 code가 존재하지 않는 경우', () => {
      given('error', () => ('error'));

      it('toast.error는 "알 수 없는 오류가 발생했습니다."와 함께 호출되어야만 한다', () => {
        useCatchErrorWithToastHook();

        expect(toast.error).toBeCalledWith('알 수 없는 오류가 발생했습니다.');
      });
    });

    context('error의 code가 존재하는 경우', () => {
      given('error', () => ({
        code: 'unauthenticated',
      }));

      it('toast.error는 code의 error 메시지와 함께 호출되어야만 한다', () => {
        useCatchErrorWithToastHook();

        expect(toast.error).toBeCalledWith('작업을 수행할 권한이 없습니다.');
      });
    });
  });
});
