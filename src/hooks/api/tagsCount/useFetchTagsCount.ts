import { checkEmpty } from '@nft-team/core';
import { useQuery } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';

import { TagCount } from '@/models/group';
import { getTagsCount } from '@/services/api/tagsCount';

function useFetchTagsCount() {
  const query = useQuery<TagCount[], FirestoreError>(['tagsCount'], getTagsCount, {
    suspense: true,
    useErrorBoundary: true,
  });

  return {
    ...query,
    data: checkEmpty(query.data),
  };
}

export default useFetchTagsCount;
