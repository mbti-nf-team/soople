import { AlertCircle as WarnIcon } from 'react-feather';
import { toast } from 'react-toastify';

import palette from '@/styles/palette';

import { errorToast, successToast } from './toast';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe('errorToast', () => {
  const errorMessage = '에러가 발생했어요!';

  it('toast.error가 메시지와 함께 호출되어야만 한다', () => {
    errorToast(errorMessage);

    expect(toast.error).toBeCalledWith(errorMessage, {
      icon: <WarnIcon width="24px" height="24px" fill={palette.warning} color={palette.background} />,
    });
  });
});

describe('successToast', () => {
  const successMessage = '성공했어요!';

  it('toast.success가 메시지와 함께 호출되어야만 한다', () => {
    successToast(successMessage);

    expect(toast.success).toBeCalledTimes(1);
  });
});
