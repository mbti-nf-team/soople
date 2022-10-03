import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';

import { Group } from '@/models/group';
import { deleteGroup } from '@/services/api/group';
import { deleteTagCount } from '@/services/api/tagsCount';
import { successToast } from '@/utils/toast';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useRemoveGroup() {
  const { replace } = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<[void, ...void[]], FirestoreError, Group>((
    group: Group,
  ) => Promise.all([deleteGroup(group.groupId), ...group.tags.map(deleteTagCount)]), {
    onSuccess: () => {
      replace('/');
      queryClient.invalidateQueries(['tagsCount']);
      queryClient.invalidateQueries(['groups']);
      successToast('글을 삭제했어요.');
    },
  });

  const { isError, error } = mutation;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '글 삭제에 실패했어요! 짐시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useRemoveGroup;
