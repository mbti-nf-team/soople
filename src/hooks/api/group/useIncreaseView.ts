import { useEffectOnce } from 'react-use';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { Group } from '@/models/group';
import { patchIncreaseView } from '@/services/api/group';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

import useFetchGroup from './useFetchGroup';

interface RequestForm {
  groupId: string;
  views: number;
  viewedIds?: string;
}

function useIncreaseView() {
  const { data: group } = useFetchGroup();
  const queryClient = useQueryClient();

  const mutation = useMutation<{
    isAlreadyRead: boolean; viewedIds: string;
  }, FirestoreError, RequestForm
  >(({ groupId, views, viewedIds }) => patchIncreaseView({
    groupId,
    views,
  }, viewedIds), {
    onSuccess: ({ isAlreadyRead, viewedIds }, { groupId, views }) => {
      if (!isAlreadyRead) {
        queryClient.setQueryData<Group>(['group', groupId], (prevGroup) => ({
          ...prevGroup as Group,
          views: views + 1,
        }));

        const expiredDate = new Date();
        expiredDate.setUTCHours(24, 0, 0, 0);
        expiredDate.setUTCDate(expiredDate.getUTCDate() + 1);

        destroyCookie(null, 'viewedGroup');
        setCookie(null, 'viewedGroup', viewedIds, {
          expires: expiredDate,
          path: '/',
        });
      }
    },
  });

  const { mutate, isError, error } = mutation;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '조회수를 업데이트하는데 실패했어요.',
  });

  useEffectOnce(() => {
    const { groupId, views } = group;
    const cookies = parseCookies();

    mutate({
      groupId,
      views,
      viewedIds: cookies?.viewedGroup,
    });
  });

  return mutation;
}

export default useIncreaseView;
