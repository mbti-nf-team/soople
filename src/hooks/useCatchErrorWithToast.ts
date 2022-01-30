import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { FirestoreError, FirestoreErrorCode } from 'firebase/firestore';

interface Props {
  isError: boolean;
  error: FirestoreError | null;
  defaultErrorMessage: string;
}

function useCatchErrorWithToast({ isError, error, defaultErrorMessage }: Props) {
  const firebaseErrorMessage: {
    [K in FirestoreErrorCode]: string;
  } = {
    unknown: '알 수 없는 오류가 발생했습니다.',
    'not-found': '존재하지 않는 호출을 하였습니다.',
    'already-exists': '생성하려는 일부 문서가 이미 존재합니다.',
    'permission-denied': '권한이 거부되었습니다.',
    unauthenticated: '작업을 수행할 권한이 없습니다.',
    unavailable: '현재 서비스를 사용할 수 없습니다.',
    'resource-exhausted': '리소스가 소진되었습니다. 잠시 후 다시 시도해주세요.',
    'deadline-exceeded': '기한이 만료되었습니다. 잠시 후 다시 시도해주세요.',
    cancelled: '요청한 작업이 취소되었습니다.',
    'data-loss': '데이터가 손상되었습니다.',
    'failed-precondition': '작업이 거부되었습니다.',
    internal: defaultErrorMessage,
    'invalid-argument': defaultErrorMessage,
    'out-of-range': '유효한 범위가 아닙니다.',
    aborted: '작업이 중단되었습니다.',
    unimplemented: '작업이 활성화되지 않았거나, 구현되지 않았습니다. 나중에 다시 시도해주세요.',
  };

  useEffect(() => {
    if (!isError && !error) {
      return;
    }

    if (isError && !error) {
      toast.error(defaultErrorMessage);
      return;
    }

    toast.error(firebaseErrorMessage[error?.code || 'unknown']);
  }, [isError, error]);
}

export default useCatchErrorWithToast;
