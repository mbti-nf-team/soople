import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';

import { GroupQuery } from '@/models';
import { Applicant } from '@/models/group';
import { getApplicants } from '@/services/api/applicants';
import { checkEmpty } from '@/utils/utils';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useFetchApplicants({
  suspense, useErrorBoundary = false,
}: { suspense: boolean; useErrorBoundary?: boolean; }) {
  const router = useRouter();

  const { id } = router.query as GroupQuery;

  const query = useQuery<Applicant[], FirestoreError>(['applicants', id], () => getApplicants(id), {
    enabled: !!id,
    suspense,
    useErrorBoundary,
  });

  const { isError, error, data } = query;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '해당 글의 신청자 정보를 불러오는데 실패했어요!',
  });

  return {
    ...query,
    data: checkEmpty(data),
  };
}

export default useFetchApplicants;
