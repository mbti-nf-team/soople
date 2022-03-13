import { useMutation } from 'react-query';

import { FirestoreError } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import { WriteFields } from '@/models/group';
import { publishModalVisibleState } from '@/recoil/modal/atom';
import { patchEditGroup } from '@/services/api/group';
import { editTagsCount } from '@/services/api/tagsCount';

import useCatchErrorWithToast from '../useCatchErrorWithToast';

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
    },
  });

  const { isError, error } = mutation;

  useCatchErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '글 수정에 실패했어요! 짐시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useEditGroup;
