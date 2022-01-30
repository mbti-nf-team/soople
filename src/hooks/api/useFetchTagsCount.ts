import { useQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { TagCount } from '@/models/group';
import { getTagsCount } from '@/services/api/tagsCount';

function useFetchTagsCount() {
  const query = useQuery<TagCount[], FirestoreError>('tagsCount', () => getTagsCount());

  return {
    ...query,
    data: query?.data ?? [],
  };
}

export default useFetchTagsCount;
