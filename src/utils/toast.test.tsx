import { toast } from 'react-toastify';

import { defaultToast, errorToast, successToast } from './toast';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
    info: jest.fn(),
  },
}));

describe('errorToast', () => {
  const errorMessage = '에러가 발생했어요!';

  it('toast.error가 메시지와 함께 호출되어야만 한다', () => {
    errorToast(errorMessage);

    expect(toast.error).toHaveBeenCalledTimes(1);
  });
});

describe('successToast', () => {
  const successMessage = '성공했어요!';

  it('toast.success가 메시지와 함께 호출되어야만 한다', () => {
    successToast(successMessage);

    expect(toast.success).toHaveBeenCalledTimes(1);
  });
});

describe('defaultToast', () => {
  const defaultMessage = 'default';

  it('toast.info가 메시지와 함께 호출되어야만 한다', () => {
    defaultToast(defaultMessage);

    expect(toast.info).toHaveBeenCalledTimes(1);
  });
});
