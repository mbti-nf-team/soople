import { useRouter } from 'next/router';

import { useMutation } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';
import { useSetRecoilState } from 'recoil';

import { WriteFields } from '@/models/group';
import { publishModalVisibleState } from '@/recoil/modal/atom';
import { patchEditGroup } from '@/services/api/group';
import { editTagsCount } from '@/services/api/tagsCount';
import { successToast } from '@/utils/toast';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

type EditGroupRequest = {
  groupId: string;
  writeFields: WriteFields;
  deleteTags: string[];
}

function useEditGroup() {
  const { replace } = useRouter();
  const closePublishModal = useSetRecoilState(publishModalVisibleState);

  const mutation = useMutation<[void, void], FirestoreError, EditGroupRequest>((
    { groupId, writeFields, deleteTags },
  ) => Promise.all([
    patchEditGroup(groupId, writeFields), editTagsCount(writeFields.tags, deleteTags),
  ]), {
    onSuccess: (_, { groupId }) => {
      closePublishModal(false);
      replace(`/detail/${groupId}`);
      successToast('글을 수정했어요.');
    },
  });

  const { isError, error } = mutation;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '글 수정에 실패했어요! 짐시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useEditGroup;
