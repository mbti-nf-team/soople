import { useMutation } from '@tanstack/react-query';
import { StorageError } from 'firebase/storage';

import { deleteStorageFile } from '@/services/api/storage';

import useCatchStorageErrorWithToast from '../useCatchStorageErrorWithToast';

function useDeleteStorageFile() {
  const mutation = useMutation<void, StorageError, string>((
    fileUrl,
  ) => deleteStorageFile(fileUrl));

  const { isError, error } = mutation;

  useCatchStorageErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '파일을 삭제하는데 실패했어요! 잠시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useDeleteStorageFile;
