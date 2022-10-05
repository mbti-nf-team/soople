import { useMutation } from '@tanstack/react-query';
import { StorageError } from 'firebase/storage';

import { uploadStorageFile } from '@/services/api/storage';

import useCatchStorageErrorWithToast from '../useCatchStorageErrorWithToast';

type UploadFileRequest = {
  storagePath: string;
  file: File;
}

function useUploadStorageFile() {
  const mutation = useMutation<string, StorageError, UploadFileRequest>((
    requestForm,
  ) => uploadStorageFile(requestForm));

  const { isError, error } = mutation;

  useCatchStorageErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '파일을 업로드하는데 실패했어요! 잠시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useUploadStorageFile;
