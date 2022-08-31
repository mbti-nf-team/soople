import { AlertCircle as WarnIcon, Info as DefaultIcon } from 'react-feather';
import { toast } from 'react-toastify';

import styled from '@emotion/styled';

import mq from '@/styles/responsive';
import { lightTheme } from '@/styles/theme';

import SuccessIcon from '../assets/icons/check.svg';

export const errorToast = (message: string) => toast.error(message, {
  icon: <StyledWarnIcon fill={lightTheme.warning} color={lightTheme.background} />,
});

export const successToast = (message: string) => toast.success(message, {
  icon: <SuccessIcon />,
});

export const defaultToast = (message: string) => toast.info(message, {
  icon: <StyledDefaultIcon fill={lightTheme.accent2} color={lightTheme.accent8} />,
});

const StyledWarnIcon = styled(WarnIcon)`
  ${mq({
    width: ['20px', '24px'],
    height: ['20px', '24px'],
  })}

  circle {
    stroke: ${lightTheme.warning};
  }
`;

const StyledDefaultIcon = styled(DefaultIcon)`
  ${mq({
    width: ['20px', '24px'],
    height: ['20px', '24px'],
  })}

  circle {
    stroke: ${lightTheme.accent2};
  }
`;
