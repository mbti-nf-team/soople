import { useEffect } from 'react';

import { AuthError, AuthErrorCodes } from 'firebase/auth';

import { errorToast } from '@/utils/toast';

interface Props {
  isError: boolean;
  error: AuthError | null;
  defaultErrorMessage: string;
}

function useCatchAuthErrorWithToast({ isError, error, defaultErrorMessage }: Props) {
  useEffect(() => {
    const {
      CREDENTIAL_TOO_OLD_LOGIN_AGAIN, TIMEOUT, TOO_MANY_ATTEMPTS_TRY_LATER, TOKEN_EXPIRED,
    } = AuthErrorCodes;

    const authErrorMessage = {
      [CREDENTIAL_TOO_OLD_LOGIN_AGAIN]: '다시 로그인 후 진행해주세요.',
      [TIMEOUT]: '잠시 후 다시 시도해주세요.',
      [TOO_MANY_ATTEMPTS_TRY_LATER]: '잠시 후 다시 시도해주세요.',
      [TOKEN_EXPIRED]: '토큰이 만료되었어요. 다시 로그인 후 진행해주세요.',
      unknown: '알 수 없는 오류가 발생했습니다.',
    } as any;

    if (!isError && !error) {
      return;
    }

    if (isError && !error) {
      errorToast(defaultErrorMessage);
      return;
    }

    errorToast(authErrorMessage[error?.code || 'unknown']);
  }, [isError, error, defaultErrorMessage]);
}

export default useCatchAuthErrorWithToast;
