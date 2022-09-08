import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { errorToast } from '@/utils/toast';

type TRenderErrorToast = {
  errorStatus: 'unauthenticated' | 'already-completed';
  errorMessage: string;
  replaceUrl: string;
}

function useRenderErrorToast({ errorMessage, errorStatus, replaceUrl }: TRenderErrorToast) {
  const { replace, query } = useRouter();

  useEffect(() => {
    if (query?.error === errorStatus) {
      errorToast(errorMessage);
      replace(replaceUrl, undefined, { shallow: true });
    }
  }, [query?.error, errorMessage, errorStatus, replaceUrl, replace]);
}

export default useRenderErrorToast;
