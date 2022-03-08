import { useMutation } from 'react-query';

import { StorageError } from 'firebase/storage';
import { useSetRecoilState } from 'recoil';

import { writeFieldsState } from '@/recoil/group/atom';
import { uploadGroupThumbnail } from '@/services/api/storage';

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

  return mutation;
}

export default useUploadGroupThumbnail;
