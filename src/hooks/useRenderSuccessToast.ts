import { useEffect } from 'react';
import { ToastOptions } from 'react-toastify';

import { successToast } from '@/utils/toast';

function useRenderSuccessToast(isSuccess: boolean, {
  message, toastOptions,
}: { message: string; toastOptions?: ToastOptions; }) {
  useEffect(() => {
    if (isSuccess) {
      successToast(message, toastOptions);
    }
  }, [isSuccess, message, toastOptions]);
}

export default useRenderSuccessToast;
