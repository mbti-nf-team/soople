import { useEffect } from 'react';

import { StorageError } from 'firebase/storage';

import { errorToast } from '@/utils/toast';

interface Props {
  isError: boolean;
  error: StorageError | null;
  defaultErrorMessage: string;
}

function useCatchStorageErrorWithToast({ isError, error, defaultErrorMessage }: Props) {
  const firebaseErrorMessage: { [K in string]: string; } = {
    'storage/unknown': '알 수 없는 오류가 발생했습니다.',
    'storage/object-not-found': '존재하지 않는 경로입니다.',
    'storage/bucket-not-found': '존재하지 않는 경로입니다.',
    'storage/project-not-found': '존재하지 않는 경로입니다.',
    'storage/quota-exceeded': '알 수 없는 오류가 발생했습니다.',
    'storage/unauthenticated': '해당 이미지를 불러올 권한이 없습니다.',
    'storage/unauthorized': '해당 이미지를 불러올 권한이 없습니다.',
    'storage/retry-limit-exceeded': '작업(업로드, 다운로드, 삭제 등)의 최대 제한 시간이 초과되었습니다. 잠시 후 다시 업로드해 보세요.',
    'storage/invalid-checksum': '업로드에 실패하였습니다. 잠시 후 다시 업로드해 보세요.',
    'storage/canceled': '사용자가 작업을 취소했습니다.',
    'storage/invalid-event-name': '알 수 없는 오류가 발생했습니다.',
    'storage/invalid-url': '존재하지 않는 경로입니다.',
    'storage/invalid-argument': '알 수 없는 오류가 발생했습니다.',
    'storage/no-default-bucket': '알 수 없는 오류가 발생했습니다.',
    'storage/cannot-slice-blob': '로컬 파일이 변경되지 않았는지 확인한 후 다시 업로드해 보세요.',
    'storage/server-file-wrong-size': '클라이언트의 파일과 서버에서 수신한 파일의 크기가 일치하지 않습니다. 다시 업로드해 보세요.',
  };

  useEffect(() => {
    if (!isError && !error) {
      return;
    }

    if (isError && !error) {
      errorToast(defaultErrorMessage);
      return;
    }

    errorToast(firebaseErrorMessage[error?.code || 'storage/unknown']);
  }, [isError, error]);
}

export default useCatchStorageErrorWithToast;
