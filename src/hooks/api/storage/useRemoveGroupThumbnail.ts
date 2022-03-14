import { useMutation } from 'react-query';

import { StorageError } from 'firebase/storage';

import { deleteGroupThumbnail } from '@/services/api/storage';

import useCatchStorageErrorWithToast from '../useCatchStorageErrorWithToast';

function useRemoveGroupThumbnail() {
  const mutation = useMutation<void, StorageError, string>((
    thumbnailUrl,
  ) => deleteGroupThumbnail(thumbnailUrl));

  const { isError, error } = mutation;

  useCatchStorageErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '썸네일을 삭제하는데 실패했어요! 잠시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useRemoveGroupThumbnail;
