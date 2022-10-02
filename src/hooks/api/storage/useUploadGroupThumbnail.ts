import { useMutation } from '@tanstack/react-query';
import { StorageError } from 'firebase/storage';
import { useSetRecoilState } from 'recoil';

import { writeFieldsState } from '@/recoil/group/atom';
import { uploadGroupThumbnail } from '@/services/api/storage';

import useCatchStorageErrorWithToast from '../useCatchStorageErrorWithToast';

type UploadThumbnailRequest = {
  userUid: string;
  thumbnail: File;
}

function useUploadGroupThumbnail() {
  const setWriteFieldsState = useSetRecoilState(writeFieldsState);

  const mutation = useMutation<string, StorageError, UploadThumbnailRequest>((
    requestForm,
  ) => uploadGroupThumbnail(requestForm), {
    onSuccess: (url) => setWriteFieldsState((prev) => ({
      ...prev,
      thumbnail: url,
    })),
  });

  const { isError, error } = mutation;

  useCatchStorageErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '썸네일을 업로드하는데 실패했어요! 잠시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useUploadGroupThumbnail;
