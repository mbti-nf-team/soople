import { useMutation } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import { Profile } from '@/models/auth';
import { WriteFields } from '@/models/group';
import { publishModalVisibleState } from '@/recoil/modal/atom';
import { postNewGroup } from '@/services/api/group';
import { updateTagCount } from '@/services/api/tagsCount';
import { successToast } from '@/utils/toast';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

type PublishNewGroupRequest = {
  profile: Profile;
  writeFields: WriteFields;
}

function usePublishNewGroup() {
  const { replace } = useRouter();
  const closePublishModal = useSetRecoilState(publishModalVisibleState);

  const mutation = useMutation<[string, ...void[]], FirestoreError, PublishNewGroupRequest>((
    { profile, writeFields },
  ) => Promise.all([postNewGroup(profile, writeFields), ...writeFields.tags.map(updateTagCount)]), {
    onSuccess: ([groupId]: [string, ...void[]]) => {
      closePublishModal(false);
      replace(`/detail/${groupId}`);
      successToast('새로운 글을 등록했어요.');
    },
  });

  const { isError, error } = mutation;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '글 작성에 실패했어요! 짐시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default usePublishNewGroup;
