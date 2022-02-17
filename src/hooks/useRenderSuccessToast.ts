import { useEffect } from 'react';

import { successToast } from '@/utils/toast';

function useRenderSuccessToast(isSuccess: boolean, message: string) {
  useEffect(() => {
    if (isSuccess) {
      successToast(message);
    }
  }, [isSuccess]);
}

export default useRenderSuccessToast;
