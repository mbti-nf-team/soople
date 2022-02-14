import { AlertCircle as WarnIcon } from 'react-feather';
import { toast } from 'react-toastify';

import palette from '@/styles/palette';

import CheckIcon from '../assets/icons/check.svg';

export const errorToast = (message: string) => toast.error(message, {
  icon: <WarnIcon width="24px" height="24px" fill={palette.warning} color={palette.background} />,
});

export const successToast = (message: string) => toast.success(message, {
  icon: <CheckIcon />,
});
