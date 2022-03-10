import { useMutation } from 'react-query';

import { StorageError } from 'firebase/storage';

import { deleteGroupThumbnail } from '@/services/api/storage';

function useRemoveGroupThumbnail() {
  const mutation = useMutation<void, StorageError, string>((
    thumbnailUrl,
  ) => deleteGroupThumbnail(thumbnailUrl));

  return mutation;
}

export default useRemoveGroupThumbnail;
