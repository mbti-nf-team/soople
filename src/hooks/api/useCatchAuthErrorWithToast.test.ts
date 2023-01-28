import { renderHook } from '@testing-library/react';

import { errorToast } from '@/utils/toast';

import useCatchAuthErrorWithToast from './useCatchAuthErrorWithToast';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));
jest.mock('@/utils/toast');

describe('useCatchAuthErrorWithToast', () => {
  const defaultErrorMessage = 'defaultErrorMessage';

  const useCatchAuthErrorWithToastHook = () => renderHook(
    () => useCatchAuthErrorWithToast({
      error: given.error,
      isError: given.isError,
      defaultErrorMessage,
    }),
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('isError가 false이고 error가 존재하지 않을 경우', () => {
    given('isError', () => false);
    given('error', () => null);

    it('errorToast는 호출되지 않아야만 한다', () => {
      useCatchAuthErrorWithToastHook();

      expect(errorToast).not.toHaveBeenCalled();
    });
  });

  context('isError가 true이고 error가 존재하지 않을 경우', () => {
    given('isError', () => true);
    given('error', () => null);

    it('errorToast는 기본 에러 메시지와 함께 호출되어야만 한다', () => {
      useCatchAuthErrorWithToastHook();

      expect(errorToast).toHaveBeenCalledWith(defaultErrorMessage);
    });
  });

  context('isError가 true이고 error가 존재하는 경우', () => {
    given('isError', () => true);

    context('error의 code가 존재하지 않는 경우', () => {
      given('error', () => ('error'));

      it('errorToast는 "알 수 없는 오류가 발생했습니다."와 함께 호출되어야만 한다', () => {
        useCatchAuthErrorWithToastHook();

        expect(errorToast).toHaveBeenCalledWith('알 수 없는 오류가 발생했습니다.');
      });
    });

    context('error의 code가 존재하는 경우', () => {
      given('error', () => ({
        code: 'auth/requires-recent-login',
      }));

      it('errorToast는 code의 error 메시지와 함께 호출되어야만 한다', () => {
        useCatchAuthErrorWithToastHook();

        expect(errorToast).toHaveBeenCalledWith('다시 로그인 후 진행해주세요.');
      });
    });
  });
});
